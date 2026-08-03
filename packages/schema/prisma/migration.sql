-- Card Villa — Full Database Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/arzsasdyibhccgitkmjq/sql/new

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'client');
CREATE TYPE "TagType" AS ENUM ('format', 'design', 'style', 'religion', 'occasion');
CREATE TYPE "TemplateStatus" AS ENUM ('draft', 'published');
CREATE TYPE "FieldType" AS ENUM ('text', 'image', 'date', 'address', 'logo', 'phone', 'whatsapp', 'url', 'social');
CREATE TYPE "EditableBy" AS ENUM ('admin_only', 'client');
CREATE TYPE "CardStatus" AS ENUM ('active', 'archived');

-- CreateTable: users
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'client',
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable: categories
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable: tags
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "TagType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable: templates
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "canvas_json" JSONB NOT NULL,
    "status" "TemplateStatus" NOT NULL DEFAULT 'draft',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable: template_tags
CREATE TABLE "template_tags" (
    "template_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    CONSTRAINT "template_tags_pkey" PRIMARY KEY ("template_id","tag_id")
);

-- CreateTable: field_schemas
CREATE TABLE "field_schemas" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "field_key" TEXT NOT NULL,
    "field_type" "FieldType" NOT NULL,
    "editable_by" "EditableBy" NOT NULL DEFAULT 'client',
    "required" BOOLEAN NOT NULL DEFAULT false,
    "label" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "field_schemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable: card_instances
CREATE TABLE "card_instances" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "CardStatus" NOT NULL DEFAULT 'active',
    "data" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "card_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable: qr_codes
CREATE TABLE "qr_codes" (
    "id" TEXT NOT NULL,
    "card_instance_id" TEXT NOT NULL,
    "target_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable: audit_logs
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "card_instance_id" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "field_key" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");
CREATE UNIQUE INDEX "field_schemas_template_id_field_key_key" ON "field_schemas"("template_id", "field_key");
CREATE UNIQUE INDEX "card_instances_slug_key" ON "card_instances"("slug");
CREATE UNIQUE INDEX "qr_codes_card_instance_id_key" ON "qr_codes"("card_instance_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "templates" ADD CONSTRAINT "templates_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "templates" ADD CONSTRAINT "templates_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "template_tags" ADD CONSTRAINT "template_tags_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "template_tags" ADD CONSTRAINT "template_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "field_schemas" ADD CONSTRAINT "field_schemas_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "card_instances" ADD CONSTRAINT "card_instances_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "card_instances" ADD CONSTRAINT "card_instances_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_card_instance_id_fkey" FOREIGN KEY ("card_instance_id") REFERENCES "card_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_card_instance_id_fkey" FOREIGN KEY ("card_instance_id") REFERENCES "card_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
