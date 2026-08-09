/**
 * Shared Invitation Layout Component
 * 
 * Base layout used by all invitation templates. Provides:
 * - Responsive 360×640 card with proper mobile viewport handling
 * - Shared CTA buttons (Call, Directions, RSVP)
 * - Google Maps link for venue address
 * - Consistent scroll behavior for multi-section invitations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants } from './animations';

interface InvitationLayoutProps {
  children: React.ReactNode;
  data: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
  /** Whether to show the action buttons at the bottom */
  showActions?: boolean;
}

// ── SVG Icons ──
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export function formatEventDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function getMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const InvitationActions: React.FC<{
  data: Record<string, any>;
  accentColor?: string;
  textColor?: string;
}> = ({ data, accentColor = '#C9A84C', textColor = '#fff' }) => {
  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    color: textColor,
    background: accentColor,
    flex: 1,
    minWidth: 0,
  };

  return (
    <motion.div
      variants={slideUpVariants}
      custom={5}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {data.phone && (
        <a href={`tel:${data.phone}`} style={btnStyle}>
          <PhoneIcon /> {data.cta_call || 'Call'}
        </a>
      )}
      {data.whatsapp && (
        <a href={`https://wa.me/${data.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={btnStyle}>
          <WhatsAppIcon /> WhatsApp
        </a>
      )}
      {data.venue_address && (
        <a href={getMapsUrl(data.venue_address)} target="_blank" rel="noopener noreferrer" style={btnStyle}>
          <MapIcon /> {data.cta_directions || 'Directions'}
        </a>
      )}
    </motion.div>
  );
};

export const InvitationLayout: React.FC<InvitationLayoutProps> = ({
  children,
  data,
  className,
  style,
  showActions = true,
}) => {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {showActions && (data.phone || data.whatsapp || data.venue_address) && (
        <InvitationActions data={data} />
      )}
    </div>
  );
};

export default InvitationLayout;
