/**
 * Seed script: Register all 14 business card templates in the database.
 * Run AFTER the SQL migration has been applied.
 * 
 * Usage: npx tsx packages/schema/scripts/seed-templates.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://arzsasdyibhccgitkmjq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyenNhc2R5aWJoY2NnaXRrbWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc4MTI1NSwiZXhwIjoyMTAxMzU3MjU1fQ.nHOo_vDcYcEdjb76tYWakp1mibyrrC2NpE-cGsZqPWs';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

const ADMIN_USER_ID = 'usr_admin001'; // Replace with actual admin user ID from DB

// Import schema data
import { registryMeta } from '../src/../../../packages/templates/src/registry-meta';

async function seedTemplates() {
  console.log('🌱 Seeding templates...\n');

  // 1. Get or create the "business-card" category
  let { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'business-card')
    .single();

  if (!category) {
    console.log('Creating "business-card" category...');
    const catId = 'cat_bizcard_' + Date.now().toString(36);
    const { data: newCat, error: catErr } = await supabase.from('categories').insert({
      id: catId,
      name: 'Business Card',
      slug: 'business-card',
      created_at: new Date().toISOString(),
    }).select().single();
    if (catErr) throw new Error(`Failed to create category: ${catErr.message}`);
    category = newCat;
  }

  console.log(`Using category: ${category!.id}\n`);

  // 2. Get admin user ID
  const { data: adminUser } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'admin')
    .limit(1)
    .single();
  
  const adminId = adminUser?.id || ADMIN_USER_ID;

  // 3. Insert templates
  const now = new Date().toISOString();
  let created = 0;
  let skipped = 0;

  for (const [key, entry] of Object.entries(registryMeta)) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('templates')
      .select('id')
      .eq('component_key', key)
      .single();

    if (existing) {
      console.log(`  ⏭️  ${entry.meta.name} (${key}) — already exists, skipping`);
      skipped++;
      continue;
    }

    const templateId = 'tmpl_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    
    const { error } = await supabase.from('templates').insert({
      id: templateId,
      name: entry.meta.name,
      category_id: category!.id,
      canvas_json: null,
      component_key: key,
      config_schema: entry.schema,
      status: 'published',
      created_by: adminId,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      console.error(`  ❌ ${entry.meta.name} (${key}): ${error.message}`);
    } else {
      console.log(`  ✅ ${entry.meta.name} (${key}) → ${templateId}`);
      created++;
    }
  }

  console.log(`\n🎉 Done! Created: ${created}, Skipped: ${skipped}`);
}

seedTemplates().catch(console.error);
