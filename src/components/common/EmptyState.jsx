import { FileQuestion } from "lucide-react";

/** Simple empty state for lists and tables. */
export default function EmptyState({ title = "Nothing here yet", description, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground ${className}`}
    >
      <FileQuestion className="size-12 opacity-50" aria-hidden />
      <p className="text-base font-medium text-foreground">{title}</p>
      {description ? <p className="max-w-sm text-sm">{description}</p> : null}
    </div>
  );
}
