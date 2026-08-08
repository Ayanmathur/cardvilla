import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { modernMinimalSchema } from './schema';
import styles from './modern_minimal.module.css';

// SVG Icons
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

export const ModernMinimal: React.FC<TemplateProps> = ({ data }) => {
  const d = data || {};

  const fullName = d.full_name || 'Alex Vance';
  const companyName = d.company_name || 'Vance Design Co.';
  const title = d.title || 'Principal Designer';
  const phone = d.phone || '+1 (555) 234-5678';
  const whatsapp = d.whatsapp || '+1 (555) 234-5678';
  const email = d.email || 'alex@vancedesign.com';
  const address = d.address || '742 Evergreen Terrace, San Francisco, CA';
  const website = d.website || 'www.vancedesign.com';
  const logo = d.logo;

  const ctaSaveContact = d.cta_save_contact || 'Save Contact';
  const ctaCall = d.cta_call || 'Call';
  const ctaDirections = d.cta_directions || 'Directions';
  const ctaShare = d.cta_share || 'Share';

  const contactItems = [
    { icon: <PhoneIcon />, text: phone, href: `tel:${phone.replace(/\D/g, '')}` },
    { icon: <WhatsAppIcon />, text: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` },
    { icon: <EmailIcon />, text: email, href: `mailto:${email}` },
    { icon: <GlobeIcon />, text: website, href: website.startsWith('http') ? website : `https://${website}` },
    { icon: <MapIcon />, text: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` },
  ];

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.cardWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.cornerMarkTop} />
        <div className={styles.cornerMarkBottom} />

        <div className={styles.headerZone}>
          {logo && (
            <div className={styles.logoContainer}>
              <img src={logo} alt={companyName || fullName} className={styles.logo} />
            </div>
          )}
          {companyName && <p className={styles.companyName}>{companyName}</p>}
          
          <div className={styles.identityBlock}>
            <h1 className={styles.fullName}>{fullName}</h1>
            {title && <p className={styles.title}>{title}</p>}
          </div>
        </div>

        <div className={styles.accentLine} />

        <div className={styles.contactList}>
          {contactItems.map((item, idx) => (
            item.text ? (
              <a key={idx} href={item.href} className={styles.contactItem} target="_blank" rel="noopener noreferrer">
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.contactText}>{item.text}</span>
              </a>
            ) : null
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryBtn}>
            <UserIcon /> {ctaSaveContact}
          </button>
          <div className={styles.secondaryRow}>
            <button className={styles.secondaryBtn}>
              <PhoneIcon /> {ctaCall}
            </button>
            <button className={styles.secondaryBtn}>
              <MapIcon /> {ctaDirections}
            </button>
            <button className={styles.secondaryBtn}>
              <ShareIcon /> {ctaShare}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const meta: TemplateMeta = {
  name: "Modern Minimal Base",
  componentKey: "modern_minimal",
  description: "Clean sans-serif business card with generous whitespace, dark background, and gold accent line.",
  category: "Business",
  motionTier: 0,
  styleTone: "Modern & Minimal"
};

registerTemplate({
  component: ModernMinimal,
  schema: modernMinimalSchema,
  meta
});

export default ModernMinimal;
