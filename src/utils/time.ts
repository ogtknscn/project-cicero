/**
 * Format duration in minutes to human-readable string
 * @param minutes - Duration in minutes
 * @returns Formatted string (e.g., "2h 30m", "45m")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}m`;
}

/**
 * Format minutes to time string (HH:MM)
 * @param minutes - Duration in minutes
 * @returns Time string (e.g., "02:30")
 */
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Calculate elapsed time from start date
 * @param startDate - Start date
 * @returns Elapsed time in minutes
 */
export function getElapsedTime(startDate: Date): number {
  return (Date.now() - startDate.getTime()) / 60000; // minutes
}

/**
 * Format date to locale string
 * @param date - Date to format
 * @param locale - Locale (default: 'tr-TR')
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: string = 'tr-TR'): string {
  return new Date(date).toLocaleString(locale);
}

