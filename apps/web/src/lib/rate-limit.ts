const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(options: { interval: number; uniqueTokenPerInterval: number }) {
  return {
    check: async (limit: number, token: string): Promise<void> => {
      const now = Date.now();
      
      // Cleanup expired entries
      if (rateLimitCache.size > options.uniqueTokenPerInterval) {
        for (const [key, value] of rateLimitCache.entries()) {
          if (value.expiresAt < now) {
            rateLimitCache.delete(key);
          }
        }
      }

      let entry = rateLimitCache.get(token);
      
      if (!entry || entry.expiresAt < now) {
        entry = { count: 0, expiresAt: now + options.interval };
      }

      entry.count += 1;
      rateLimitCache.set(token, entry);

      if (entry.count > limit) {
        throw new Error('Rate limit exceeded');
      }
    },
  };
}
