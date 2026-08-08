-- Add new columns for coded component system
ALTER TABLE templates ADD COLUMN IF NOT EXISTS component_key TEXT;
ALTER TABLE templates ADD COLUMN IF NOT EXISTS config_schema JSONB DEFAULT '[]'::jsonb;

-- canvas_json becomes nullable (no longer required)
ALTER TABLE templates ALTER COLUMN canvas_json DROP NOT NULL;
ALTER TABLE templates ALTER COLUMN canvas_json SET DEFAULT NULL;

-- Clean old data (will be replaced by coded templates)
DELETE FROM field_schemas;
DELETE FROM audit_logs;
DELETE FROM qr_codes;
DELETE FROM card_instances;
DELETE FROM templates;
