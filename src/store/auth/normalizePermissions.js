import { permissions as p } from "../../routes/permissions";

/**
 * Maps backend admin JWT permission codes (e.g. VIEW_DASHBOARD) to this app's
 * snake_case slugs used in PrivateRoute / sidebar (e.g. liveStatus_view).
 * Extend when the API adds new codes.
 */
const BACKEND_CODE_TO_APP_PERMISSIONS = {
  VIEW_DASHBOARD: [p.liveStatus.view, p.analytics.view, p.alarms.view],
  MANAGE_ANALYTICS: [p.analytics.view],
  VIEW_REPORTS: [p.report.view, p.logs.view],
  EXPORT_REPORTS: [p.report.view],
  VIEW_CUSTOMERS: [p.searchCustomer.view, p.customerList.view],
  EDIT_CUSTOMERS: [p.customerList.view, p.searchCustomer.view],
  DELETE_CUSTOMERS: [p.customerList.view],
  EXPORT_CUSTOMERS: [p.customerList.view],
  MANAGE_PRIORITY_CUSTOMERS: [p.customerList.view],
  MANAGE_ROLES: [p.roleManagement.view],
  MANAGE_ADMINS: [p.adminManagement.view],
  VIEW_AUDIT_LOGS: [p.adminActivity.view],
  MANAGE_SETTINGS: [p.adminManagement.view],
};

export function normalizePermissions(raw) {
  if (!Array.isArray(raw)) return [];
  const set = new Set();
  for (const entry of raw) {
    if (typeof entry !== "string") continue;
    set.add(entry);
    const mapped = BACKEND_CODE_TO_APP_PERMISSIONS[entry];
    if (mapped) mapped.forEach((m) => set.add(m));
  }
  return [...set];
}
