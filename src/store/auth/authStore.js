import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { adminLogin } from '../../services/userApi';

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  permissions: [],
  role: null,
  error: null,

  // Actions
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setError: (error) => set({ error }),

  /**
   * Check authentication status on app load
   * Restores session from localStorage token
   */
  checkAuthStatus: () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        set({
          user: decoded.userId || decoded.user || decoded,
          token: token,
          isAuthenticated: true,
          isLoading: false,
          permissions: decoded.permissions || decoded.userId?.role?.permissions || [],
          role: decoded.role || decoded.userId?.role || null,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('token');
      set({ isLoading: false, error: 'Invalid token' });
    }
  },

  /**
   * Login user with credentials
   * @param {Object} credentials - Login credentials
   * @returns {Promise}
   */
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminLogin(credentials);
      const token = response.token;
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode(token);
      set({
        user: decoded.userId || decoded.user || decoded,
        token: token,
        isAuthenticated: true,
        isLoading: false,
        permissions: decoded.permissions || decoded.userId?.role?.permissions || [],
        role: decoded.role || decoded.userId?.role || null,
        error: null,
      });
      
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Login failed',
        isAuthenticated: false,
      });
      throw error;
    }
  },

  /**
   * Logout user
   * Clears token and user data
   */
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      permissions: [],
      role: null,
      error: null,
    });
  },

  /**
   * Check if user has specific permission
   * @param {string} requiredRole - Permission to check
   * @returns {boolean}
   */
  hasPermission: (requiredRole) => {
    const { permissions } = get();
    return permissions?.includes(requiredRole) || false;
  },

  /**
   * Check if user has access to location
   * @param {string} location - Location to check
   * @returns {boolean}
   */
  hasLocationAccess: (location) => {
    const { user } = get();
    return user?.role?.location_access?.includes(location) || false;
  },

  /**
   * Get user display name
   * @returns {string}
   */
  getUserName: () => {
    const { user } = get();
    return user?.name || user?.email || 'Admin';
  },

  /**
   * Get user role name
   * @returns {string}
   */
  getUserRole: () => {
    const { role } = get();
    return role?.name || 'No Role';
  },
}));
