/**
 * Get initials from a full name
 * @param name - Full name of the person
 * @returns Uppercase initials (max 2 characters)
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Format date to readable string
 * @param date - Date to format
 * @returns Formatted date string (e.g., "Dec 23, 2025")
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}

/**
 * Calculate age from creation date
 * @param createdAt - Date when record was created
 * @param baseAge - Base age to add (default: 18)
 * @returns Calculated age
 */
export function calculateAge(createdAt: Date, baseAge: number = 18): number {
    return new Date().getFullYear() - new Date(createdAt).getFullYear() + baseAge;
}
