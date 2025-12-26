export const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
] as const;

export const HOBBY_OPTIONS = [
    { value: 'Reading', label: 'Reading' },
    { value: 'Travelling', label: 'Travelling' },
    { value: 'Movies', label: 'Movies' },
    { value: 'Games', label: 'Games' },
] as const;

export const COURSE_OPTIONS = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Science', label: 'Science' },
] as const;

export const FORM_STEPS = [
    { id: 1, title: 'Basic Information', description: 'Personal details' },
    { id: 2, title: 'Academic Information', description: 'Course details' },
    { id: 3, title: 'Personal Information', description: 'Hobbies and contact' },
] as const;
