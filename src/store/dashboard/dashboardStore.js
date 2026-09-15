import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
  // Filter state
  filters: {
    dateRange: {
      startDate: null,
      endDate: null,
    },
    searchQuery: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    status: null,
    type: null,
  },

  pageNo: 1,
  pageSize: 10,
  totalCount: 0,

  // Actions
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pageNo: 1, // Reset to first page when filters change
    })),

  setDateRange: (startDate, endDate) =>
    set((state) => ({
      filters: {
        ...state.filters,
        dateRange: { startDate, endDate },
      },
      pageNo: 1,
    })),

  setSearchQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
      pageNo: 1,
    })),

  setSortBy: (sortBy, sortOrder = 'asc') =>
    set((state) => ({
      filters: { ...state.filters, sortBy, sortOrder },
    })),

  setStatus: (status) =>
    set((state) => ({
      filters: { ...state.filters, status },
      pageNo: 1,
    })),

  setType: (type) =>
    set((state) => ({
      filters: { ...state.filters, type },
      pageNo: 1,
    })),

  resetFilters: () =>
    set({
      filters: {
        dateRange: {
          startDate: null,
          endDate: null,
        },
        searchQuery: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        status: null,
        type: null,
      },
      pageNo: 1,
    }),

  setPageNo: (pageNo) => set({ pageNo }),

  setPageSize: (pageSize) => set({ pageSize, pageNo: 1 }),

  setTotalCount: (totalCount) => set({ totalCount }),

  // Get current filter object for API calls
  getFilterParams: () => {
    return {
      pageNo: 1,
      pageSize: 10,
    };
  },
}));
