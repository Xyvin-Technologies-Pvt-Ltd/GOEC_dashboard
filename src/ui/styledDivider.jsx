import { cn } from "@/lib/utils";

export default function StyledDivider({ className }) {
  return <div className={cn("my-4 h-px w-full max-w-md bg-white/50", className)} />;
}
