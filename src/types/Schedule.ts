
import { User } from "./User";

// types/Schedule.ts
export interface Schedule {
    id: string;
    trainer: User;
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
    createdAt?: Date;
    updatedAt?: Date;
}