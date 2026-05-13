import { cn } from "@/lib/utils";

// Maps a status string to one of the status-* semantic tokens defined in src/index.css.
function statusClass($status) {
  const status = $status ? String($status).toUpperCase() : "UNAVAILABLE";
  if (["ACTIVE", "ONLINE", "ASSIGNED", "SUCCESS", "AVAILABLE", "YES"].includes(status)) {
    return "bg-status-online";
  }
  if (["OFFLINE", "FAULTED"].includes(status)) return "bg-status-offline";
  if (status === "CHARGING") return "bg-status-charging";
  if (status === "INACTIVE") return "bg-status-inactive";
  if (status === "PREPARING") return "bg-status-preparing";
  if (status === "FINISHING") return "bg-status-finishing";
  if (["UNAVAILABLE", "DISCONNECTED", "NO"].includes(status)) return "bg-status-unavailable";
  if (["UNASSIGNED", "PENDING"].includes(status)) return "bg-status-pending";
  return "bg-status-default";
}

const StyledStatusChip = ({ $status, children, className }) => (
  <span
    className={cn(
      "inline-block min-w-5 rounded-2xl px-2 py-1 text-center text-xs font-medium uppercase text-white",
      statusClass($status),
      className,
    )}
  >
    {children}
  </span>
);

export default StyledStatusChip;
