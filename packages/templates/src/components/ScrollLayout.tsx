/**
 * ScrollLayout — Shared scrollable layout for invitation templates (Section 8.9)
 * 
 * Replaces InvitationLayout's single-view centered design with a genuine
 * top-to-bottom scrollable multi-section website experience.
 * 
 * Business card templates continue using their own layouts — this is
 * exclusively for invitation categories (Wedding, Baby, Party, Devotional, Festival).
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ScrollLayout.module.css';

interface ScrollLayoutProps {
  children: React.ReactNode;
  data: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
  /** Accent color for action buttons */
  accentColor?: string;
  /** Whether to show the sticky action bar at the bottom */
  showActions?: boolean;
}

// ── SVG Icons ──
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

function getMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function generateIcsUrl(data: Record<string, any>): string {
  const date = data.event_date || data.events?.[0]?.event_date;
  const time = data.event_time || data.events?.[0]?.event_time || '12:00';
  const venue = data.venue_name || data.events?.[0]?.venue_name || '';
  const title = data.partner1_name && data.partner2_name
    ? `${data.partner1_name} & ${data.partner2_name}'s Wedding`
    : data.event_title || data.ceremony_title || 'Event';
  
  if (!date) return '#';
  const dtStr = date.replace(/-/g, '') + 'T' + time.replace(/[^0-9]/g, '').padEnd(4, '0').slice(0, 4) + '00';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    `DTSTART:${dtStr}`, `SUMMARY:${title}`, `LOCATION:${venue}`,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export const ScrollLayout: React.FC<ScrollLayoutProps> = ({
  children,
  data,
  className,
  style,
  accentColor = '#C9A84C',
  showActions = true,
}) => {
  const hasActions = showActions && (data.phone || data.whatsapp || data.venue_address || data.event_date);

  return (
    <div
      className={`${styles.scrollContainer} ${className || ''}`}
      style={style}
    >
      {/* Main scrollable content — sections flow top to bottom */}
      <div className={styles.scrollContent}>
        {children}
      </div>

      {/* Sticky action bar at bottom */}
      {hasActions && (
        <motion.div
          className={styles.stickyActionBar}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        >
          {data.phone && (
            <a href={`tel:${data.phone}`} className={styles.actionBtn} style={{ background: accentColor }}>
              <PhoneIcon /> <span>{data.cta_call || 'Call'}</span>
            </a>
          )}
          {data.whatsapp && (
            <a href={`https://wa.me/${data.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{ background: accentColor }}>
              <WhatsAppIcon /> <span>WhatsApp</span>
            </a>
          )}
          {data.venue_address && (
            <a href={getMapsUrl(data.venue_address)} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{ background: accentColor }}>
              <MapIcon /> <span>{data.cta_directions || 'Directions'}</span>
            </a>
          )}
          {data.event_date && (
            <a href={generateIcsUrl(data)} download="event.ics" className={styles.actionBtn} style={{ background: accentColor }}>
              <CalendarIcon /> <span>{data.cta_calendar || 'Calendar'}</span>
            </a>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ScrollLayout;
