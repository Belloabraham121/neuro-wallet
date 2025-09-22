'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: Record<string, any>;
  isActive: boolean;
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  createdAt: Date;
}

interface CreateApiKeyData {
  name: string;
  permissions?: Record<string, any>;
  expiresAt?: Date;
}

interface CreateApiKeyResult {
  apiKey: string;
  keyData: ApiKey;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any[];
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export function useApiKeys() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const fetchApiKeys = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/keys`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result: ApiResponse<{ apiKeys: ApiKey[]; total: number }> = await response.json();

      if (result.success && result.data) {
        setApiKeys(result.data.apiKeys);
        return true;
      } else {
        toast.error(result.error?.message || 'Failed to fetch API keys');
        return false;
      }
    } catch (error) {
      console.error('Fetch API keys error:', error);
      toast.error('Failed to fetch API keys');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createApiKey = useCallback(async (data: CreateApiKeyData): Promise<CreateApiKeyResult | null> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/keys`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result: ApiResponse<CreateApiKeyResult> = await response.json();

      if (result.success && result.data) {
        toast.success('API key created successfully');
        // Refresh the API keys list
        await fetchApiKeys();
        return result.data;
      } else {
        toast.error(result.error?.message || 'Failed to create API key');
        return null;
      }
    } catch (error) {
      console.error('Create API key error:', error);
      toast.error('Failed to create API key');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchApiKeys]);

  const updateApiKey = useCallback(async (id: string, data: { name?: string; permissions?: Record<string, any> }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/keys/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result: ApiResponse<{ apiKey: ApiKey }> = await response.json();

      if (result.success) {
        toast.success('API key updated successfully');
        // Refresh the API keys list
        await fetchApiKeys();
        return true;
      } else {
        toast.error(result.error?.message || 'Failed to update API key');
        return false;
      }
    } catch (error) {
      console.error('Update API key error:', error);
      toast.error('Failed to update API key');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchApiKeys]);

  const deleteApiKey = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/keys/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const result: ApiResponse<any> = await response.json();

      if (result.success) {
        toast.success('API key deleted successfully');
        // Refresh the API keys list
        await fetchApiKeys();
        return true;
      } else {
        toast.error(result.error?.message || 'Failed to delete API key');
        return false;
      }
    } catch (error) {
      console.error('Delete API key error:', error);
      toast.error('Failed to delete API key');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchApiKeys]);

  return {
    isLoading,
    apiKeys,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
}