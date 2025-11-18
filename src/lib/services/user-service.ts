import { api } from '@/lib/api-client';
import { User } from '@/types';

export interface UsersResponse {
  success: boolean;
  data: User[];
  message: string;
}

export interface UserResponse {
  success: boolean;
  data: User;
  message: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

/**
 * Fetch all users (admin only)
 * @param params - Query parameters for filtering and pagination
 */
export const getUsers = async (params?: GetUsersParams): Promise<User[]> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.role) queryParams.append('role', params.role);
  if (params?.status) queryParams.append('status', params.status);

  const url = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await api.get<UsersResponse>(url);
  return response.data;
};

/**
 * Fetch a single user by ID
 * @param id - User ID
 */
export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<UserResponse>(`/users/${id}`);
  return response.data;
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<UserResponse>('/users/profile');
  return response.data;
};
