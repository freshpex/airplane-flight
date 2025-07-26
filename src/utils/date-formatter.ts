import { format, isValid, parse } from "date-fns";

/**
 * Formats a date to a specified format
 * @param date The date to format
 * @param formatString The format string (default: 'yyyy-MM-dd')
 * @returns The formatted date string
 */
export function formatDate(
  date: Date | string | null | undefined,
  formatString = "yyyy-MM-dd",
): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (!isValid(dateObj)) {
      return "";
    }

    return format(dateObj, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

/**
 * Parses a date string to a Date object
 * @param dateString The date string to parse
 * @param formatString The format string (default: 'yyyy-MM-dd')
 * @returns The parsed Date object or null if invalid
 */
export function parseDate(
  dateString: string | null | undefined,
  formatString = "yyyy-MM-dd",
): Date | null {
  if (!dateString) return null;

  try {
    const parsedDate = parse(dateString, formatString, new Date());

    return isValid(parsedDate) ? parsedDate : null;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
}

/**
 * Formats a date range as a string
 * @param startDate The start date
 * @param endDate The end date
 * @param formatString The format string (default: 'MMM d, yyyy')
 * @returns The formatted date range string
 */
export function formatDateRange(
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined,
  formatString = "MMM d, yyyy",
): string {
  const formattedStart = formatDate(startDate, formatString);
  const formattedEnd = formatDate(endDate, formatString);

  if (!formattedStart && !formattedEnd) return "";
  if (!formattedStart) return formattedEnd;
  if (!formattedEnd) return formattedStart;

  return `${formattedStart} - ${formattedEnd}`;
}

/**
 * Returns a friendly relative date string (Today, Tomorrow, Yesterday, or formatted date)
 * @param date The date to format
 * @param formatString The format string for non-relative dates (default: 'MMM d, yyyy')
 * @returns The formatted date string
 */
export function friendlyDate(
  date: Date | string | null | undefined,
  formatString = "MMM d, yyyy",
): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (!isValid(dateObj)) return "";

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  if (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  ) {
    return "Tomorrow";
  }

  if (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  return format(dateObj, formatString);
}
