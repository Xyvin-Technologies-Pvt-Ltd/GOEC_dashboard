import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Sidebar state
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  // Modal state
  activeModal: null,
  modalData: null,
  openModal: (modalName, data = null) => set({ activeModal: modalName, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
  isModalOpen: (modalName) => {
    // This getter is used in selectors
    return false; // Will be overridden in component usage
  },

  // Drawer state
  activeDrawer: null,
  drawerData: null,
  openDrawer: (drawerName, data = null) => set({ activeDrawer: drawerName, drawerData: data }),
  closeDrawer: () => set({ activeDrawer: null, drawerData: null }),

  // Snackbar state
  snackbar: {
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  },
  showSnackbar: (message, severity = 'info') =>
    set({
      snackbar: {
        open: true,
        message,
        severity,
      },
    }),
  hideSnackbar: () =>
    set({
      snackbar: {
        open: false,
        message: '',
        severity: 'info',
      },
    }),

  // Right drawer state (used for detail views)
  rightDrawerOpen: false,
  rightDrawerData: null,
  openRightDrawer: (data = null) => set({ rightDrawerOpen: true, rightDrawerData: data }),
  closeRightDrawer: () => set({ rightDrawerOpen: false, rightDrawerData: null }),

  // Notifications array
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          ...notification,
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Loading state
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  // Confirmation dialog
  confirmDialog: {
    open: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
  },
  openConfirmDialog: (title, message, onConfirm, onCancel) =>
    set({
      confirmDialog: {
        open: true,
        title,
        message,
        onConfirm,
        onCancel,
      },
    }),
  closeConfirmDialog: () =>
    set({
      confirmDialog: {
        open: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
      },
    }),
}));
