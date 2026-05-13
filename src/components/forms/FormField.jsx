import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const errorClass = "text-sm text-destructive";

/**
 * @param {Object} props
 * @param {import("react-hook-form").Control} props.control
 * @param {string} props.name
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {string} [props.type]
 * @param {Object} [props.rules]
 * @param {string} [props.className]
 */
export function FormField({ control, name, label, placeholder, type = "text", rules, className }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          {label ? (
            <Label htmlFor={name} className="text-muted-foreground">
              {label}
            </Label>
          ) : null}
          <Input id={name} type={type} placeholder={placeholder} {...field} />
          {error?.message ? <span className={errorClass}>{error.message}</span> : null}
        </div>
      )}
    />
  );
}
