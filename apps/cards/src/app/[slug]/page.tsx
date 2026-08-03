import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@card-villa/schema';
import { PublicCardView } from './PublicCardView';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = await db.cardInstances.findUnique({ slug });

  if (!card) return { title: 'Card Not Found' };

  const name = card.data?.full_name || card.data?.company_name || 'Digital Business Card';
  return {
    title: `${name} — Digital Card`,
    description: `Digital business card for ${name}. Save contact details and connect instantly.`,
  };
}

export default async function PublicCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = await db.cardInstances.findUnique({ slug });

  if (!card || card.status !== 'active' || !card.template) {
    notFound();
  }

  return <PublicCardView card={card as any} />;
}
