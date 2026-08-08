/**
 * Run SQL migration + seed templates via Supabase REST API.
 * Usage: npx tsx packages/schema/scripts/run-migration-and-seed.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://arzsasdyibhccgitkmjq.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyenNhc2R5aWJoY2NnaXRrbWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc4MTI1NSwiZXhwIjoyMTAxMzU3MjU1fQ.nHOo_vDcYcEdjb76tYWakp1mibyrrC2NpE-cGsZqPWs';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

// ---- Registry Meta (inline to avoid import issues) ----
import { registryMeta } from '../../templates/src/registry-meta';

async function runMigration() {
  console.log('🔄 Step 1: Running SQL migration...\n');

  // Check if component_key column already exists
  const { data: cols } = await supabase.rpc('to_regclass', { relation: 'templates' }).select();
  
  // Try adding columns - if they exist, the IF NOT EXISTS handles it
  // We'll use individual queries via the REST API
  
  // Check current template columns
  const { data: testRow, error: testErr } = await supabase
    .from('templates')
    .select('*')
    .limit(1);
  
  if (testErr) {
    console.log('⚠️  Templates table access error:', testErr.message);
    console.log('   The database may be paused. Please unpause it in Supabase dashboard.');
    console.log('   Then run the SQL migration manually:\n');
    console.log('   ALTER TABLE templates ADD COLUMN IF NOT EXISTS component_key TEXT;');
    console.log('   ALTER TABLE templates ADD COLUMN IF NOT EXISTS config_schema JSONB DEFAULT \'[]\'::jsonb;');
    console.log('   ALTER TABLE templates ALTER COLUMN canvas_json DROP NOT NULL;');
    console.log('   ALTER TABLE templates ALTER COLUMN canvas_json SET DEFAULT NULL;');
    return false;
  }
  
  // Check if component_key column exists by trying to query it
  const { data: checkCol, error: checkErr } = await supabase
    .from('templates')
    .select('component_key')
    .limit(1);
  
  if (checkErr && checkErr.message.includes('component_key')) {
    console.log('⚠️  component_key column does not exist yet.');
    console.log('   Please run the SQL migration in Supabase SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/arzsasdyibhccgitkmjq/sql\n');
    console.log('   ALTER TABLE templates ADD COLUMN IF NOT EXISTS component_key TEXT;');
    console.log('   ALTER TABLE templates ADD COLUMN IF NOT EXISTS config_schema JSONB DEFAULT \'[]\'::jsonb;');
    console.log('   ALTER TABLE templates ALTER COLUMN canvas_json DROP NOT NULL;');
    console.log('   ALTER TABLE templates ALTER COLUMN canvas_json SET DEFAULT NULL;');
    return false;
  }
  
  console.log('✅ Migration columns exist (component_key, config_schema)\n');
  return true;
}

async function seedTemplates() {
  console.log('🌱 Step 2: Seeding templates...\n');

  // 1. Get or create the "business-card" category
  let { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'business-card')
    .single();

  if (!category) {
    console.log('Creating "business-card" category...');
    const catId = 'cat_' + Math.random().toString(36).substring(2, 11);
    const { data: newCat, error: catErr } = await supabase.from('categories').insert({
      id: catId,
      name: 'Business Card',
      slug: 'business-card',
      created_at: new Date().toISOString(),
    }).select().single();
    if (catErr) {
      console.error('❌ Failed to create category:', catErr.message);
      return;
    }
    category = newCat;
  }

  console.log(`📂 Using category: ${category!.id}\n`);

  // 2. Get admin user ID
  const { data: adminUser } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'admin')
    .limit(1)
    .single();
  
  const adminId = adminUser?.id || 'usr_admin001';
  console.log(`👤 Using admin: ${adminId}\n`);

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

async function main() {
  const migrationOk = await runMigration();
  if (!migrationOk) {
    console.log('\n⛔ Migration not applied. Run the SQL manually, then re-run this script.');
    process.exit(1);
  }
  await seedTemplates();
}

main().catch(console.error);
