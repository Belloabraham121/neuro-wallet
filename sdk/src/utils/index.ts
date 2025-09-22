/**
 * Utility functions for the Neuro Wallet SDK
 */

/**
 * Validate a Stacks address
 */
export function isValidStacksAddress(address: string): boolean {
  // Basic validation - will be enhanced with proper Stacks validation
  return /^S[0-9A-Z]{25,34}$/.test(address) || /^ST[0-9A-Z]{25,34}$/.test(address);
}

/**
 * Format STX amount from microSTX
 */
export function formatSTX(microSTX: string | number): string {
  const amount = typeof microSTX === 'string' ? parseInt(microSTX) : microSTX;
  return (amount / 1000000).toFixed(6);
}

/**
 * Convert STX to microSTX
 */
export function toMicroSTX(stx: string | number): string {
  const amount = typeof stx === 'string' ? parseFloat(stx) : stx;
  return Math.floor(amount * 1000000).toString();
}

/**
 * Generate a random hex string
 */
export function randomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry utility
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) break;
      await sleep(delay * attempt);
    }
  }
  
  throw lastError!;
}

/**
 * Deep clone utility
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
}