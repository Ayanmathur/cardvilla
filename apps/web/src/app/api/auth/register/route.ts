import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password, name } = body;

    // Validation
    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Phone and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await db.users.findUnique({ phone });
    if (existing) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 409 }
      );
    }

    // Create user (always client role via this endpoint)
    const passwordHash = await hashPassword(password);
    const user = await db.users.create({
      phone,
      passwordHash,
      role: 'client',
      name: name || null,
    });

    return NextResponse.json(
      {
        message: 'Registration successful',
        user: { id: user.id, phone: user.phone, role: user.role, name: user.name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
