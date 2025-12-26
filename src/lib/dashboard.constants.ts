import { BookOpen, UserCheck, Users, UserX } from 'lucide-react';

export const STAT_CARD_COLORS = {
    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
} as const;

export const STAT_CARD_BORDERS = {
    blue: 'border-b-blue-500',
    green: 'border-b-green-500',
    purple: 'border-b-purple-500',
    orange: 'border-b-orange-500',
} as const;

export type StatColor = keyof typeof STAT_CARD_COLORS;

export interface StatConfig {
    title: string;
    key: 'totalStudents' | 'activeStudents' | 'uniqueCourses' | 'inactiveStudents';
    change: string;
    trend: 'up' | 'down';
    icon: typeof Users;
    color: StatColor;
}

export const DASHBOARD_STATS: StatConfig[] = [
    {
        title: 'Total Students',
        key: 'totalStudents',
        change: '+1%',
        trend: 'up',
        icon: Users,
        color: 'blue',
    },
    {
        title: 'Active Students',
        key: 'activeStudents',
        change: '+8%',
        trend: 'up',
        icon: UserCheck,
        color: 'green',
    },
    {
        title: 'Total Courses',
        key: 'uniqueCourses',
        change: '+3',
        trend: 'up',
        icon: BookOpen,
        color: 'purple',
    },
    {
        title: 'Inactive',
        key: 'inactiveStudents',
        change: '-5%',
        trend: 'down',
        icon: UserX,
        color: 'orange',
    },
];

export const GENDER_COLORS = {
    male: 'bg-blue-500',
    female: 'bg-pink-500',
    other: 'bg-purple-500',
} as const;

// Avatar colors for student profiles
export const AVATAR_COLORS = [
    'bg-teal-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
] as const;

/**
 * Get avatar color by index
 * @param index - Index to determine color
 * @returns Tailwind background color class
 */
export function getAvatarColor(index: number): string {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

// Hobby mappings based on email patterns
export const HOBBY_MAP: Record<string, string> = {
    john: 'Travelling',
    jane: 'Reading',
    alex: 'Gaming',
    emily: 'Painting',
    michael: 'Sports',
    sarah: 'Music',
    david: 'Coding',
    lisa: 'Dancing',
    james: 'Photography',
} as const;

/**
 * Get hobby based on email
 * @param email - Email to check
 * @returns Hobby name
 */
export function getHobbyFromEmail(email: string): string {
    const entry = Object.entries(HOBBY_MAP).find(([key]) => email.includes(key));
    return entry ? entry[1] : 'Movies';
}
