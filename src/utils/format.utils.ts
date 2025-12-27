export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}


export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}


export function calculateAge(createdAt: Date, baseAge: number = 18): number {
    return new Date().getFullYear() - new Date(createdAt).getFullYear() + baseAge;
}
