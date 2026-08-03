import { createClient } from '@supabase/supabase-js';
import type { User, Category, Template, FieldSchema, CardInstance, QRCode, AuditLog } from '@prisma/client';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://arzsasdyibhccgitkmjq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyenNhc2R5aWJoY2NnaXRrbWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc4MTI1NSwiZXhwIjoyMTAxMzU3MjU1fQ.nHOo_vDcYcEdjb76tYWakp1mibyrrC2NpE-cGsZqPWs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

// Helper ORM methods for snake_case DB table mapping to Prisma-like camelCase objects
export const db = {
  users: {
    async findUnique(where: { id?: string; phone?: string }) {
      let query = supabase.from('users').select('*');
      if (where.id) query = query.eq('id', where.id);
      if (where.phone) query = query.eq('phone', where.phone);
      const { data, error } = await query.single();
      if (error || !data) return null;
      return mapUser(data);
    },
    async create(data: { phone: string; passwordHash: string; role?: string; name?: string | null }) {
      const id = 'usr_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      const now = new Date().toISOString();
      const insertData = {
        id,
        phone: data.phone,
        password_hash: data.passwordHash,
        role: data.role || 'client',
        name: data.name || null,
        created_at: now,
        updated_at: now,
      };
      const { data: created, error } = await supabase.from('users').insert(insertData).select().single();
      if (error) throw new Error(error.message);
      return mapUser(created);
    },
    async findMany() {
      const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return (data || []).map(mapUser);
    }
  },

  categories: {
    async findMany() {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw new Error(error.message);
      return (data || []).map(mapCategory);
    },
    async findUnique(where: { id?: string; slug?: string }) {
      let query = supabase.from('categories').select('*');
      if (where.id) query = query.eq('id', where.id);
      if (where.slug) query = query.eq('slug', where.slug);
      const { data, error } = await query.single();
      if (error || !data) return null;
      return mapCategory(data);
    }
  },

  templates: {
    async findMany(where?: { status?: string; categoryId?: string }) {
      let query = supabase.from('templates').select('*, category:categories(*)').order('created_at', { ascending: false });
      if (where?.status) query = query.eq('status', where.status);
      if (where?.categoryId) query = query.eq('category_id', where.categoryId);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data || []).map(mapTemplate);
    },
    async findUnique(where: { id: string }) {
      const { data, error } = await supabase
        .from('templates')
        .select('*, category:categories(*), field_schemas(*)')
        .eq('id', where.id)
        .single();
      if (error || !data) return null;
      return mapTemplate(data);
    },
    async create(data: {
      name: string;
      categoryId: string;
      thumbnailUrl?: string | null;
      canvasJson: any;
      status?: string;
      createdById: string;
      fieldSchemas?: Array<{
        fieldKey: string;
        fieldType: string;
        editableBy?: string;
        required?: boolean;
        label?: string;
        sortOrder?: number;
      }>;
    }) {
      const id = 'tmpl_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      const now = new Date().toISOString();
      const insertData = {
        id,
        name: data.name,
        category_id: data.categoryId,
        thumbnail_url: data.thumbnailUrl || null,
        canvas_json: data.canvasJson,
        status: data.status || 'draft',
        created_by: data.createdById,
        created_at: now,
        updated_at: now,
      };
      const { data: created, error } = await supabase.from('templates').insert(insertData).select().single();
      if (error) throw new Error(error.message);

      if (data.fieldSchemas && data.fieldSchemas.length > 0) {
        const fieldRows = data.fieldSchemas.map((fs, idx) => ({
          id: 'fs_' + Math.random().toString(36).substring(2, 11) + idx,
          template_id: id,
          field_key: fs.fieldKey,
          field_type: fs.fieldType,
          editable_by: fs.editableBy || 'client',
          required: fs.required ?? false,
          label: fs.label || null,
          sort_order: fs.sortOrder ?? idx,
          created_at: now,
        }));
        const { error: fsError } = await supabase.from('field_schemas').insert(fieldRows);
        if (fsError) console.error('Error inserting field schemas:', fsError);
      }

      return db.templates.findUnique({ id });
    },
    async update(id: string, data: {
      name?: string;
      categoryId?: string;
      thumbnailUrl?: string | null;
      canvasJson?: any;
      status?: string;
      fieldSchemas?: Array<{
        fieldKey: string;
        fieldType: string;
        editableBy?: string;
        required?: boolean;
        label?: string;
        sortOrder?: number;
      }>;
    }) {
      const updateData: any = { updated_at: new Date().toISOString() };
      if (data.name !== undefined) updateData.name = data.name;
      if (data.categoryId !== undefined) updateData.category_id = data.categoryId;
      if (data.thumbnailUrl !== undefined) updateData.thumbnail_url = data.thumbnailUrl;
      if (data.canvasJson !== undefined) updateData.canvas_json = data.canvasJson;
      if (data.status !== undefined) updateData.status = data.status;

      const { error } = await supabase.from('templates').update(updateData).eq('id', id);
      if (error) throw new Error(error.message);

      if (data.fieldSchemas) {
        // Delete existing field schemas and re-insert
        await supabase.from('field_schemas').delete().eq('template_id', id);
        const now = new Date().toISOString();
        const fieldRows = data.fieldSchemas.map((fs, idx) => ({
          id: 'fs_' + Math.random().toString(36).substring(2, 11) + idx,
          template_id: id,
          field_key: fs.fieldKey,
          field_type: fs.fieldType,
          editable_by: fs.editableBy || 'client',
          required: fs.required ?? false,
          label: fs.label || null,
          sort_order: fs.sortOrder ?? idx,
          created_at: now,
        }));
        await supabase.from('field_schemas').insert(fieldRows);
      }

      return db.templates.findUnique({ id });
    },
    async delete(id: string) {
      const { error } = await supabase.from('templates').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }
  },

  cardInstances: {
    async findMany(where?: { ownerUserId?: string }) {
      let query = supabase
        .from('card_instances')
        .select('*, template:templates(*), qr_code:qr_codes(*), owner:users(*)')
        .order('created_at', { ascending: false });
      if (where?.ownerUserId) query = query.eq('owner_user_id', where.ownerUserId);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data || []).map(mapCardInstance);
    },
    async findUnique(where: { id?: string; slug?: string }) {
      let query = supabase
        .from('card_instances')
        .select('*, template:templates(*, field_schemas(*)), qr_code:qr_codes(*), owner:users(*)');
      if (where.id) query = query.eq('id', where.id);
      if (where.slug) query = query.eq('slug', where.slug);
      const { data, error } = await query.single();
      if (error || !data) return null;
      return mapCardInstance(data);
    },
    async create(data: {
      templateId: string;
      ownerUserId: string;
      slug: string;
      data?: any;
      status?: string;
      targetUrl?: string;
    }) {
      const id = 'crd_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      const now = new Date().toISOString();
      const insertData = {
        id,
        template_id: data.templateId,
        owner_user_id: data.ownerUserId,
        slug: data.slug,
        status: data.status || 'active',
        data: data.data || {},
        created_at: now,
        updated_at: now,
      };
      const { data: created, error } = await supabase.from('card_instances').insert(insertData).select().single();
      if (error) throw new Error(error.message);

      // Create QR Code
      const qrId = 'qr_' + Math.random().toString(36).substring(2, 11);
      const targetUrl = data.targetUrl || `http://localhost:3001/${data.slug}`;
      await supabase.from('qr_codes').insert({
        id: qrId,
        card_instance_id: id,
        target_url: targetUrl,
        created_at: now,
      });

      return db.cardInstances.findUnique({ id });
    },
    async update(id: string, data: { data?: any; status?: string }) {
      const updateData: any = { updated_at: new Date().toISOString() };
      if (data.data !== undefined) updateData.data = data.data;
      if (data.status !== undefined) updateData.status = data.status;

      const { error } = await supabase.from('card_instances').update(updateData).eq('id', id);
      if (error) throw new Error(error.message);
      return db.cardInstances.findUnique({ id });
    }
  },

  auditLogs: {
    async create(data: {
      cardInstanceId: string;
      changedById: string;
      fieldKey: string;
      oldValue?: string | null;
      newValue?: string | null;
    }) {
      const id = 'aud_' + Math.random().toString(36).substring(2, 11);
      await supabase.from('audit_logs').insert({
        id,
        card_instance_id: data.cardInstanceId,
        changed_by: data.changedById,
        field_key: data.fieldKey,
        old_value: data.oldValue || null,
        new_value: data.newValue || null,
        timestamp: new Date().toISOString(),
      });
    }
  }
};

