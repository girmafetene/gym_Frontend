// hooks/createApiServiceHook.ts
import { useApiService } from './useApiService';

export function createApiServiceHook<T>(endpoint: string) {
    return () => useApiService<T>(endpoint);
}