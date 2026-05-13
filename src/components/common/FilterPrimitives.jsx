import { cn } from "@/lib/utils";

export function FormContainer({ className, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-[17px] rounded bg-[#1c1d22] px-5 py-8 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]",
        className,
      )}
      {...props}
    />
  );
}

export function Heading({ className, children, ...props }) {
  return (
    <h1
      className={cn(
        "text-center font-sans text-base font-bold tracking-wide text-[#b5b8c5]",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn(
        "h-4 w-full text-start font-sans text-xs font-bold capitalize tracking-wide text-[#f7f8fc]",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function TableContainer({ className, ...props }) {
  return (
    <div className={cn("my-5 overflow-x-auto rounded-lg bg-[#27292f]", className)} {...props} />
  );
}
