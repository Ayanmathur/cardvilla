// Card Villa Input Validation and XSS Sanitization Helpers

export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  // Allows digits, optional leading +, spaces, dashes, parentheses, 7 to 15 chars
  const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
  return phoneRegex.test(phone.trim());
}

export function validateEmail(email: string): boolean {
  if (!email) return true; // Optional fields can be empty
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateUrl(urlStr: string): boolean {
  if (!urlStr) return true;
  try {
    const parsed = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Strip HTML tags and script injection from user text inputs
export function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}
