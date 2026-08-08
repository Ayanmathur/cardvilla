import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { goldRadianceSchema } from './schema';
import { shineSweep } from '../../utils/animations';
import styles from './gold-radiance.module.css';

// SVG Icons
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const UserPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="17" y1="11" x2="23" y2="11" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

// Ornamental Flourish Frame SVG
const GoldFlourish = () => (
  <svg className={styles.flourishSvg} viewBox="0 0 200 20" fill="none">
    <path d="M0 10 H75 M125 10 H200" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <path d="M75 10 C85 2 95 18 100 10 C105 2 115 18 125 10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="100" cy="10" r="2.5" fill="currentColor" />
  </svg>
);

export const GoldRadiance: React.FC<TemplateProps> = ({ data }) => {
  const d = data || {};

  const fullName = d.full_name || 'Alexander Vance';
  const companyName = d.company_name || 'Vance & Co. Luxury Jewelers';
  const title = d.title || 'Master Artisan & Director';
  const tagline = d.tagline || 'Certified Gemologists • Est. 1985';
  const phone = d.phone || '+1 800 555 7788';
  const whatsapp = d.whatsapp || '+1 800 555 7788';
  const email = d.email || 'alexander@vancejewelers.com';
  const address = d.address || '5th Avenue Mansion, Suite 900, New York, NY';
  const website = d.website || 'www.vancejewelers.com';
  const logo = d.logo;

  const ctaSaveContact = d.cta_save_contact || 'Save VIP Contact';
  const ctaCall = d.cta_call || 'Call Direct';
  const ctaDirections = d.cta_directions || 'Visit Showroom';
  const ctaShare = d.cta_share || 'Share Card';

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
  const cleanWhatsapp = whatsapp ? whatsapp.replace(/\D/g, '') : '';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Gold Border Card Container with Shine Sweep */}
        <div className={styles.goldBorderWrapper}>
          <motion.div
            className={styles.shineOverlay}
            variants={shineSweep}
            initial="initial"
            animate="animate"
          />

          <motion.div 
            className={styles.headerCard}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GoldFlourish />
            {logo && <img src={logo} alt={companyName} className={styles.logo} />}
            {companyName && <h2 className={styles.companyName}>{companyName}</h2>}
            <h1 className={styles.fullName}>{fullName}</h1>
            {title && <p className={styles.title}>{title}</p>}
            {tagline && <span className={styles.tagline}>{tagline}</span>}
          </motion.div>
        </div>

        {/* Contact Links */}
        <div className={styles.contactGrid}>
          {phone && (
            <a href={`tel:${cleanPhone}`} className={styles.contactItem}>
              <div className={styles.iconWrapper}><PhoneIcon /></div>
              <div className={styles.contactTextGroup}>
                <span className={styles.contactValue}>{phone}</span>
              </div>
            </a>
          )}
          {whatsapp && (
            <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <div className={styles.iconWrapper}><WhatsAppIcon /></div>
              <div className={styles.contactTextGroup}>
                <span className={styles.contactValue}>{whatsapp}</span>
              </div>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className={styles.contactItem}>
              <div className={styles.iconWrapper}><EmailIcon /></div>
              <div className={styles.contactTextGroup}>
                <span className={styles.contactValue}>{email}</span>
              </div>
            </a>
          )}
          {website && (
            <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <div className={styles.iconWrapper}><GlobeIcon /></div>
              <div className={styles.contactTextGroup}>
                <span className={styles.contactValue}>{website}</span>
              </div>
            </a>
          )}
          {address && (
            <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <div className={styles.iconWrapper}><MapIcon /></div>
              <div className={styles.contactTextGroup}>
                <span className={styles.contactValue}>{address}</span>
              </div>
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button className={styles.primaryBtn}>
            <UserPlusIcon /> {ctaSaveContact}
          </button>
          <div className={styles.secondaryActions}>
            {phone && (
              <a href={`tel:${cleanPhone}`} className={styles.secondaryBtn}>
                <PhoneIcon /> {ctaCall}
              </a>
            )}
            {address && (
              <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                <MapIcon /> {ctaDirections}
              </a>
            )}
            <button className={styles.secondaryBtn}>
              <ShareIcon /> {ctaShare}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const meta: TemplateMeta = {
  name: 'Gold Radiance',
  componentKey: 'gold_radiance',
  description: 'An ornate, luxurious black-and-gold business card with diagonal shine sweep animation.',
  category: 'Luxury & Jewelry',
  motionTier: 1,
  styleTone: 'Ornate & Luxurious',
};

// Register template
registerTemplate({
  component: GoldRadiance,
  schema: goldRadianceSchema,
  meta,
});

export default GoldRadiance;
