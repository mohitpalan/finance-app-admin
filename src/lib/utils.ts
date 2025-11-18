import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance, formatRelative } from 'date-fns';

// Tailwind CSS class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format number
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// Format date
export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr);
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

// Format relative date
export function formatRelativeDate(date: string | Date): string {
  return formatRelative(new Date(date), new Date());
}

// Truncate text
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

// Capitalize first letter
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Generate random color
export function getRandomColor(): string {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Get initials from name
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Sleep function for testing
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}
