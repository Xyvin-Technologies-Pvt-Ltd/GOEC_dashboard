import { create } from 'zustand';

export const useCRMStore = create((set) => ({
  // Selected user in user details view
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  clearSelectedUser: () => set({ selectedUser: null }),

  // User form data
  userFormData: {
    name: '',
    email: '',
    phone: '',
    status: 'active',
  },
  setUserFormData: (data) =>
    set((state) => ({
      userFormData: { ...state.userFormData, ...data },
    })),
  resetUserFormData: () =>
    set({
      userFormData: {
        name: '',
        email: '',
        phone: '',
        status: 'active',
      },
    }),

  // Selected rows for bulk actions
  selectedRows: [],
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  addSelectedRow: (rowId) =>
    set((state) => ({
      selectedRows: [...new Set([...state.selectedRows, rowId])],
    })),
  removeSelectedRow: (rowId) =>
    set((state) => ({
      selectedRows: state.selectedRows.filter((id) => id !== rowId),
    })),
  clearSelectedRows: () => set({ selectedRows: [] }),

  // Active tab in user details
  activeUserTab: 0,
  setActiveUserTab: (tabIndex) => set({ activeUserTab: tabIndex }),

  // Filters for user list
  userListFilters: {
    searchQuery: '',
    status: null,
    sortBy: 'createdAt',
  },
  setUserListFilters: (filters) =>
    set((state) => ({
      userListFilters: { ...state.userListFilters, ...filters },
    })),
  resetUserListFilters: () =>
    set({
      userListFilters: {
        searchQuery: '',
        status: null,
        sortBy: 'createdAt',
      },
    }),

  // Pagination for user list
  userListPageNo: 1,
  userListTotalCount: 0,
  setUserListPageNo: (pageNo) => set({ userListPageNo: pageNo }),
  setUserListTotalCount: (totalCount) => set({ userListTotalCount: totalCount }),
}));
