import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { verifyPassword, createToken } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { isValidPhone } from '@/lib/validation';

const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 });

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    try {
      await limiter.check(5, ip); // 5 attempts per minute per IP
    } catch {
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

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
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
