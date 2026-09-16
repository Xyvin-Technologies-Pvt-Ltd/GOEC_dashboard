import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const NEPAL_TZ = "Asia/Kathmandu";

// Backend often sends UTC wall-clock without "Z" (e.g. charger logs)
const UTC_STRING_FORMATS = [
  "MMM DD YYYY h:mm:ss A",
  "MMM DD, YYYY h:mm:ss A",
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DDTHH:mm:ss",
  "DD-MM-YYYY HH:mm:ss",
  "DD-MM-YYYY",
  "YYYY-MM-DD",
];

export const formatNepalTime = (
  value,
  format = "MMM DD YYYY h:mm:ss A"
) => {
  if (!value) return "-";

  let date;

  if (typeof value === "string" && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(value.trim())) {
    // No timezone → parse as UTC using known formats (OCPP log style)
    for (const fmt of UTC_STRING_FORMATS) {
      date = dayjs.utc(value.trim(), fmt, true);
      if (date.isValid()) break;
    }
  }

  if (!date?.isValid()) {
    date = dayjs.utc(value);
  }

  if (!date.isValid()) return value;

  return date.tz(NEPAL_TZ).format(format);
};

/** Calendar-day string in Nepal TZ (for filters / API query params) */
export function formatNepalDateOnly(value) {
  return formatNepalTime(value, "YYYY-MM-DD");
}
