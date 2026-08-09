'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './cards.module.css';

interface CardInstance {
  id: string;
  slug: string;
  status: string;
  createdAt: string;
  data: Record<string, any>;
  template?: { name: string; category?: { name: string } };
  owner?: { name?: string | null; phone: string };
  qrCode?: { targetUrl: string };
}

export default function AdminCardsPage() {
  const router = useRouter();

  const [cards, setCards] = useState<CardInstance[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchCards = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/cards');
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch card instances');
      }
      const data = await res.json();
      setCards(data.cards || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const filteredCards = cards.filter((c) => {
    const term = search.toLowerCase();
    const phone = c.owner?.phone || '';
    const clientName = (c.owner?.name || '').toLowerCase();
    const slug = c.slug.toLowerCase();
    const company = (c.data?.company_name || '').toLowerCase();
    const personName = (c.data?.full_name || '').toLowerCase();

    return (
      phone.includes(term) ||
      clientName.includes(term) ||
      slug.includes(term) ||
      company.includes(term) ||
      personName.includes(term)
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>All Issued Card Instances</h1>
          <p className={styles.subtitle}>
            Admin oversight: view and override-edit any client's digital business card.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link href="/admin/clients" className={styles.createBtn}>
            ➕ Issue New Card
          </Link>
          <Link href="/admin/page" className={styles.backBtn}>
            ← Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 Search cards by client phone, client name, slug, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.countBadge}>
          Total Issued Cards: <strong>{filteredCards.length}</strong>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>Loading card instances...</div>
      ) : filteredCards.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No card instances found</h3>
          <p>Issue a card to a client from the Client Management tab.</p>
          <Link href="/admin/clients" className={styles.createBtn}>
            👤 Go to Client Management
          </Link>
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Card Title / Name</th>
                <th>Client (Owner)</th>
                <th>Public Slug & URL</th>
                <th>Template</th>
                <th>Status</th>
                <th>Date Issued</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.map((card) => {
                const publicUrl = `${process.env.NEXT_PUBLIC_CARDS_URL || 'http://localhost:3001'}/${card.slug}`;
                const title = card.data?.full_name || card.data?.company_name || 'Business Card';

                return (
                  <tr key={card.id}>
                    <td>
                      <div className={styles.cardTitleBox}>
                        <strong className={styles.cardTitle}>{title}</strong>
                        {card.data?.company_name && (
                          <span className={styles.companySub}>{card.data.company_name}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.ownerBox}>
                        <span className={styles.ownerPhone}>{card.owner?.phone}</span>
                        {card.owner?.name && (
                          <span className={styles.ownerName}>{card.owner.name}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.slugLink}
                      >
                        /c/{card.slug}
                      </a>
                    </td>
                    <td>{card.template?.name || 'Business Card'}</td>
                    <td>
                      <span className={styles.statusBadge}>{card.status}</span>
                    </td>
                    <td>{new Date(card.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actionGroup}>
                        <Link
                          href={`/admin/cards/${card.id}/edit`}
                          className={styles.editBtn}
                        >
                          ✏️ Admin Edit
                        </Link>
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.viewBtn}
                        >
                          🌐 Live View
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
