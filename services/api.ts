// services/api.ts
// TODO: Update to api.painpoint.tech when DNS is configured
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
  return request('/auth/me');
}

// ==========================================
// Users API (Master Only)
// ==========================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  role: 'MASTER' | 'ADMIN' | 'EDITOR' | 'USER';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_PASSWORD_CHANGE';
  createdAt: string;
}

export async function getUsers(params?: { role?: string; status?: string; search?: string }): Promise<ApiResponse<User[]>> {
  const query = new URLSearchParams();
  if (params?.role) query.set('role', params.role);
  if (params?.status) query.set('status', params.status);
  if (params?.search) query.set('search', params.search);

  const queryString = query.toString();
  return request(`/users${queryString ? `?${queryString}` : ''}`);
}

export async function createUser(data: { email: string; name: string; role: string; password?: string }): Promise<ApiResponse<User>> {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateUserRole(id: string, role: string): Promise<ApiResponse<User>> {
  return request(`/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
}

export async function updateUserStatus(id: string, status: string): Promise<ApiResponse<User>> {
  return request(`/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteUser(id: string): Promise<ApiResponse> {
  return request(`/users/${id}`, { method: 'DELETE' });
}

export async function updateUser(id: string, data: { name?: string; email?: string; avatar?: string; bio?: string }): Promise<ApiResponse<User>> {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
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
    avatar: string | null;
    bio: string | null;
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
  categorySlug?: string;
  tagId?: string;
  tagSlug?: string;
  search?: string;
}): Promise<ApiResponse<PostsResponse>> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.status) query.set('status', params.status);
  if (params?.categoryId) query.set('categoryId', params.categoryId);
  if (params?.categorySlug) query.set('categorySlug', params.categorySlug);
  if (params?.tagId) query.set('tagId', params.tagId);
  if (params?.tagSlug) query.set('tagSlug', params.tagSlug);
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

export async function createCategory(data: { name: string; slug: string; description?: string }): Promise<ApiResponse<Category>> {
  return request('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<ApiResponse<Category>> {
  return request(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: string): Promise<ApiResponse> {
  return request(`/categories/${id}`, { method: 'DELETE' });
}

// ==========================================
// Tags API
// ==========================================

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  _count?: { posts: number };
}

export async function getTags(): Promise<ApiResponse<Tag[]>> {
  return request('/tags');
}

export async function createTag(data: { name: string; slug: string; color?: string }): Promise<ApiResponse<Tag>> {
  return request('/tags', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTag(id: string, data: Partial<Tag>): Promise<ApiResponse<Tag>> {
  return request(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTag(id: string): Promise<ApiResponse> {
  return request(`/tags/${id}`, { method: 'DELETE' });
}

// ==========================================
// Contact API
// ==========================================

export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Promise<ApiResponse> {
  // Contact form doesn't need auth, so direct fetch
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: '網路連線錯誤，請檢查網路狀態' };
  }
}

// ==========================================
// Content Sources API
// ==========================================

export interface ContentSource {
  id: string;
  name: string;
  type: 'RSS' | 'WEBSITE' | 'TWITTER';
  url: string;
  language: string;
  isActive: boolean;
  lastFetched: string | null;
  fetchInterval: number;
  _count?: { fetchedItems: number };
}

export interface FetchedContent {
  id: string;
  sourceId: string;
  source: { name: string };
  originalUrl: string;
  originalTitle: string;
  originalContent: string;
  originalExcerpt: string | null;
  publishedAt: string | null;
  generatedTitle: string | null;
  generatedContent: string | null;
  generatedExcerpt: string | null;
  status: 'PENDING' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'PROCESSING';
  postId: string | null;
  fetchedAt: string;
  processedAt: string | null;
}

export async function getContentSources(): Promise<ApiResponse<ContentSource[]>> {
  return request('/content/sources');
}

export async function createContentSource(data: Partial<ContentSource>): Promise<ApiResponse<ContentSource>> {
  return request('/content/sources', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateContentSource(id: string, data: Partial<ContentSource>): Promise<ApiResponse<ContentSource>> {
  return request(`/content/sources/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteContentSource(id: string): Promise<ApiResponse> {
  return request(`/content/sources/${id}`, { method: 'DELETE' });
}

export async function getFetchedContent(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<ApiResponse<{ items: FetchedContent[]; pagination: any }>> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.status) query.set('status', params.status);

  return request(`/content/fetched?${query.toString()}`);
}

export async function updateFetchedContentStatus(id: string, status: string): Promise<ApiResponse> {
  return request(`/content/fetched/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function triggerFetchAction(): Promise<ApiResponse> {
  return request('/content/actions/fetch', { method: 'POST' });
}

export async function triggerProcessAction(limit: number = 5): Promise<ApiResponse> {
  return request('/content/actions/process', {
    method: 'POST',
    body: JSON.stringify({ limit }),
  });
}

export async function triggerPublishAction(
  contentId: string,
  authorId: string,
  categoryId: string
): Promise<ApiResponse> {
  return request('/content/actions/publish', {
    method: 'POST',
    body: JSON.stringify({ contentId, authorId, categoryId }),
  });
}

export async function getAppSettings(): Promise<ApiResponse<any>> {
  return request('/content/settings');
}

export async function updateAppSettings(data: any): Promise<ApiResponse<any>> {
  return request('/content/settings', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// ==========================================
// Voice API (Retell)
// ==========================================

export interface CreateWebCallResponse {
  accessToken: string;
  callId: string;
}

export async function createWebCall(metadata?: Record<string, unknown>): Promise<ApiResponse<CreateWebCallResponse>> {
  return request('/retell/web-call', {
    method: 'POST',
    body: JSON.stringify({ metadata: metadata || {} }),
  });
}
