/**
 * Generates a unique transaction reference ID for payment processing
 * Format: tx_[timestamp]_[random6chars]
 */
export function generateUniqueId(): string {
  const timestamp = Date.now().toString();
  const randomChars = Math.random().toString(36).substring(2, 8);
  return `tx_${timestamp}_${randomChars}`;
}
