import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAdmin, hashPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const allUsers = await db.users.findMany();
    // Filter only client role users
    const clients = allUsers.filter((u) => u.role === 'client');
    return NextResponse.json({ clients });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { phone, password, name } = body;

    if (!phone || !password) {
      return NextResponse.json({ error: 'Phone and initial password are required' }, { status: 400 });
    }

    const existing = await db.users.findUnique({ phone });
    if (existing) {
      return NextResponse.json({ error: 'Phone number already registered' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const client = await db.users.create({
      phone,
      passwordHash,
      role: 'client',
      name: name || null,
    });

    return NextResponse.json({ client }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create client' }, { status: 500 });
  }
}
