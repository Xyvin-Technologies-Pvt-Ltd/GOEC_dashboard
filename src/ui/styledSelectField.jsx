import React, { useEffect, useState } from "react";
import Select from "react-select";
import { tokens } from "../theme/tokens";

const { colors } = tokens;

const buildStyles = (height) => ({
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    padding: 8,
    border: `1px solid ${colors.border}`,
    borderRadius: 4,
    backgroundColor: state.isFocused ? colors.surfaceAlt : colors.surfaceAlt,
    color: state.isFocused ? colors.text : colors.textMuted,
    boxShadow: state.isFocused ? `0 0 0 2px ${colors.text}` : "none",
    cursor: "pointer",
    height: height || undefined,
    overflow: "scroll",
  }),
  input: (base) => ({ ...base, color: colors.text }),
  indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? colors.surfaceMuted : colors.surfaceAlt,
    color: state.isFocused ? colors.text : colors.textMuted,
    cursor: "pointer",
    ":active": { backgroundColor: colors.surfaceMuted },
  }),
  menu: (provided) => ({ ...provided, backgroundColor: colors.surfaceAlt, color: colors.textMuted }),
  singleValue: (provided) => ({ ...provided, color: colors.text }),
});

const customTheme = (theme) => ({
  ...theme,
  colors: { ...theme.colors, primary: colors.surfaceAlt },
});

const StyledSelectField = ({
  options,
  value,
  placeholder,
  onChange,
  onInputChange,
  isMulti = false,
  isSearchable = true,
  isLoading = false,
  height,
  ...props
}) => {
  const [valueOptions, setValueOption] = useState({});

  useEffect(() => {
    let selectedIndex = -1;
    const multiSelected = [];
    if (options) {
      for (let i = 0; i < options.length && value; i++) {
        if (isMulti) {
          for (let index = 0; index < value.length; index++) {
            if (
              options[i].value === value[index] ||
              options[i].label === value[index] ||
              options[i].value === value[index].value
            ) {
              multiSelected.push(options[i]);
            }
          }
        } else if (options[i].value === value || options[i].label === value) {
          selectedIndex = i;
          break;
        }
      }
    }
    if (isMulti) {
      setValueOption({ value: options && isMulti && multiSelected });
    } else {
      setValueOption({ value: options && !isMulti && options[selectedIndex] });
    }
    if (!value) setValueOption({ value: "" });
  }, [value, options, isMulti]);

  return (
    <div className="relative w-full">
      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        styles={buildStyles(height)}
        theme={customTheme}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isLoading={isLoading}
        {...props}
        {...valueOptions}
      />
    </div>
  );
};

export default StyledSelectField;
