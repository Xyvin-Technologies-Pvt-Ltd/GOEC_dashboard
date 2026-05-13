import { cn } from "@/lib/utils";

const StyledIconButton = ({ icon, className, ...props }) => (
  <div
    role="button"
    tabIndex={0}
    className={cn(
      "flex cursor-pointer items-center justify-center rounded bg-[#322f3b] px-4 py-2",
      className,
    )}
    {...props}
  >
    {icon && icon}
  </div>
);

export default StyledIconButton;
