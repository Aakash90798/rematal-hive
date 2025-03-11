import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export a simple function to format URLs
export function formatUrl(url: string): string {
  if (!url) return '';
  
  // If the URL doesn't start with http:// or https://, add https://
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  
  return url;
}
