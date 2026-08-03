'use client';

import React, { useState } from 'react';
import { CanvasRenderer } from '@/components/builder/CanvasRenderer';
import styles from './CardFieldEditor.module.css';

interface FieldSchema {
  id: string;
  fieldKey: string;
  fieldType: string;
  editableBy: 'admin_only' | 'client';
  required: boolean;
  label?: string;
  sortOrder: number;
}

interface CardFieldEditorProps {
  cardId?: string;
  slug: string;
  template: {
    name: string;
    canvasJson: any;
    fieldSchemas: FieldSchema[];
  };
  initialData: Record<string, any>;
  qrCodeUrl?: string;
  userRole: 'admin' | 'client';
  onSave: (data: Record<string, any>) => Promise<void>;
  isSaving?: boolean;
}

export const CardFieldEditor: React.FC<CardFieldEditorProps> = ({
  cardId,
  slug,
  template,
  initialData,
  qrCodeUrl,
  userRole,
  onSave,
  isSaving = false,
}) => {
  const [data, setData] = useState<Record<string, any>>(initialData || {});
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // Filter fields based on user role
  const editableFields = template.fieldSchemas.filter((fs) => {
    if (userRole === 'admin') return true; // Admin can edit all fields
    return fs.editableBy === 'client'; // Client can only edit fields marked editable_by = 'client'
  });

  const handleFieldChange = (key: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(data);
  };

  const publicCardUrl = `http://localhost:3001/${slug}`;

  return (
    <div className={styles.container}>
      <header className={styles.topHeader}>
        <div>
          <h1 className={styles.title}>Card Content Editor</h1>
          <p className={styles.subtitle}>
            Template: <strong>{template.name}</strong> · Public Slug: <code className={styles.slugCode}>{slug}</code>
          </p>
        </div>

        <div className={styles.headerActions}>
          <a
            href={publicCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewLiveBtn}
          >
            🌐 View Live Card
          </a>
          <button onClick={handleSubmit} className={styles.saveBtn} disabled={isSaving}>
            {isSaving ? 'Saving Changes...' : '💾 Save Card Content'}
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className={styles.tabSwitcher}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'form' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('form')}
        >
          ✏️ Edit Fields
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'preview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Live Preview
        </button>
      </div>

      <div className={styles.editorBody}>
        {/* Left Panel: Field Inputs */}
        <div className={`${styles.formPanel} ${activeTab === 'form' ? styles.showPanel : ''}`}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.sectionHeading}>
              {userRole === 'admin' ? 'All Template Fields (Admin Control)' : 'Editable Card Fields'}
            </h3>

            {editableFields.length === 0 ? (
              <p className={styles.noFields}>No editable fields defined for this template.</p>
            ) : (
              editableFields.map((fs) => {
                const value = data[fs.fieldKey] !== undefined ? data[fs.fieldKey] : '';

                return (
                  <div key={fs.id} className={styles.fieldGroup}>
                    <label className={styles.label}>
                      {fs.label || fs.fieldKey}
                      {fs.required && <span className={styles.required}> *</span>}
                      {fs.editableBy === 'admin_only' && (
                        <span className={styles.adminOnlyBadge}>Admin Only</span>
                      )}
                    </label>

                    {/* Input rendering by fieldType */}
                    {fs.fieldType === 'text' && (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(fs.fieldKey, e.target.value)}
                        required={fs.required}
                        className={styles.input}
                        placeholder={`Enter ${fs.label || fs.fieldKey}...`}
                      />
                    )}

                    {fs.fieldType === 'phone' && (
                      <input
                        type="tel"
                        value={value}
                        onChange={(e) => handleFieldChange(fs.fieldKey, e.target.value)}
                        required={fs.required}
                        className={styles.input}
                        placeholder="e.g. +91 98765 43210"
                      />
                    )}

                    {fs.fieldType === 'whatsapp' && (
                      <input
                        type="tel"
                        value={value}
                        onChange={(e) => handleFieldChange(fs.fieldKey, e.target.value)}
                        className={styles.input}
                        placeholder="WhatsApp phone number with country code"
                      />
                    )}

                    {fs.fieldType === 'address' && (
                      <textarea
                        value={value}
                        onChange={(e) => handleFieldChange(fs.fieldKey, e.target.value)}
                        className={styles.textarea}
                        rows={2}
                        placeholder="Full business address for Google Maps link"
                      />
                    )}

                    {(fs.fieldType === 'url' || fs.fieldType === 'social') && (
                      <input
                        type="url"
                        value={value}
                        onChange={(e) => handleFieldChange(fs.fieldKey, e.target.value)}
                        className={styles.input}
                        placeholder="https://yourwebsite.com/catalog"
                      />
                    )}

                    {(fs.fieldType === 'logo' || fs.fieldType === 'image') && (
                      <div className={styles.imageInputBox}>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleFieldChange(fs.fieldKey, e.target.value)}
                          className={styles.input}
                          placeholder="Image URL or upload path..."
                        />
                        {value && (
                          <div className={styles.thumbPreview}>
                            <img src={value} alt="Preview" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            <button type="submit" className={styles.saveFormBtn} disabled={isSaving}>
              {isSaving ? 'Saving...' : '💾 Save Card Content'}
            </button>
          </form>
        </div>

        {/* Right Panel: Real-time Live Preview */}
        <div className={`${styles.previewPanel} ${activeTab === 'preview' ? styles.showPanel : ''}`}>
          <div className={styles.previewCardBox}>
            <div className={styles.previewHeading}>Real-Time Card Rendering</div>
            <CanvasRenderer canvasJson={template.canvasJson} data={data} scale={0.9} interactive={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
