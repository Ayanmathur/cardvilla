-- Card Villa — Seed Data
-- Run this AFTER migration.sql in Supabase SQL Editor

-- Admin user (password: Password@12345, bcrypt hash with 12 rounds)
-- Generated via: bcrypt.hashSync('Password@12345', 12)
INSERT INTO "users" ("id", "phone", "password_hash", "role", "name", "created_at", "updated_at")
VALUES (
    'admin_001',
    '9999999999',
    '$2b$12$VI36p3Aw1Xntbb24RQjhiu7/i77tYkBQy2xo//6nhUgLHBS0xs2R.',
    'admin',
    'Card Villa Admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("phone") DO NOTHING;

-- Business Card category
INSERT INTO "categories" ("id", "name", "slug", "created_at")
VALUES (
    'cat_business_card',
    'Business Card',
    'business-card',
    CURRENT_TIMESTAMP
)
ON CONFLICT ("slug") DO NOTHING;
