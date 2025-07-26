/**
 * Format a number as currency (USD)
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string to format
 * @returns Formatted date string (e.g., "May 15, 2023")
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a time string from an ISO date
 * @param dateString - ISO date string to format
 * @returns Formatted time string (e.g., "14:30")
 */
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format a transaction ID to be more readable
 * @param id - The transaction ID
 * @returns Formatted transaction ID with dashes
 */
export function formatTransactionId(id: string): string {
  // If the ID is long enough, format it with dashes for readability
  if (id.length >= 12) {
    return `${id.substring(0, 4)}-${id.substring(4, 8)}-${id.substring(8)}`;
  }
  return id;
}
