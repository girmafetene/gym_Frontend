import { BASE_URL } from './../env';
// hooks/useApiService.ts
import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';


interface ApiResponse<T> {
    success: boolean;
    data?: T | T[];
    message?: string;
    statusCode?: number;
    error?: any;
}

interface PaginationParams {
    page?: number;
    limit?: number;
}

interface ApiService<T> {
    getAll: (params?: PaginationParams) => Promise<ApiResponse<T[]>>;
    getById: (id: string) => Promise<ApiResponse<T>>;
    getByType: (type: string) => Promise<ApiResponse<T[]>>;
    create: (data: Partial<T>) => Promise<ApiResponse<T>>;
    update: (id: string, data: Partial<T>) => Promise<ApiResponse<T>>;
    delete: (id: string) => Promise<ApiResponse<null>>;
    loading: boolean;
    error: AxiosError | null;
}

export function useApiService<T>(endpoint: string): ApiService<T> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const handleRequest = async <R>(
        requestFn: () => Promise<AxiosResponse<ApiResponse<R>>>
    ): Promise<ApiResponse<R>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await requestFn();
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError);
            return {
                success: false,
                error: axiosError.response?.data || axiosError.message,
                statusCode: axiosError.response?.status || 500,
            };
        } finally {
            setLoading(false);
        }
    };

    const getAll = async (params: PaginationParams = {}) => {
        const { page = 1, limit = 10 } = params;
        return handleRequest<T[]>(() =>
            axios.get<ApiResponse<T[]>>(BASE_URL + `/api/${endpoint}`, {
                params: { page, limit },
            })
        );
    };

    const getById = async (id: string) => {
        return handleRequest<T>(() =>
            axios.get<ApiResponse<T>>(BASE_URL + `/api/${endpoint}/${id}`)
        );
    };

    const getByType = async (type: string): Promise<ApiResponse<T[]>> => {
        try {
            return await handleRequest<T[]>(() =>
                axios.get<ApiResponse<T[]>>(`${BASE_URL}/api/${endpoint}/by-type/${type}`)
            );
        } catch (error) {
            console.error(`Error fetching ${endpoint} by type ${type}:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                statusCode: 500,
            };
        }
    };
    const create = async (data: Partial<T>) => {
        return handleRequest<T>(() =>
            axios.post<ApiResponse<T>>(BASE_URL + `/api/${endpoint}`, data)
        );
    };

    const update = async (id: string, data: Partial<T>) => {
        return handleRequest<T>(() =>
            axios.put<ApiResponse<T>>(BASE_URL + `/api/${endpoint}/${id}`, data)
        );
    };

    const deleteById = async (id: string) => {
        return handleRequest<null>(() =>
            axios.delete<ApiResponse<null>>(BASE_URL + `/api/${endpoint}/${id}`)
        );
    };

    return {
        getAll,
        getById,
        create,
        update,
        delete: deleteById,
        getByType,
        loading,
        error,
    };
}