import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { verifyPassword, createToken } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip, 10, 60000); // 10 attempts per minute
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait 1 minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Phone and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.users.findUnique({ phone });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    // Create JWT
    const token = await createToken({
      userId: user.id,
      phone: user.phone,
      role: user.role as 'admin' | 'client',
    });

    // Set httpOnly cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, phone: user.phone, role: user.role, name: user.name },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
