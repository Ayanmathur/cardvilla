import { redirect } from 'next/navigation';

export default async function ReservedCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Redirect to public gallery filtered by category slug
  redirect(`/gallery?category=${encodeURIComponent(slug)}`);
}
