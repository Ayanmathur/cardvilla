import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAdmin } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const card = await db.cardInstances.findUnique({ id });

    if (!card) {
      return NextResponse.json({ error: 'Card instance not found' }, { status: 404 });
    }

    return NextResponse.json({ card });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { data, status } = body;

    const existing = await db.cardInstances.findUnique({ id });
    if (!existing) {
      return NextResponse.json({ error: 'Card instance not found' }, { status: 404 });
    }

    // Log AuditLog entries for updated field values
    if (data) {
      const oldData = existing.data || {};
      for (const key of Object.keys(data)) {
        if (oldData[key] !== data[key]) {
          await db.auditLogs.create({
            cardInstanceId: id,
            changedById: admin.userId,
            fieldKey: key,
            oldValue: String(oldData[key] || ''),
            newValue: String(data[key] || ''),
          });
        }
      }
    }

    const updatedCard = await db.cardInstances.update(id, { data, status });
    return NextResponse.json({ card: updatedCard });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update card' }, { status: 500 });
  }
}
