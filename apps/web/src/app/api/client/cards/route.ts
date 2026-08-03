import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const cards = await db.cardInstances.findMany({ ownerUserId: user.userId });
    return NextResponse.json({ cards });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}
