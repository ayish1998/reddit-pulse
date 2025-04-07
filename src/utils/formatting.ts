/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(Math.round(num));
  }
  
  /**
   * Format a date string (yyyy-mm-dd) to a more readable format
   */
  export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  /**
   * Convert a number to a compact representation (e.g., 1K, 2.5M)
   */
  export function compactNumber(num: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    });
    return formatter.format(num);
  }
  
  /**
   * Calculate percentage change between two numbers
   */
  export function percentChange(current: number, previous: number): string {
    if (previous === 0) return '+0%';
    
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }