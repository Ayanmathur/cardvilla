import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { registryMeta } from '@card-villa/templates/src/registry-meta';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || searchParams.get('categorySlug') || 'all';

    // 1. Fetch DB templates if available
    let dbTemplates: any[] = [];
    try {
      let categoryId: string | undefined;
      if (categorySlug && categorySlug !== 'all') {
        const cat = await db.categories.findUnique({ slug: categorySlug });
        if (cat) categoryId = cat.id;
      }

      dbTemplates = await db.templates.findMany({
        status: 'published',
        ...(categoryId ? { categoryId } : {}),
      });
    } catch (e) {
      // Ignore DB error and fallback to registry
    }

    // 2. Fetch Code Registry Templates from static metadata
    const codeTemplates = Object.values(registryMeta).map((entry) => {
      const rawCat = entry.meta.category || 'business-card';
      let catSlug = 'business-card';

      if (rawCat.toLowerCase().includes('wedding')) catSlug = 'wedding';
      else if (rawCat.toLowerCase().includes('baby') || rawCat.toLowerCase().includes('kids')) catSlug = 'baby-kids';
      else if (rawCat.toLowerCase().includes('party')) catSlug = 'party';
      else if (rawCat.toLowerCase().includes('devotional')) catSlug = 'devotional';
      else if (rawCat.toLowerCase().includes('festival')) catSlug = 'festival';

      return {
        id: entry.meta.componentKey,
        name: entry.meta.name,
        componentKey: entry.meta.componentKey,
        categorySlug: catSlug,
        categoryName: entry.meta.category,
        description: entry.meta.description,
        motionTier: entry.meta.motionTier,
        styleTone: entry.meta.styleTone,
        sections: entry.meta.sections || null,
        schema: entry.schema,
      };
    });

    // Merge and filter
    const combined = [...codeTemplates];
    for (const dt of dbTemplates) {
      if (!combined.some(t => t.componentKey === dt.componentKey || t.id === dt.id)) {
        combined.push({
          id: dt.id,
          name: dt.name,
          componentKey: dt.componentKey || null,
          categorySlug: dt.category?.slug || 'business-card',
          categoryName: dt.category?.name || 'Business Card',
          description: dt.description || '',
          motionTier: 0,
          styleTone: 'Classic',
          sections: null,
          schema: dt.configSchema,
        });
      }
    }

    const filtered = categorySlug === 'all'
      ? combined
      : combined.filter(t => t.categorySlug === categorySlug);

    return NextResponse.json({ templates: filtered, total: filtered.length });
  } catch (error: any) {
    console.error('Public templates error:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
