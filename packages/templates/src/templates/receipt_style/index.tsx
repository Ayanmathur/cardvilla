import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { receiptStyleSchema } from './schema';
import styles from './receipt_style.module.css';

// SVG Barcode Component
const BarcodeSvg = () => (
  <svg className={styles.barcodeSvg} viewBox="0 0 200 40" fill="currentColor">
    <rect x="0" y="0" width="4" height="40"/>
    <rect x="7" y="0" width="2" height="40"/>
    <rect x="12" y="0" width="5" height="40"/>
    <rect x="20" y="0" width="2" height="40"/>
    <rect x="25" y="0" width="4" height="40"/>
    <rect x="32" y="0" width="2" height="40"/>
    <rect x="37" y="0" width="7" height="40"/>
    <rect x="47" y="0" width="2" height="40"/>
    <rect x="52" y="0" width="4" height="40"/>
    <rect x="59" y="0" width="2" height="40"/>
    <rect x="64" y="0" width="5" height="40"/>
    <rect x="72" y="0" width="2" height="40"/>
    <rect x="77" y="0" width="4" height="40"/>
    <rect x="84" y="0" width="7" height="40"/>
    <rect x="94" y="0" width="2" height="40"/>
    <rect x="99" y="0" width="4" height="40"/>
    <rect x="106" y="0" width="5" height="40"/>
    <rect x="114" y="0" width="2" height="40"/>
    <rect x="119" y="0" width="4" height="40"/>
    <rect x="126" y="0" width="2" height="40"/>
    <rect x="131" y="0" width="7" height="40"/>
    <rect x="141" y="0" width="2" height="40"/>
    <rect x="146" y="0" width="4" height="40"/>
    <rect x="153" y="0" width="5" height="40"/>
    <rect x="161" y="0" width="2" height="40"/>
    <rect x="166" y="0" width="4" height="40"/>
    <rect x="173" y="0" width="2" height="40"/>
    <rect x="178" y="0" width="7" height="40"/>
    <rect x="188" y="0" width="2" height="40"/>
    <rect x="193" y="0" width="5" height="40"/>
  </svg>
);

export const ReceiptStyle: React.FC<TemplateProps> = ({ data }) => {
  const d = data || {};

  const fullName = d.full_name || 'Sam Cashier';
  const companyName = d.company_name || 'Corner Store Co.';
  const title = d.title || 'Store Manager';
  const phone = d.phone || '+1 (555) 321-9876';
  const whatsapp = d.whatsapp || '+1 (555) 321-9876';
  const email = d.email || 'sam@cornerstore.com';
  const address = d.address || '101 Market St, Suite 4, NY';
  const website = d.website || 'www.cornerstore.com';
  const logo = d.logo;

  const receiptHeader = d.receipt_header || '*** OFFICIAL RECEIPT ***';
  const thankYouNote = d.thank_you_note || 'THANK YOU FOR YOUR BUSINESS!';
  const ctaSaveContact = d.cta_save_contact || '[ SAVE CONTACT ]';
  const ctaCall = d.cta_call || '[ CALL ]';
  const ctaDirections = d.cta_directions || '[ MAP ]';
  const ctaShare = d.cta_share || '[ SHARE ]';

  const dateStr = new Date().toISOString().split('T')[0];
  const timeStr = '12:45:00';
  const receiptNo = 'RCPT-#' + Math.floor(100000 + Math.random() * 900000);

  const contactItems = [
    { label: 'TEL:', text: phone, href: `tel:${phone.replace(/\D/g, '')}` },
    { label: 'WA:', text: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` },
    { label: 'MAIL:', text: email, href: `mailto:${email}` },
    { label: 'WEB:', text: website, href: website.startsWith('http') ? website : `https://${website}` },
    { label: 'ADDR:', text: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` },
  ];

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.receiptWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerZone}>
          <div className={styles.topPerforation}>{receiptHeader}</div>
          {logo && <img src={logo} alt={companyName || fullName} className={styles.logo} />}
          {companyName && <h2 className={styles.companyName}>{companyName}</h2>}

          <div className={styles.dashDivider} />

          <div className={styles.identityBlock}>
            <h1 className={styles.fullName}>{fullName}</h1>
            {title && <p className={styles.title}>QTY: 1 | {title}</p>}
          </div>

          <div className={styles.dashDivider} />
        </div>

        <div className={styles.receiptMeta}>
          <span>DATE: {dateStr}</span>
          <span>TIME: {timeStr}</span>
        </div>
        <div className={styles.receiptMeta}>
          <span>TRANS: {receiptNo}</span>
          <span>AUTH: APPROVED</span>
        </div>

        <div className={styles.dashDivider} />

        <div className={styles.contactList}>
          {contactItems.map((item, idx) => (
            item.text ? (
              <a key={idx} href={item.href} className={styles.contactRow} target="_blank" rel="noopener noreferrer">
                <span className={styles.contactLabel}>{item.label}</span>
                <span className={styles.contactValue}>{item.text}</span>
              </a>
            ) : null
          ))}
        </div>

        <div className={styles.dashDivider} />

        <div className={styles.barcodeZone}>
          <BarcodeSvg />
          <p className={styles.thankYouText}>{thankYouNote}</p>
        </div>

        <div className={styles.dashDivider} />

        <div className={styles.actions}>
          <button className={styles.primaryBtn}>
            {ctaSaveContact}
          </button>
          <div className={styles.secondaryRow}>
            <button className={styles.secondaryBtn}>
              {ctaCall}
            </button>
            <button className={styles.secondaryBtn}>
              {ctaDirections}
            </button>
            <button className={styles.secondaryBtn}>
              {ctaShare}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const meta: TemplateMeta = {
  name: "Receipt Style",
  componentKey: "receipt_style",
  description: "Thermal receipt business card with monospace font, itemized field divider lines, serrated edges, and barcode.",
  category: "Novelty & Local",
  motionTier: 0,
  styleTone: "Novelty & Monospace"
};

registerTemplate({
  component: ReceiptStyle,
  schema: receiptStyleSchema,
  meta
});

export default ReceiptStyle;
