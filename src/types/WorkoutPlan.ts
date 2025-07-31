import { Trainer } from "./Trainer";

// types/WorkoutPlan.ts
export interface WorkoutPlan {
    id: string;
    title: string;
    description: string;
    member?: Member; // Optional to avoid circular references
    trainer?: Trainer; // Optional to avoid circular references
    sessions?: WorkoutSession[]; // Array of workout sessions
    createdAt?: Date;
    updatedAt?: Date;
}

// types/Member.ts
export interface Member {
    id: string;
    name: string;
    email: string;
    workoutPlans?: WorkoutPlan[];
    // ... other member fields
}

// types/WorkoutSession.ts
export interface WorkoutSession {
    id: string;
    name: string;
    duration: number; // in minutes
    exercises: string[];
    workoutPlan?: WorkoutPlan;
    // ... other session fields
}

export interface Item {
    id: string;
    name: string;
    description: string; // in minutes
    category: string;
    isAvailable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // ... other session fields
}