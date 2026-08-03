import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAuth, verifyPassword, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const userSession = await requireAuth();
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const user = await db.users.findUnique({ id: userSession.userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const valid = await verifyPassword(currentPassword, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    const newHash = await hashPassword(newPassword);
    // Note: We can update user password in db
    await db.users.findUnique({ id: userSession.userId }); // fetch check

    // Save updated password in DB
    const { supabase } = require('@card-villa/schema');
    await supabase.from('users').update({ password_hash: newHash, updated_at: new Date().toISOString() }).eq('id', user.id);

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
