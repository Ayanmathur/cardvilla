'use client';

import React, { useState } from 'react';
import { CanvasJson, CanvasElement, CanvasBackground, FieldType, EditableBy } from './types';
import { CanvasRenderer } from './CanvasRenderer';
import { STARTER_PRESETS, StarterPreset } from './starterPresets';
import styles from './TemplateCanvasBuilder.module.css';

interface TemplateCanvasBuilderProps {
  initialName?: string;
  initialCategoryId?: string;
  initialStatus?: 'draft' | 'published';
  initialCanvasJson?: CanvasJson;
  categories: Array<{ id: string; name: string; slug: string }>;
  onSave: (data: {
    name: string;
    categoryId: string;
    status: 'draft' | 'published';
    canvasJson: CanvasJson;
    fieldSchemas: Array<{
      fieldKey: string;
      fieldType: FieldType;
      editableBy: EditableBy;
      required: boolean;
      label: string;
      sortOrder: number;
    }>;
  }) => Promise<void>;
  isSaving?: boolean;
}

const DEFAULT_CANVAS: CanvasJson = {
  version: '1.0',
  width: 360,
  height: 640,
  background: { type: 'gradient', gradient: 'linear-gradient(135deg, #14172a 0%, #0d0f1a 100%)' },
  elements: [],
};

