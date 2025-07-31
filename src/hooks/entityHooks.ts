// hooks/entityHooks.ts
import { createApiServiceHook } from './createApiServiceHook';
import { Trainer } from '../types/Trainer';
import { WorkoutPlan } from '../types/WorkoutPlan';
import { DietPlan } from '../types/DietItem';


export const useTrainerService = createApiServiceHook<Trainer>('trainers');
export const useWorkoutPlanService = createApiServiceHook<WorkoutPlan>('workout-plans');
export const useDietPlanService = createApiServiceHook<DietPlan>('diet-plans');