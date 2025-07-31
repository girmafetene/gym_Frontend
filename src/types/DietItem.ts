import { Trainer } from "./Trainer";

// types/DietItem.ts
export interface DietItem {
    id: string;
    foodName: string;
    quantity: string;
    time: string;
    dietPlan?: DietPlan; // Optional to avoid circular references
}

// types/DietPlan.ts
export interface DietPlan {
    id: string;
    name: string;
    description?: string;
    duration?: number; // in days
    items?: DietItem[]; // Array of diet items
    trainer?: Trainer; // Reference to the trainer who created it
    createdAt?: Date;
    updatedAt?: Date;
}