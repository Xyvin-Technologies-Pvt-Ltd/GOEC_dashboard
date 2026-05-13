import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import StyledSelectField from "@/ui/StyledSelectField";
import { cn } from "@/lib/utils";

const errorClass = "text-sm text-destructive";

/** react-hook-form + existing StyledSelectField (react-select) bridge. */
export function FormSelectLegacy({ control, name, label, placeholder, options, rules, className, ...selectProps }) {
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
          <StyledSelectField
            placeholder={placeholder}
            options={options}
            {...field}
            {...selectProps}
            onChange={(opt) => field.onChange(opt)}
          />
          {error?.message ? <span className={errorClass}>{error.message}</span> : null}
        </div>
      )}
    />
  );
}
