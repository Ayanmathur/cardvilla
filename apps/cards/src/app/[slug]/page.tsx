import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@card-villa/schema';
import { PublicCardView } from './PublicCardView';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = await db.cardInstances.findUnique({ slug });

  if (!card) return { title: 'Card Not Found' };

  const name = card.data?.full_name || card.data?.company_name || 'Digital Business Card';
  const title = card.data?.title || '';
  const company = card.data?.company_name || '';
  const description = title && company
    ? `${name} — ${title} at ${company}. Digital business card — save contact & connect instantly.`
    : `Digital business card for ${name}. Save contact details and connect instantly.`;
  const cardUrl = `${process.env.NEXT_PUBLIC_CARDS_URL || 'https://cards.cardvilla.com'}/${slug}`;

  return {
    title: `${name} — Digital Card | Card Villa`,
    description,
    openGraph: {
      title: `${name} — Digital Business Card`,
      description,
      url: cardUrl,
      siteName: 'Card Villa',
      type: 'profile',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — Digital Business Card`,
      description,
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}

export default async function PublicCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = await db.cardInstances.findUnique({ slug });

  if (!card || card.status !== 'active') {
    notFound();
  }

  return <PublicCardView card={{
    ...card,
    component_key: card.template?.componentKey || (card as any).component_key || null,
  } as any} />;
}
