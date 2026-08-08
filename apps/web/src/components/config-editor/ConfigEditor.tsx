import React, { useState, useEffect } from 'react';
import styles from './ConfigEditor.module.css';

export interface ConfigSchemaField {
  key: string;
  label: string;
  type: string; // text | richtext | image | color | toggle | phone | whatsapp | address | url | date
  editableBy: 'admin_only' | 'client';
  required: boolean;
  defaultValue?: string;
  placeholder?: string;
  fieldScope?: 'instance' | 'template';
}

export interface ConfigEditorProps {
  configSchema: ConfigSchemaField[];
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
  role: 'admin' | 'client';
  previewComponent?: React.ReactNode;
}

export function ConfigEditor({ configSchema, data, onChange, role, previewComponent }: ConfigEditorProps) {
  const [formData, setFormData] = useState<Record<string, any>>(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (key: string, value: any) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    onChange(updated);
  };

  const visibleFields = configSchema.filter(field => 
    role === 'admin' ? true : field.editableBy === 'client'
  );

  const renderField = (field: ConfigSchemaField) => {
    const value = formData[field.key] ?? field.defaultValue ?? '';

    switch (field.type) {
      case 'text':
      case 'url':
      case 'phone':
      case 'whatsapp':
        return (
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'richtext':
      case 'address':
        return (
          <textarea
            className={styles.textarea}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        );
      case 'color':
        return (
          <div className={styles.colorPickerWrapper}>
            <input
              type="color"
              className={styles.colorInput}
              value={value || '#000000'}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder="#000000"
            />
          </div>
        );
      case 'toggle':
        return (
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleChange(field.key, e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        );
      case 'image':
        return (
          <div className={styles.imageUpload}>
            <input
              type="text"
              className={styles.input}
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder="Image URL"
            />
            {value && <img src={value} alt="Preview" className={styles.imagePreview} />}
          </div>
        );
      case 'date':
        return (
          <input
            type="date"
            className={styles.input}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            required={field.required}
          />
        );
      default:
        return (
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formPane}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Configuration</h2>
          <span className={styles.roleBadge}>{role} mode</span>
        </div>
        <div className={styles.fields}>
          {visibleFields.map(field => (
            <div key={field.key} className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label className={styles.label}>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>
                <div className={styles.meta}>
                  {field.fieldScope && <span className={styles.badge}>{field.fieldScope}</span>}
                  {field.editableBy === 'admin_only' && <span className={styles.badgeAdmin}>Admin</span>}
                </div>
              </div>
              {renderField(field)}
              {field.type === 'phone' && formData[field.key] && (
                <a href={`tel:${formData[field.key]}`} className={styles.previewLink} target="_blank" rel="noreferrer">
                  Test Call ↗
                </a>
              )}
              {field.type === 'whatsapp' && formData[field.key] && (
                <a href={`https://wa.me/${String(formData[field.key]).replace(/\D/g, '')}`} className={styles.previewLink} target="_blank" rel="noreferrer">
                  Test WhatsApp ↗
                </a>
              )}
              {field.type === 'address' && formData[field.key] && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(formData[field.key])}`} className={styles.previewLink} target="_blank" rel="noreferrer">
                  View on Maps ↗
                </a>
              )}
              {field.type === 'url' && formData[field.key] && (
                <a href={formData[field.key]} className={styles.previewLink} target="_blank" rel="noreferrer">
                  Test Link ↗
                </a>
              )}
            </div>
          ))}
          {visibleFields.length === 0 && (
            <p className={styles.emptyMessage}>No editable fields available.</p>
          )}
        </div>
      </div>
      <div className={styles.previewPane}>
        {previewComponent || (
          <div className={styles.emptyPreview}>
            <p>Live Preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