// Mapper helpers to convert DB snake_case to camelCase
function mapUser(row: any) {
  return {
    id: row.id,
    phone: row.phone,
    passwordHash: row.password_hash,
    role: row.role,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCategory(row: any) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    parentId: row.parent_id,
    createdAt: row.created_at,
  };
}

function mapTemplate(row: any) {
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    thumbnailUrl: row.thumbnail_url,
    canvasJson: row.canvas_json,
    status: row.status,
    createdById: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    category: row.category ? mapCategory(row.category) : undefined,
    fieldSchemas: row.field_schemas ? row.field_schemas.map(mapFieldSchema) : [],
  };
}

function mapFieldSchema(row: any) {
  return {
    id: row.id,
    templateId: row.template_id,
    fieldKey: row.field_key,
    fieldType: row.field_type,
    editableBy: row.editable_by,
    required: row.required,
    label: row.label,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function mapCardInstance(row: any) {
  return {
    id: row.id,
    templateId: row.template_id,
    ownerUserId: row.owner_user_id,
    slug: row.slug,
    status: row.status,
    data: row.data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    template: row.template ? mapTemplate(row.template) : undefined,
    qrCode: row.qr_code ? { id: row.qr_code.id, cardInstanceId: row.qr_code.card_instance_id, targetUrl: row.qr_code.target_url } : undefined,
    owner: row.owner ? mapUser(row.owner) : undefined,
  };
}
