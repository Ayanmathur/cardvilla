import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { paperDioramaSchema } from './schema';
import styles from './paper-diorama.module.css';

// SVG Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

export const PaperDiorama: React.FC<TemplateProps> = ({ data, isPreview }) => {
  const d = data || {};
  
  const fullName = d.full_name || 'Sarah Jenkins';
  const companyName = d.company_name || 'Design Co.';
  const title = d.title || 'Creative Director';
  const phone = d.phone || '+1 234 567 8900';
  const whatsapp = d.whatsapp || '+1 234 567 8900';
  const email = d.email || 'sarah@designco.com';
  const address = d.address || '789 Creative Blvd, SF 94107';
  const website = d.website || 'www.designco.com';
  
  const ctaSaveContact = d.cta_save_contact || 'Save Contact';
  const ctaCall = d.cta_call || 'Call';
  const ctaDirections = d.cta_directions || 'Get Directions';
  const ctaShare = d.cta_share || 'Share';

  return (
    <div className={styles.container}>
      <div className={styles.dioramaWrapper}>
        {/* Background Layer */}
        <motion.div 
          className={styles.layerBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Midground Layer (Mountains/Buildings Silhouette) */}
        <motion.div 
          className={styles.layerMid}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
        >
          <svg className={styles.svgLayer} viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100L0 40L15 25L30 45L55 10L80 50L100 30L100 100Z" />
          </svg>
        </motion.div>

        {/* Foreground Layer (Trees/Geometric Silhouette) */}
        <motion.div 
          className={styles.layerFront}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
        >
          <svg className={styles.svgLayer} viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100L0 60C20 40 40 70 60 50C80 30 90 65 100 55L100 100Z" />
          </svg>
        </motion.div>
      </div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <div className={styles.brandInfo}>
          {d.logo && <img src={d.logo} alt={companyName} className={styles.logo} />}
          {companyName && <h2 className={styles.companyName}>{companyName}</h2>}
          <h1 className={styles.fullName}>{fullName}</h1>
          <p className={styles.title}>{title}</p>
        </div>

        <div className={styles.contactGrid}>
          {[
            { icon: <PhoneIcon />, label: phone, href: `tel:${phone.replace(/\D/g, '')}` },
            { icon: <WhatsAppIcon />, label: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` },
            { icon: <EmailIcon />, label: email, href: `mailto:${email}` },
            { icon: <GlobeIcon />, label: website, href: website.startsWith('http') ? website : `https://${website}` },
            { icon: <MapIcon />, label: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` }
          ].map((item, i) => (
            item.label && (
              <a key={i} href={item.href} className={styles.contactItem}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.contactLabel}>{item.label}</span>
              </a>
            )
          ))}
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.primaryBtn}>
            <UserIcon /> {ctaSaveContact}
          </button>
          <div className={styles.secondaryActions}>
            <button className={styles.secondaryBtn}>
              <ShareIcon /> {ctaShare}
            </button>
            <button className={styles.secondaryBtn}>
               <PhoneIcon /> {ctaCall}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const meta: TemplateMeta = {
  name: "Paper Diorama",
  componentKey: "paper_diorama",
  description: "A creative, modern card featuring 2.5D paper cutout layers with smooth animations.",
  category: "Creative & Design",
  motionTier: 1,
  styleTone: "Modern & Graphic"
};

registerTemplate({
  component: PaperDiorama,
  schema: paperDioramaSchema,
  meta
});

export default PaperDiorama;
