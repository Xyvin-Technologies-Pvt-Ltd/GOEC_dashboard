/**
 * Maps OCPP numeric connector IDs to letter labels for display only.
 * 1 → A, 2 → B, … 26 → Z. Non-positive / non-numeric values pass through.
 * Do not use for API payloads — OCPP still expects integers.
 */
export function connectorLabel(id) {
  if (id === null || id === undefined || id === "") return "-";
  const n = Number(id);
  if (!Number.isFinite(n) || n <= 0) return String(id);
  if (n >= 1 && n <= 26) return String.fromCharCode(64 + n);
  return String(id);
}

/** Returns option list with letter labels and numeric values (for selects). */
export function connectorOptions(ids = [1, 2]) {
  return ids.map((id) => ({
    label: connectorLabel(id),
    value: id,
  }));
}

/** Maps connectorId fields in row objects to letter labels for tables. */
export function withConnectorLabels(rows, key = "connectorId") {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => ({
    ...row,
    [key]: connectorLabel(row?.[key]),
  }));
}
