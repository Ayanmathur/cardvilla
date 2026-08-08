import { NextResponse } from 'next/server';
import { getRegistryMeta } from '@card-villa/templates/src/registry-meta';

export async function GET() {
  try {
    const registryMeta = getRegistryMeta();
    const templates = Object.values(registryMeta).map((entry) => ({
      componentKey: entry.meta.componentKey,
      name: entry.meta.name,
      description: entry.meta.description,
      motionTier: entry.meta.motionTier,
      styleTone: entry.meta.styleTone,
      schema: entry.schema,
    }));

    return NextResponse.json({ templates });
  } catch (error: any) {
    console.error('Error fetching template registry:', error);
    return NextResponse.json({ error: 'Failed to fetch registry' }, { status: 500 });
  }
}
