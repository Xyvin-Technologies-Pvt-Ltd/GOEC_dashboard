import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import StyledInput from "@/ui/StyledInput";
import CalendarInput from "@/ui/CalendarInput";
import { cn } from "@/lib/utils";

const errorClass = "text-sm text-destructive";

/**
 * react-hook-form + StyledInput + CalendarInput (react-datepicker).
 * @param {Object} props
 * @param {import("react-hook-form").Control} props.control
 * @param {string} props.name
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {Object} [props.rules]
 */
export function FormDatePicker({ control, name, label, placeholder = "mm/dd/yyyy", rules, className }) {
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
          <StyledInput
            {...field}
            id={name}
            readOnly
            placeholder={placeholder}
            value={field.value || ""}
            iconright={<CalendarInput onDateChange={(d) => field.onChange(d)} />}
          />
          {error?.message ? <span className={errorClass}>{error.message}</span> : null}
        </div>
      )}
    />
  );
}
