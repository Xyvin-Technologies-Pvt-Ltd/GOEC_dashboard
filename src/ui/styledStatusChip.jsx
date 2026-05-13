import { cn } from "@/lib/utils";

function statusBackground($status) {
  const status = $status ? String($status).toUpperCase() : "UNAVAILABLE";
  if (["ACTIVE", "ONLINE", "ASSIGNED", "SUCCESS", "AVAILABLE", "YES"].includes(status)) {
    return "rgba(24, 73, 45, 1)";
  }
  if (["OFFLINE", "FAULTED"].includes(status)) {
    return "#c0392b";
  }
  if (status === "CHARGING") {
    return "#b0a702";
  }
  if (status === "INACTIVE") {
    return "#3e3c3c";
  }
  if (status === "PREPARING") {
    return "#115982";
  }
  if (status === "FINISHING") {
    return "#5C185A";
  }
  if (["UNAVAILABLE", "DISCONNECTED", "NO"].includes(status)) {
    return "#B5B8C533";
  }
  if (["UNASSIGNED", "PENDING"].includes(status)) {
    return "#65572B";
  }
  return "#444";
}

const StyledStatusChip = ({ $status, children, className }) => (
  <span
    className={cn(
      "inline-block min-w-[20px] rounded-[15px] px-2 py-1 text-center text-xs font-medium uppercase text-white",
      className,
    )}
    style={{ backgroundColor: statusBackground($status) }}
  >
    {children}
  </span>
);

export default StyledStatusChip;
