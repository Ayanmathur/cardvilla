import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { woodGrainSchema } from './schema';
import styles from './wood_grain.module.css';

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

export const WoodGrain: React.FC<TemplateProps> = ({ data }) => {
  const d = data || {};

  const fullName = d.full_name || 'Ethan Woodcraft';
  const companyName = d.company_name || 'Timber & Grain Co.';
  const title = d.title || 'Master Artisan & Carpenter';
  const phone = d.phone || '+1 (555) 890-1234';
  const whatsapp = d.whatsapp || '+1 (555) 890-1234';
  const email = d.email || 'ethan@timberandgrain.com';
  const address = d.address || '88 Mill Ridge Road, Timber Falls, OR';
  const website = d.website || 'www.timberandgrain.com';
  const logo = d.logo;

  const ctaSaveContact = d.cta_save_contact || 'Save Contact';
  const ctaCall = d.cta_call || 'Call Workshop';
  const ctaDirections = d.cta_directions || 'Visit Workshop';
  const ctaShare = d.cta_share || 'Share Card';

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
        <div className={styles.woodBevel} />

        <div className={styles.grommetTL} />
        <div className={styles.grommetTR} />
        <div className={styles.grommetBL} />
        <div className={styles.grommetBR} />

        <div className={styles.headerZone}>
          {logo && <img src={logo} alt={companyName || fullName} className={styles.logo} />}
          {companyName && <h2 className={styles.engravedTitle}>{companyName}</h2>}

          <h1 className={styles.fullName}>{fullName}</h1>
          {title && <p className={styles.craftTitle}>{title}</p>}

          <div className={styles.engravedLine} />
        </div>

        <div className={styles.contactGrid}>
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
  name: "Wood Grain Craft",
  componentKey: "wood_grain",
  description: "Artisanal wooden plaque business card featuring CSS wood-grain gradients and laser-engraved typography.",
  category: "Artisan",
  motionTier: 0,
  styleTone: "Classic & Rustic"
};

registerTemplate({
  component: WoodGrain,
  schema: woodGrainSchema,
  meta
});

export default WoodGrain;
