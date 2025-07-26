/**
 * Format a number as currency (USD)
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
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

/**
 * Format a phone number for display
 * @param phone - Raw phone number
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  // Simple formatter for Londonn numbers
  if (phone.startsWith("+1") && phone.length >= 13) {
    return `+1 ${phone.substring(4, 7)} ${phone.substring(7, 10)} ${phone.substring(10)}`;
  }
  return phone;
}

/**
 * Format a name to title case
 * @param text - Text to format
 * @returns Title cased text
 */
export function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}
