import { REPORT_INSTANCE } from "./axiosInstances";

//! On-screen report viewer (paginated, sortable)
export async function getReportView(params) {
  const response = await REPORT_INSTANCE.get(`reports/view`, { params });
  return response.data;
}
