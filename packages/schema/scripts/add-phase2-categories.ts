/**
 * Add Phase 2 invitation categories to the database.
 * Usage: npx tsx packages/schema/scripts/add-phase2-categories.ts
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://arzsasdyibhccgitkmjq.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyenNhc2R5aWJoY2NnaXRrbWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc4MTI1NSwiZXhwIjoyMTAxMzU3MjU1fQ.nHOo_vDcYcEdjb76tYWakp1mibyrrC2NpE-cGsZqPWs';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

const categories = [
  { id: 'cat_wedding', name: 'Wedding & Pre-Wedding', slug: 'wedding' },
  { id: 'cat_baby_kids', name: 'Baby & Kids', slug: 'baby-kids' },
  { id: 'cat_party', name: 'Party & Celebration', slug: 'party' },
  { id: 'cat_devotional', name: 'Puja / Path & Devotional', slug: 'devotional' },
  { id: 'cat_festival', name: 'Festival Wishes', slug: 'festival' },
];

async function main() {
  console.log('📂 Adding Phase 2 categories...\n');
  const now = new Date().toISOString();

  for (const cat of categories) {
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', cat.slug)
      .single();

    if (existing) {
      console.log(`  ⏭️  ${cat.name} (${cat.slug}) — already exists`);
      continue;
    }

    const { error } = await supabase.from('categories').insert({
      ...cat,
      created_at: now,
    });

    if (error) {
      console.error(`  ❌ ${cat.name}: ${error.message}`);
    } else {
      console.log(`  ✅ ${cat.name} (${cat.slug}) → ${cat.id}`);
    }
  }

  console.log('\n🎉 Phase 2 categories ready!');
}

main().catch(console.error);
