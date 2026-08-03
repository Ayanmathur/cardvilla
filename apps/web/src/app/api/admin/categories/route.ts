import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const categories = await db.categories.findMany();
    return NextResponse.json({ categories });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
