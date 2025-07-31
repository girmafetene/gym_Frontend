// types/User.ts
export enum UserRole {
    MEMBER = 'Member',
    TRAINER = 'Trainer',
    ADMIN = 'Admin',
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    photoPath?: string;
    createdAt: string; // or Date, depending on how you're using it
    updatedAt: string; // or Date
}