export const TemplateCanvasBuilder: React.FC<TemplateCanvasBuilderProps> = ({
  initialName = '',
  initialCategoryId = '',
  initialStatus = 'draft',
  initialCanvasJson = DEFAULT_CANVAS,
  categories,
  onSave,
  isSaving = false,
}) => {
  const [name, setName] = useState(initialName || 'New Business Card Template');
  const [categoryId, setCategoryId] = useState(initialCategoryId || (categories[0]?.id || 'cat_business_card'));
  const [status, setStatus] = useState<'draft' | 'published'>(initialStatus);
  const [canvasJson, setCanvasJson] = useState<CanvasJson>(initialCanvasJson);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0.95);

  const selectedElement = canvasJson.elements.find((el) => el.id === selectedElementId) || null;

  // Extract all FieldSchemas bound across canvas elements
  const extractFieldSchemas = () => {
    const schemas: Array<{
      fieldKey: string;
      fieldType: FieldType;
      editableBy: EditableBy;
      required: boolean;
      label: string;
      sortOrder: number;
    }> = [];

    const seen = new Set<string>();

    canvasJson.elements.forEach((el, idx) => {
      if (el.fieldBinding && el.fieldBinding.fieldKey && !seen.has(el.fieldBinding.fieldKey)) {
        seen.add(el.fieldBinding.fieldKey);
        schemas.push({
          fieldKey: el.fieldBinding.fieldKey,
          fieldType: el.fieldBinding.fieldType,
          editableBy: el.fieldBinding.editableBy,
          required: el.fieldBinding.required,
          label: el.fieldBinding.label || el.fieldBinding.fieldKey,
          sortOrder: idx,
        });
      }
    });

    return schemas;
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a template name');
      return;
    }
    const fieldSchemas = extractFieldSchemas();
    await onSave({
      name,
      categoryId,
      status,
      canvasJson,
      fieldSchemas,
    });
  };

  // Load a starter preset template
  const loadPreset = (preset: StarterPreset) => {
    if (confirm(`Load preset "${preset.name}"? This will replace the current canvas.`)) {
      setName(preset.name);
      setCanvasJson(preset.canvasJson);
      setSelectedElementId(null);
    }
  };

  // Element Manipulation
  const addElement = (type: CanvasElement['type'], extraProps: Partial<CanvasElement> = {}) => {
    const id = 'el_' + Math.random().toString(36).substring(2, 9);
    const newEl: CanvasElement = {
      id,
      type,
      x: 30,
      y: 100 + canvasJson.elements.length * 30,
      width: type === 'button' ? 300 : 280,
      height: type === 'button' ? 48 : type === 'motif' ? 60 : 36,
      zIndex: canvasJson.elements.length + 1,
      content: type === 'text' ? 'New Text' : type === 'button' ? 'Action Button' : '',
      fontSize: 16,
      color: '#ffffff',
      ...extraProps,
    };

    setCanvasJson({
      ...canvasJson,
      elements: [...canvasJson.elements, newEl],
    });
    setSelectedElementId(id);
  };

  const updateSelectedElement = (updates: Partial<CanvasElement>) => {
    if (!selectedElementId) return;

    setCanvasJson({
      ...canvasJson,
      elements: canvasJson.elements.map((el) => (el.id === selectedElementId ? { ...el, ...updates } : el)),
    });
  };

  const deleteSelectedElement = () => {
    if (!selectedElementId) return;
    setCanvasJson({
      ...canvasJson,
      elements: canvasJson.elements.filter((el) => el.id !== selectedElementId),
    });
    setSelectedElementId(null);
  };

  const updateBackground = (bg: CanvasBackground) => {
    setCanvasJson({
      ...canvasJson,
      background: bg,
    });
  };

  return (
    <div className={styles.builderLayout}>
      {/* ── Top Bar ────────────────────────────────────────── */}
      <header className={styles.topBar}>
        <div className={styles.titleArea}>
          <input
            type="text"
            className={styles.nameInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Template Name..."
          />
          <div className={styles.categoryBadge}>
            Category:
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={styles.selectCategory}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.presetArea}>
          <span className={styles.presetLabel}>Load Preset:</span>
          {STARTER_PRESETS.map((p) => (
            <button key={p.id} onClick={() => loadPreset(p)} className={styles.presetBtn} title={p.description}>
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className={styles.actionsArea}>
          <button
            className={`${styles.statusBtn} ${status === 'published' ? styles.published : styles.draft}`}
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
          >
            {status === 'published' ? '● Published' : '○ Draft'}
          </button>
          <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : '💾 Save Template'}
          </button>
        </div>
      </header>

      {/* ── Main Work Area ─────────────────────────────────── */}
      <div className={styles.workspace}>
        {/* Left Toolbar */}
        <aside className={styles.leftPanel}>
          <h4 className={styles.panelHeading}>Add Elements</h4>

          <button onClick={() => addElement('text')} className={styles.addBtn}>
            📝 Text Block
          </button>

          <button
            onClick={() =>
              addElement('button', {
                actionType: 'phone',
                backgroundColor: '#c9a84c',
                color: '#0d0f1a',
                content: 'Call Now',
                fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 0 },
              })
            }
            className={styles.addBtn}
          >
            📞 Phone Call Button
          </button>

          <button
            onClick={() =>
              addElement('button', {
                actionType: 'whatsapp',
                backgroundColor: '#25d366',
                color: '#ffffff',
                content: 'WhatsApp Chat',
                fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp Link', sortOrder: 0 },
              })
            }
            className={styles.addBtn}
          >
            💬 WhatsApp Button
          </button>

          <button
            onClick={() =>
              addElement('button', {
                actionType: 'maps',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                content: '📍 Open in Google Maps',
                fieldBinding: { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 0 },
              })
            }
            className={styles.addBtn}
          >
            📍 Google Maps Link
          </button>

          <button
            onClick={() =>
              addElement('button', {
                actionType: 'url',
                backgroundColor: 'rgba(201,168,76,0.15)',
                color: '#c9a84c',
                content: '📋 View Catalog / Menu',
                fieldBinding: { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Catalog Link', sortOrder: 0 },
              })
            }
            className={styles.addBtn}
          >
            📋 Catalog / Link Button
          </button>

          <button onClick={() => addElement('logo')} className={styles.addBtn}>
            🖼️ Logo / Image Zone
          </button>

          <hr className={styles.divider} />

          <h4 className={styles.panelHeading}>Motifs & Animations</h4>
          <button onClick={() => addElement('motif', { motifType: 'scissors', animationType: 'snip', animationTier: 2 })} className={styles.addBtn}>
            ✂️ Salon Scissors (Snip)
          </button>
          <button onClick={() => addElement('motif', { motifType: 'heartbeat', animationType: 'pulse', animationTier: 1 })} className={styles.addBtn}>
            ❤️ Clinic Heart (Pulse)
          </button>
          <button onClick={() => addElement('motif', { motifType: 'tooth', animationType: 'sparkle', animationTier: 1 })} className={styles.addBtn}>
            🦷 Dental Tooth (Glint)
          </button>
          <button onClick={() => addElement('motif', { motifType: 'camera', animationType: 'shutter', animationTier: 2 })} className={styles.addBtn}>
            📷 Camera (Shutter Flash)
          </button>
          <button onClick={() => addElement('motif', { motifType: 'coffee_cup', animationType: 'steam_rise', animationTier: 1 })} className={styles.addBtn}>
            ☕ Coffee Cup (Rising Steam)
          </button>

          <hr className={styles.divider} />

          <h4 className={styles.panelHeading}>Card Material</h4>
          <div className={styles.bgGrid}>
            <button onClick={() => updateBackground({ type: 'gradient', gradient: 'linear-gradient(135deg, #14172a 0%, #0d0f1a 100%)' })} className={styles.bgBtn}>
              Navy
            </button>
            <button onClick={() => updateBackground({ type: 'wood_dark' })} className={styles.bgBtn}>
              Dark Wood
            </button>
            <button onClick={() => updateBackground({ type: 'wood_light' })} className={styles.bgBtn}>
              Light Wood
            </button>
            <button onClick={() => updateBackground({ type: 'gold_foil' })} className={styles.bgBtn}>
              Gold Foil
            </button>
            <button onClick={() => updateBackground({ type: 'silver_foil' })} className={styles.bgBtn}>
              Silver Foil
            </button>
            <button onClick={() => updateBackground({ type: 'receipt' })} className={styles.bgBtn}>
              Receipt
            </button>
            <button onClick={() => updateBackground({ type: 'rope_border' })} className={styles.bgBtn}>
              Rope Frame
            </button>
          </div>
        </aside>

        {/* Center Canvas Viewport */}
        <main className={styles.canvasCenter}>
          <div className={styles.zoomControls}>
            <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}>-</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}>+</button>
          </div>

          <div onClick={() => setSelectedElementId(null)}>
            <CanvasRenderer
              canvasJson={canvasJson}
              scale={zoom}
              selectedElementId={selectedElementId || undefined}
              onSelectElement={(id) => setSelectedElementId(id)}
            />
          </div>
        </main>

        {/* Right Inspector Panel */}
        <aside className={styles.rightPanel}>
          {selectedElement ? (
            <div className={styles.inspector}>
              <div className={styles.inspectorHeader}>
                <h4>Edit Element ({selectedElement.type})</h4>
                <button onClick={deleteSelectedElement} className={styles.deleteBtn}>
                  🗑️ Delete
                </button>
              </div>

              {/* Geometry Controls */}
              <div className={styles.propGroup}>
                <label className={styles.label}>Position & Size</label>
                <div className={styles.row}>
                  <span>X:</span>
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) => updateSelectedElement({ x: Number(e.target.value) })}
                    className={styles.numInput}
                  />
                  <span>Y:</span>
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) => updateSelectedElement({ y: Number(e.target.value) })}
                    className={styles.numInput}
                  />
                </div>
                <div className={styles.row}>
                  <span>W:</span>
                  <input
                    type="number"
                    value={selectedElement.width}
                    onChange={(e) => updateSelectedElement({ width: Number(e.target.value) })}
                    className={styles.numInput}
                  />
                  <span>H:</span>
                  <input
                    type="number"
                    value={selectedElement.height}
                    onChange={(e) => updateSelectedElement({ height: Number(e.target.value) })}
                    className={styles.numInput}
                  />
                </div>
              </div>

              {/* Content input if text or button */}
              {(selectedElement.type === 'text' || selectedElement.type === 'button') && (
                <div className={styles.propGroup}>
                  <label className={styles.label}>Default Text Content</label>
                  <input
                    type="text"
                    value={selectedElement.content || ''}
                    onChange={(e) => updateSelectedElement({ content: e.target.value })}
                    className={styles.textInput}
                  />
                </div>
              )}

              {/* Typography / Color */}
              {selectedElement.type === 'text' && (
                <div className={styles.propGroup}>
                  <label className={styles.label}>Typography</label>
                  <div className={styles.row}>
                    <input
                      type="number"
                      value={selectedElement.fontSize || 16}
                      onChange={(e) => updateSelectedElement({ fontSize: Number(e.target.value) })}
                      className={styles.numInput}
                    />
                    <span>px Color:</span>
                    <input
                      type="color"
                      value={selectedElement.color || '#ffffff'}
                      onChange={(e) => updateSelectedElement({ color: e.target.value })}
                    />
                  </div>
                  <div className={styles.row}>
                    <select
                      value={selectedElement.textAlign || 'left'}
                      onChange={(e) => updateSelectedElement({ textAlign: e.target.value as any })}
                      className={styles.selectInput}
                    >
                      <option value="left">Left Align</option>
                      <option value="center">Center Align</option>
                      <option value="right">Right Align</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Field Schema Binding */}
              <div className={`${styles.propGroup} ${styles.fieldBindingBox}`}>
                <h5 className={styles.fieldBindingTitle}>🔗 Field Schema Binding</h5>
                <p className={styles.fieldBindingDesc}>
                  Bind this element to a field key so clients or admins can edit its value.
                </p>

                <div className={styles.row}>
                  <label className={styles.label}>Field Key:</label>
                  <input
                    type="text"
                    placeholder="e.g. phone_number"
                    value={selectedElement.fieldBinding?.fieldKey || ''}
                    onChange={(e) => {
                      const key = e.target.value;
                      if (!key) {
                        updateSelectedElement({ fieldBinding: undefined });
                      } else {
                        updateSelectedElement({
                          fieldBinding: {
                            fieldKey: key,
                            fieldType: selectedElement.fieldBinding?.fieldType || 'text',
                            editableBy: selectedElement.fieldBinding?.editableBy || 'client',
                            required: selectedElement.fieldBinding?.required ?? false,
                            label: selectedElement.fieldBinding?.label || key,
                            sortOrder: 0,
                          },
                        });
                      }
                    }}
                    className={styles.textInput}
                  />
                </div>

                {selectedElement.fieldBinding?.fieldKey && (
                  <>
                    <div className={styles.row}>
                      <label className={styles.label}>Field Type:</label>
                      <select
                        value={selectedElement.fieldBinding.fieldType}
                        onChange={(e) =>
                          updateSelectedElement({
                            fieldBinding: { ...selectedElement.fieldBinding!, fieldType: e.target.value as FieldType },
                          })
                        }
                        className={styles.selectInput}
                      >
                        <option value="text">text</option>
                        <option value="phone">phone (tap-to-call)</option>
                        <option value="whatsapp">whatsapp (chat link)</option>
                        <option value="address">address (Google Maps)</option>
                        <option value="url">url (catalog/appointment/review)</option>
                        <option value="logo">logo</option>
                        <option value="image">image</option>
                        <option value="social">social</option>
                      </select>
                    </div>

                    <div className={styles.row}>
                      <label className={styles.label}>Editable By:</label>
                      <select
                        value={selectedElement.fieldBinding.editableBy}
                        onChange={(e) =>
                          updateSelectedElement({
                            fieldBinding: { ...selectedElement.fieldBinding!, editableBy: e.target.value as EditableBy },
                          })
                        }
                        className={styles.selectInput}
                      >
                        <option value="client">client (Self-service)</option>
                        <option value="admin_only">admin_only (Admin restricted)</option>
                      </select>
                    </div>

                    <div className={styles.row}>
                      <label className={styles.label}>Label:</label>
                      <input
                        type="text"
                        value={selectedElement.fieldBinding.label || ''}
                        onChange={(e) =>
                          updateSelectedElement({
                            fieldBinding: { ...selectedElement.fieldBinding!, label: e.target.value },
                          })
                        }
                        className={styles.textInput}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.noSelection}>
              <p>👈 Select an element on the canvas or click "Add Elements" to start editing.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
