import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || searchParams.get('categorySlug') || 'business-card';

    // Find category by slug if provided
    let categoryId: string | undefined;
    if (categorySlug) {
      const cat = await db.categories.findUnique({ slug: categorySlug });
      if (cat) categoryId = cat.id;
    }

    // Always filter by status = 'published' for public endpoints
    const templates = await db.templates.findMany({
      status: 'published',
      categoryId,
    });

    return NextResponse.json({ templates });
  } catch (error: any) {
    console.error('Public templates error:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
