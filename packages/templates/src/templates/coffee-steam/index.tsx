import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { coffeeSteamSchema } from './schema';
import { steamRise } from '../../utils/animations';
import styles from './coffee-steam.module.css';

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
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
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

// Steam Wisp Component
const SteamWispSvg = () => (
  <svg className={styles.steamSvg} viewBox="0 0 16 40">
    <path d="M 8 38 C 2 28, 14 20, 8 10 C 4 5, 10 2, 8 0" />
  </svg>
);

export const CoffeeSteam: React.FC<TemplateProps> = ({ data }) => {
  const d = data || {};

  const fullName = d.full_name || 'Marco Rossi';
  const companyName = d.company_name || 'Artisan Coffee Roasters';
  const title = d.title || 'Head Barista & Founder';
  const tagline = d.tagline || 'Single-Origin Roasts & Handcrafted Pastries • Est. 2019';
  const phone = d.phone || '+1 555 789 0123';
  const whatsapp = d.whatsapp || '+1 555 789 0123';
  const email = d.email || 'hello@artisancoffeeroasters.com';
  const address = d.address || '215 Espresso Way, Little Italy, San Francisco, CA';
  const website = d.website || 'www.artisancoffeeroasters.com';
  const logo = d.logo;

  const ctaSaveContact = d.cta_save_contact || 'Save Contact';
  const ctaCall = d.cta_call || 'Call Cafe';
  const ctaDirections = d.cta_directions || 'Find Cafe';
  const ctaShare = d.cta_share || 'Share Card';

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
  const cleanWhatsapp = whatsapp ? whatsapp.replace(/\D/g, '') : '';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Main Header Card */}
        <motion.div 
          className={styles.headerCard}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.headerBackgroundAccent} />

          {/* Coffee Cup + Continuous Steam Wisp Animation */}
          <div className={styles.motifContainer}>
            <div className={styles.steamArea}>
              <motion.div
                className={`${styles.steamWisp} ${styles.steamWisp1}`}
                variants={steamRise(0)}
                animate="animate"
              >
                <SteamWispSvg />
              </motion.div>

              <motion.div
                className={`${styles.steamWisp} ${styles.steamWisp2}`}
                variants={steamRise(1)}
                animate="animate"
              >
                <SteamWispSvg />
              </motion.div>

              <motion.div
                className={`${styles.steamWisp} ${styles.steamWisp3}`}
                variants={steamRise(2)}
                animate="animate"
              >
                <SteamWispSvg />
              </motion.div>
            </div>

            {/* Hand-drawn style Coffee Cup SVG */}
            <svg className={styles.cupSvg} viewBox="0 0 60 50">
              <path d="M 8 10 H 42 L 38 40 C 38 44, 12 44, 12 40 Z" />
              <path d="M 42 16 C 52 16, 52 32, 40 32" />
              <line x1="4" y1="46" x2="46" y2="46" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {logo && <img src={logo} alt={companyName} className={styles.logo} />}
          {companyName && <h2 className={styles.companyName}>{companyName}</h2>}
          <h1 className={styles.fullName}>{fullName}</h1>
          {title && <p className={styles.title}>{title}</p>}
          {tagline && <span className={styles.tagline}>{tagline}</span>}
        </motion.div>

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
  name: 'Coffee Steam',
  componentKey: 'coffee_steam',
  description: 'A warm, cozy cafe business card with continuous rising steam ambient motion.',
  category: 'Food & Hospitality',
  motionTier: 1,
  styleTone: 'Warm & Classic',
};

// Register template
registerTemplate({
  component: CoffeeSteam,
  schema: coffeeSteamSchema,
  meta,
});

export default CoffeeSteam;
