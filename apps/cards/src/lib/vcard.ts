export function generateVCard(data: Record<string, any>): string {
  const fullName = data.full_name || data.name || 'Business Contact';
  const nameParts = fullName.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');

  const company = data.company_name || data.company || '';
  const title = data.job_title || data.title || '';
  const phone = data.phone_number || data.phone || '';
  const email = data.email || '';
  const address = data.address || '';
  const website = data.catalog_url || data.website || '';

  let vcard = 'BEGIN:VCARD\r\nVERSION:3.0\r\n';
  vcard += `N:${lastName};${firstName};;;\r\n`;
  vcard += `FN:${fullName}\r\n`;
  if (company) vcard += `ORG:${company}\r\n`;
  if (title) vcard += `TITLE:${title}\r\n`;
  if (phone) vcard += `TEL;TYPE=CELL,VOICE:${phone}\r\n`;
  if (email) vcard += `EMAIL:${email}\r\n`;
  if (address) vcard += `ADR;TYPE=WORK:;;${address.replace(/\n/g, ', ')};;;;\r\n`;
  if (website) vcard += `URL:${website}\r\n`;
  vcard += 'END:VCARD\r\n';

  return vcard;
}

export function downloadVCard(data: Record<string, any>, fileName: string = 'contact.vcf') {
  const vcardText = generateVCard(data);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName.endsWith('.vcf') ? fileName : `${fileName}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
