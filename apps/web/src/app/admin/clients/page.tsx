'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './clients.module.css';

interface ClientUser {
  id: string;
  phone: string;
  name?: string | null;
  role: string;
  createdAt: string;
}

interface Template {
  id: string;
  name: string;
  status: string;
  category?: { name: string };
}

export default function AdminClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState<ClientUser[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Register New Client Modal state
  const [showAddClientModal, setShowAddClientModal] = useState<boolean>(false);
  const [newPhone, setNewPhone] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('Password@12345');
  const [isCreatingClient, setIsCreatingClient] = useState<boolean>(false);

  // New Card Modal state
  const [selectedClientForCard, setSelectedClientForCard] = useState<ClientUser | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [isCreatingCard, setIsCreatingCard] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clientsRes, tmplRes] = await Promise.all([
        fetch('/api/admin/clients'),
        fetch('/api/admin/templates?status=published'),
      ]);

      if (!clientsRes.ok) {
        if (clientsRes.status === 401 || clientsRes.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch clients');
      }

      const clientsData = await clientsRes.json();
      setClients(clientsData.clients || []);

      if (tmplRes.ok) {
        const tmplData = await tmplRes.json();
        const pubTemplates = tmplData.templates || [];
        setTemplates(pubTemplates);
        if (pubTemplates.length > 0) setSelectedTemplateId(pubTemplates[0].id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone || !newPassword) return;

    try {
      setIsCreatingClient(true);
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: newPhone, name: newName, password: newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create client');
      }

      setClients((prev) => [data.client, ...prev]);
      setShowAddClientModal(false);
      setNewPhone('');
      setNewName('');
      alert(`Client account created for ${data.client.phone}!`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreatingClient(false);
    }
  };

  const handleCreateCardInstance = async () => {
    if (!selectedClientForCard || !selectedTemplateId) {
      alert('Please select a template');
      return;
    }

    try {
      setIsCreatingCard(true);
      const res = await fetch('/api/admin/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplateId,
          ownerUserId: selectedClientForCard.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create card instance');
      }

      // Redirect admin directly to the card editing screen!
      router.push(`/admin/cards/${data.cardInstance.id}/edit`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreatingCard(false);
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.phone.includes(search) || (c.name && c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Client Management</h1>
          <p className={styles.subtitle}>
            Register client accounts and issue digital business cards.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button onClick={() => setShowAddClientModal(true)} className={styles.createBtn}>
            👤 Register New Client
          </button>
          <Link href="/admin/page" className={styles.backBtn}>
            ← Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 Search clients by phone number or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.countBadge}>
          Clients Registered: <strong>{filteredClients.length}</strong>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>Loading clients...</div>
      ) : filteredClients.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No clients found</h3>
          <p>Register your first client to start creating digital cards.</p>
          <button onClick={() => setShowAddClientModal(true)} className={styles.createBtn}>
            👤 Register Client Now
          </button>
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className={styles.clientName}>{client.name || '—'}</td>
                  <td className={styles.clientPhone}>{client.phone}</td>
                  <td>
                    <span className={styles.roleBadge}>{client.role}</span>
                  </td>
                  <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => setSelectedClientForCard(client)}
                      className={styles.issueCardBtn}
                    >
                      🎴 New Card Instance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal 1: Register Client ────────────────────────── */}
      {showAddClientModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddClientModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Register New Client Account</h3>

            <form onSubmit={handleCreateClient} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  required
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Client Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Verma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Initial Password *</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={isCreatingClient}>
                  {isCreatingClient ? 'Creating...' : 'Register Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal 2: Create Card Instance for Client ────────── */}
      {selectedClientForCard && (
        <div className={styles.modalOverlay} onClick={() => setSelectedClientForCard(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              Issue New Card for {selectedClientForCard.name || selectedClientForCard.phone}
            </h3>

            <div className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Select Published Template *</label>
                {templates.length === 0 ? (
                  <p className={styles.warnText}>
                    ⚠️ No published templates available! Go to <Link href="/admin/templates">Template Builder</Link> to publish a template first.
                  </p>
                ) : (
                  <select
                    value={selectedTemplateId}
                    onChange={(e) => setSelectedTemplateId(e.target.value)}
                    className={styles.modalSelect}
                  >
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.category?.name || 'Business Card'})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setSelectedClientForCard(null)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCardInstance}
                  className={styles.submitBtn}
                  disabled={isCreatingCard || templates.length === 0}
                >
                  {isCreatingCard ? 'Issuing Card...' : '🚀 Create Card & Open Editor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
