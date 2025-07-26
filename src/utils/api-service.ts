import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define a consistent API response structure
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

// Base API service class
class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // Set authentication token
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authentication token
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Helper method to create request config
  private createRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
    };
  }

  // Generic GET request
  async get<T = any>(
    endpoint: string, 
    params?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios.get(
        `${this.baseUrl}${endpoint}`,
        this.createRequestConfig({ 
          ...config, 
          params 
        })
      );

      return {
        data: response.data,
        status: response.status,
        message: 'Success',
        success: true,
      };
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  // Generic POST request
  async post<T = any>(
    endpoint: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios.post(
        `${this.baseUrl}${endpoint}`,
        data,
        this.createRequestConfig(config)
      );

      return {
        data: response.data,
        status: response.status,
        message: 'Success',
        success: true,
      };
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  // Generic PUT request
  async put<T = any>(
    endpoint: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios.put(
        `${this.baseUrl}${endpoint}`,
        data,
        this.createRequestConfig(config)
      );

      return {
        data: response.data,
        status: response.status,
        message: 'Success',
        success: true,
      };
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  // Generic DELETE request
  async delete<T = any>(
    endpoint: string, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios.delete(
        `${this.baseUrl}${endpoint}`,
        this.createRequestConfig(config)
      );

      return {
        data: response.data,
        status: response.status,
        message: 'Success',
        success: true,
      };
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  // Handle API errors
  private handleApiError(error: any): ApiResponse {
    const message = error.response?.data?.message || error.message || 'Unknown error occurred';
    const status = error.response?.status || 500;
    
    console.error('API Error:', message);
    
    return {
      data: null,
      status,
      message,
      success: false,
    };
  }
}

// Create and export default instance
const apiService = new ApiService();
export default apiService;

// Export the class for custom instances
export { ApiService };
