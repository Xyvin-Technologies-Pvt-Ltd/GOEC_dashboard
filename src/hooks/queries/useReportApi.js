import {
  getWalletReport,
  getAccountTransactionReport,
} from "../../api/wallet.api";
import {
  getUserRegistationReport,
} from "../../api/user.api";
import {
  getFeedbackReport,
} from "../../api/review.api";
import {
  getChargingSummaryReport,
  getAlarmReport,
} from "../../api/ocpp.api";
import {
  getReportForChargePoint,
} from "../../api/evMachine.api";

/**
 * Fetch report based on report type and data
 * @param {string} reportType - Type of report (Account Transaction, Feedback, Charging Summary, User Registration, Alarms, Charge points)
 * @param {object} data - Report parameters
 * @returns {Promise} Report data
 */
export async function fetchReport(reportType, data) {
  try {
    let response;

    switch (reportType) {
      case "Account Transaction":
        response = await getAccountTransactionReport(data);
        break;
      case "Feedback":
        response = await getFeedbackReport(data);
        break;
      case "Charging Summary":
        response = await getChargingSummaryReport(data);
        break;
      case "User Registration":
        response = await getUserRegistationReport(data);
        break;
      case "Alarms":
        response = await getAlarmReport(data);
        break;
      case "Charge points":
        response = await getReportForChargePoint(data);
        break;
      default:
        throw new Error(`Unknown report type: ${reportType}`);
    }

    return response;
  } catch (error) {
    console.error(`Error fetching ${reportType} report:`, error);
    throw error;
  }
}
