import api from './axios';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export const authApi = {
  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },
  register: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', credentials);
    return data;
  },
};

export const contentApi = {
  getPublic: async () => {
    const { data } = await api.get('/public');
    return data;
  },
  getUser: async () => {
    const { data } = await api.get('/user');
    return data;
  },
  getAdmin: async () => {
    const { data } = await api.get('/admin');
    return data;
  }
};
