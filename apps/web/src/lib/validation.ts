export function isValidPhone(phone: string): boolean {
  // 10-digit Indian mobile numbers (starts with 6-9)
  return /^[6-9]\d{9}$/.test(phone);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return input;
  // Basic HTML tag stripping
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export function validateFieldValue(value: any, fieldType: string): boolean {
  if (value === null || value === undefined) return false;
  
  switch (fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'phone':
    case 'image':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'date':
      return !isNaN(Date.parse(value));
    case 'json':
      try {
        if (typeof value === 'object') return true;
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    case 'color':
      return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    default:
      return true; // Unknown type, let it pass
  }
}
