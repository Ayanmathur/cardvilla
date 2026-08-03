import { NextRequest, NextResponse } from 'next/server';
import { db } from '@card-villa/schema';
import { requireAdmin } from '@/lib/auth';

// Helper to generate a unique random 8-char slug
function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const cards = await db.cardInstances.findMany();
    return NextResponse.json({ cards });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { templateId, ownerUserId, initialData } = body;

    if (!templateId || !ownerUserId) {
      return NextResponse.json({ error: 'templateId and ownerUserId are required' }, { status: 400 });
    }

    const template = await db.templates.findUnique({ id: templateId });
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const owner = await db.users.findUnique({ id: ownerUserId });
    if (!owner) {
      return NextResponse.json({ error: 'Client user not found' }, { status: 404 });
    }

    // Generate unique slug
    let slug = generateSlug();
    let existingSlug = await db.cardInstances.findUnique({ slug });
    while (existingSlug) {
      slug = generateSlug();
      existingSlug = await db.cardInstances.findUnique({ slug });
    }

    // Construct initial data JSON object from field schemas if not provided
    const cardData: Record<string, any> = initialData || {};
    if (template.fieldSchemas) {
      template.fieldSchemas.forEach((fs: any) => {
        if (cardData[fs.fieldKey] === undefined) {
          cardData[fs.fieldKey] = '';
        }
      });
    }

    const cardsAppDomain = process.env.NEXT_PUBLIC_CARDS_URL || 'http://localhost:3001';
    const targetUrl = `${cardsAppDomain}/${slug}`;

    // Create CardInstance + QRCode row
    const cardInstance = await db.cardInstances.create({
      templateId,
      ownerUserId,
      slug,
      data: cardData,
      status: 'active',
      targetUrl,
    });

    return NextResponse.json({ cardInstance }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    console.error('Create card instance error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create card' }, { status: 500 });
  }
}
