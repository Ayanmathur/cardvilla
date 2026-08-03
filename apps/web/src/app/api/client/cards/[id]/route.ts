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

    return NextResponse.json({ card });
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
    const allowedClientKeys = new Set(
      (template?.fieldSchemas || [])
        .filter((fs: any) => fs.editableBy === 'client')
        .map((fs: any) => fs.fieldKey)
    );

    // Merge data, protecting any admin_only fields from client modification
    const oldData = existing.data || {};
    const sanitizedData: Record<string, any> = { ...oldData };

    if (data) {
      for (const key of Object.keys(data)) {
        if (allowedClientKeys.has(key)) {
          if (oldData[key] !== data[key]) {
            // Write AuditLog for traceability
            await db.auditLogs.create({
              cardInstanceId: id,
              changedById: user.userId,
              fieldKey: key,
              oldValue: String(oldData[key] || ''),
              newValue: String(data[key] || ''),
            });
          }
          sanitizedData[key] = data[key];
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
