import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const status = searchParams.get('status') || undefined;

    const templates = await db.templates.findMany({ categoryId, status });
    return NextResponse.json({ templates });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { name, categoryId, thumbnailUrl, canvasJson, status, fieldSchemas } = body;

    if (!name || !categoryId || !canvasJson) {
      return NextResponse.json({ error: 'Name, categoryId, and canvasJson are required' }, { status: 400 });
    }

    const template = await db.templates.create({
      name,
      categoryId,
      thumbnailUrl,
      canvasJson,
      status: status || 'draft',
      createdById: admin.userId,
      fieldSchemas: fieldSchemas || [],
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    console.error('Create template error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create template' }, { status: 500 });
  }
}
