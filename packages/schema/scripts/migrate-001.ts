import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://arzsasdyibhccgitkmjq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyenNhc2R5aWJoY2NnaXRrbWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc4MTI1NSwiZXhwIjoyMTAxMzU3MjU1fQ.nHOo_vDcYcEdjb76tYWakp1mibyrrC2NpE-cGsZqPWs';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

async function migrate() {
  console.log('Running migration: 001_component_registry...');
  
  // 1. Add component_key column
  const { error: e1 } = await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE templates ADD COLUMN IF NOT EXISTS component_key TEXT;`
  }).single();
  
  // If RPC doesn't exist, use direct table operations instead
  // The columns may already exist from a previous run

  // 2. Add config_schema column  
  const { error: e2 } = await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE templates ADD COLUMN IF NOT EXISTS config_schema JSONB DEFAULT '[]'::jsonb;`
  }).single();

  // 3. Clean old data (field_schemas, old templates, etc.)
  console.log('Cleaning old data...');
  
  const { error: e3 } = await supabase.from('field_schemas').delete().neq('id', '');
  if (e3) console.log('field_schemas cleanup:', e3.message);
  
  const { error: e4 } = await supabase.from('audit_logs').delete().neq('id', '');
  if (e4) console.log('audit_logs cleanup:', e4.message);
  
  const { error: e5 } = await supabase.from('qr_codes').delete().neq('id', '');
  if (e5) console.log('qr_codes cleanup:', e5.message);
  
  const { error: e6 } = await supabase.from('card_instances').delete().neq('id', '');
  if (e6) console.log('card_instances cleanup:', e6.message);
  
  const { error: e7 } = await supabase.from('templates').delete().neq('id', '');
  if (e7) console.log('templates cleanup:', e7.message);

  // 4. Verify columns exist by attempting a select
  const { data: testData, error: testErr } = await supabase
    .from('templates')
    .select('id, component_key, config_schema')
    .limit(1);
  
  if (testErr) {
    console.error('Migration verification failed - columns may not exist yet.');
    console.error('Please run the following SQL in your Supabase SQL Editor:');
    console.error(`
ALTER TABLE templates ADD COLUMN IF NOT EXISTS component_key TEXT;
ALTER TABLE templates ADD COLUMN IF NOT EXISTS config_schema JSONB DEFAULT '[]'::jsonb;
ALTER TABLE templates ALTER COLUMN canvas_json DROP NOT NULL;
ALTER TABLE templates ALTER COLUMN canvas_json SET DEFAULT NULL;
    `);
  } else {
    console.log('✅ Migration verified - component_key and config_schema columns exist.');
  }
  
  console.log('Migration complete.');
}

migrate().catch(console.error);
