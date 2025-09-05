import { useState, useCallback } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (config: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: any;
  }) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (config: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: any;
  }) => {
    const { url, method = 'GET', data, params } = config;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios({
        method,
        url,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setState({
          data: response.data.data || null,
          loading: false,
          error: null,
        });
        return response.data.data || null;
      } else {
        throw new Error(response.data.message || 'Request failed');
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse<T>>;
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
          errorMessage = axiosError.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specialized hooks for common operations
export function useGet<T = any>() {
  const api = useApi<T>();
  
  const get = useCallback((url: string, params?: any) => {
    return api.execute({ url, method: 'GET', params });
  }, [api]);

  return { ...api, get };
}

export function usePost<T = any>() {
  const api = useApi<T>();
  
  const post = useCallback((url: string, data?: any) => {
    return api.execute({ url, method: 'POST', data });
  }, [api]);

  return { ...api, post };
}

export function usePut<T = any>() {
  const api = useApi<T>();
  
  const put = useCallback((url: string, data?: any) => {
    return api.execute({ url, method: 'PUT', data });
  }, [api]);

  return { ...api, put };
}

export function useDelete<T = any>() {
  const api = useApi<T>();
  
  const del = useCallback((url: string) => {
    return api.execute({ url, method: 'DELETE' });
  }, [api]);

  return { ...api, delete: del };
}
