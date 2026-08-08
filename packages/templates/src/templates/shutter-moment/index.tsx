import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { shutterMomentSchema } from './schema';
import styles from './shutter-moment.module.css';

// SVG Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export const ShutterMoment: React.FC<TemplateProps> = ({ data, isPreview }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Only play animation once on load
    setHasAnimated(true);
  }, []);

  const d = data || {};
  
  // Provide defaults for demo purposes if data is missing
  const fullName = d.full_name || 'James Carter';
  const companyName = d.company_name || 'Carter Studios';
  const title = d.title || 'Professional Photographer';
  const specialty = d.specialty || 'Weddings • Portraits • Editorial';
  const phone = d.phone || '+1 234 567 8900';
  const whatsapp = d.whatsapp || '+1 234 567 8900';
  const email = d.email || 'hello@carterstudios.com';
  const address = d.address || '123 Creative Avenue, Arts District, NY 10001';
  const website = d.website || 'www.carterstudios.com';
  
  const ctaSaveContact = d.cta_save_contact || 'Save Contact';
  const ctaCall = d.cta_call || 'Call';
  const ctaDirections = d.cta_directions || 'Get Directions';
  const ctaShare = d.cta_share || 'Share';

  return (
    <div className={styles.container}>
      {/* 2. Shutter flash (runs once) */}
      <AnimatePresence>
        {!hasAnimated && (
          <motion.div 
            className={styles.flashOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.15, delay: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div className={styles.content}>
        <div className={styles.heroSection}>
          {/* 1. Camera icon fades in */}
          <motion.div 
            className={styles.cameraIconContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg className={styles.cameraSvg} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="25" width="80" height="50" rx="6" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="3" />
              <path d="M75 35H80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M25 25V20C25 17.2386 27.2386 15 30 15H45L50 25H25Z" stroke="currentColor" strokeWidth="3" />
            </svg>
            
            {/* 3. Photo rectangle slides out */}
            <motion.div 
              className={styles.photoPrint}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -45 }}
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            >
               <div className={styles.photoContent}>
                 <div className={styles.photoLandscape} />
               </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.brandInfo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {d.logo ? (
               <img src={d.logo} alt={companyName} className={styles.logo} />
            ) : (
               <h2 className={styles.companyName}>{companyName}</h2>
            )}
            <h1 className={styles.fullName}>{fullName}</h1>
            <p className={styles.title}>{title}</p>
            <div className={styles.divider} />
            <p className={styles.specialty}>{specialty}</p>
          </motion.div>
        </div>

        {/* 4. Contact info stagger-fades in */}
        <motion.div 
          className={styles.contactGrid}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.0
              }
            }
          }}
        >
          {[
            { icon: <PhoneIcon />, label: phone, href: `tel:${phone.replace(/\D/g, '')}` },
            { icon: <WhatsAppIcon />, label: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` },
            { icon: <EmailIcon />, label: email, href: `mailto:${email}` },
            { icon: <GlobeIcon />, label: website, href: website.startsWith('http') ? website : `https://${website}` },
            { icon: <MapIcon />, label: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` }
          ].map((item, i) => (
            item.label && (
              <motion.a 
                key={i}
                href={item.href}
                className={styles.contactItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.contactLabel}>{item.label}</span>
              </motion.a>
            )
          ))}
        </motion.div>

        <motion.div 
          className={styles.actionButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export const meta: TemplateMeta = {
  name: "Shutter Moment",
  componentKey: "shutter_moment",
  description: "A premium, animated business card for photographers and videographers.",
  category: "Professional Services",
  motionTier: 2,
  styleTone: "Elegant & Modern"
};

// Register the template
registerTemplate({
  component: ShutterMoment,
  schema: shutterMomentSchema,
  meta
});

export default ShutterMoment;
