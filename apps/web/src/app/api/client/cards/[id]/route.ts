import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const card = await db.cardInstances.findUnique({ id });

    if (!card || card.ownerUserId !== user.userId) {
      return NextResponse.json({ error: 'Card instance not found' }, { status: 404 });
    }

    const { sanitizeHtml } = await import('@/lib/validation');
    const sanitizedData: Record<string, any> = {};
    if (card.data) {
      for (const [key, value] of Object.entries(card.data)) {
        sanitizedData[key] = typeof value === 'string' ? sanitizeHtml(value) : value;
      }
    }

    return NextResponse.json({ card: { ...card, data: sanitizedData } });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const { data } = body;

    const existing = await db.cardInstances.findUnique({ id });
    if (!existing || existing.ownerUserId !== user.userId) {
      return NextResponse.json({ error: 'Card instance not found' }, { status: 404 });
    }

    const template = existing.template;
    // Support both legacy fieldSchemas and new configSchema
    const configFields: any[] = template?.configSchema || [];
    const legacyFields: any[] = template?.fieldSchemas || [];
    
    // Build allowed keys from both sources
    const clientConfigFields = configFields.filter((f: any) => f.editableBy === 'client');
    const clientLegacyFields = legacyFields.filter((fs: any) => fs.editableBy === 'client');
    
    const allowedClientKeys = new Set([
      ...clientConfigFields.map((f: any) => f.key),
      ...clientLegacyFields.map((fs: any) => fs.fieldKey),
    ]);
    const fieldTypeMap = new Map<string, string>([
      ...clientConfigFields.map((f: any) => [f.key, f.type] as [string, string]),
      ...clientLegacyFields.map((fs: any) => [fs.fieldKey, fs.fieldType] as [string, string]),
    ]);

    // Merge data, protecting any admin_only fields from client modification
    const oldData = existing.data || {};
    const sanitizedData: Record<string, any> = { ...oldData };

    if (data) {
      const { validateFieldValue, sanitizeHtml } = await import('@/lib/validation');
      for (const key of Object.keys(data)) {
        if (allowedClientKeys.has(key)) {
          const fieldType: string = fieldTypeMap.get(key) || 'text';
          const valueToSet = data[key];
          
          if (!validateFieldValue(valueToSet, fieldType)) {
             return NextResponse.json({ error: `Invalid value for field ${key} of type ${fieldType}` }, { status: 400 });
          }
          
          const sanitizedValue = typeof valueToSet === 'string' ? sanitizeHtml(valueToSet) : valueToSet;
          
          if (oldData[key] !== sanitizedValue) {
            // Write AuditLog for traceability
            await db.auditLogs.create({
              cardInstanceId: id,
              changedById: user.userId,
              fieldKey: key,
              oldValue: String(oldData[key] || ''),
              newValue: String(sanitizedValue || ''),
            });
          }
          sanitizedData[key] = sanitizedValue;
        }
      }
    }

    const updatedCard = await db.cardInstances.update(id, { data: sanitizedData });
    return NextResponse.json({ card: updatedCard });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update card' }, { status: 500 });
  }
}
