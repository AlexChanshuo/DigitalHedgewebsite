// services/api.ts
const API_BASE = 'https://api.digitalhedge.ai/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Token management
let accessToken: string | null = localStorage.getItem('accessToken');
let refreshToken: string | null = localStorage.getItem('refreshToken');

export function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function getAccessToken() {
  return accessToken;
}

// API request helper
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Try to refresh token if 401
      if (response.status === 401 && refreshToken && endpoint !== '/auth/refresh') {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // Retry the original request
          return request(endpoint, options);
        }
      }
      return { success: false, error: data.message || 'Request failed' };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: '網路連線錯誤，請檢查網路狀態' };
  }
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        setTokens(data.data.accessToken, data.data.refreshToken);
        return true;
      }
    }
  } catch (e) {
    // Refresh failed
  }
  clearTokens();
  return false;
}

// ==========================================
// Auth API
// ==========================================

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    mustChangePassword: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  const result = await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (result.success && result.data) {
    setTokens(result.data.accessToken, result.data.refreshToken);
  }

  return result;
}

export async function logout(): Promise<void> {
  await request('/auth/logout', { method: 'POST' });
  clearTokens();
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
  return request('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function getProfile(): Promise<ApiResponse<LoginResponse['user']>> {
  return request('/auth/profile');
}

// ==========================================
// Posts API
// ==========================================

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  }[];
}

export interface PostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getPosts(params?: {
  page?: number;
  limit?: number;
  status?: string;
  categoryId?: string;
  search?: string;
}): Promise<ApiResponse<PostsResponse>> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.status) query.set('status', params.status);
  if (params?.categoryId) query.set('categoryId', params.categoryId);
  if (params?.search) query.set('search', params.search);

  return request(`/posts?${query.toString()}`);
}

export async function getPost(slug: string): Promise<ApiResponse<Post>> {
  return request(`/posts/${slug}`);
}

export async function createPost(data: {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status?: string;
  categoryId: string;
  tagIds?: string[];
}): Promise<ApiResponse<Post>> {
  return request('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePost(id: string, data: Partial<{
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  status: string;
  categoryId: string;
  tagIds: string[];
}>): Promise<ApiResponse<Post>> {
  return request(`/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deletePost(id: string): Promise<ApiResponse> {
  return request(`/posts/${id}`, { method: 'DELETE' });
}

// ==========================================
// Categories API
// ==========================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: { posts: number };
}

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return request('/categories');
}

// ==========================================
// Tags API
// ==========================================

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

export async function getTags(): Promise<ApiResponse<Tag[]>> {
  return request('/tags');
}
