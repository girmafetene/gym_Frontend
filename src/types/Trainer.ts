import { DietPlan } from "./DietItem";
import { Schedule } from "./Schedule";
import { WorkoutPlan } from "./WorkoutPlan";

// types/Trainer.ts
export interface Trainer {
    id: string;
    name: string;
    specialization: string;
    experience: number;
    certification?: string;
    workoutPlans?: WorkoutPlan[];
    dietPlans?: DietPlan[];
    schedules?: Schedule[];
    createdAt?: Date;
    updatedAt?: Date;
}

// types/ApiResponse.ts
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    statusCode?: number;
    error?: any;
    total?: number; // for paginated responses
}