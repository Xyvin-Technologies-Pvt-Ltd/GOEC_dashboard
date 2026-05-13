import React, { useState } from "react";
import Select from "react-select";
import { tokens } from "../theme/tokens";

const { colors } = tokens;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    padding: 0,
    border: "none",
    borderRadius: 4,
    backgroundColor: state.isFocused ? colors.surfaceAlt : colors.surfaceAlt,
    color: state.isFocused ? colors.text : colors.textMuted,
    boxShadow: "none",
    cursor: "pointer",
  }),
  indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? colors.surfaceMuted
      : state.isFocused
      ? "#4a4a4a"
      : colors.surfaceAlt,
    color: state.isFocused ? colors.text : colors.textMuted,
    cursor: "pointer",
  }),
  menu: (provided) => ({ ...provided, backgroundColor: colors.surfaceAlt, color: colors.textMuted }),
  singleValue: (provided) => ({ ...provided, color: colors.text }),
};

const customTheme = (theme) => ({
  ...theme,
  colors: { ...theme.colors, primary: colors.surfaceAlt },
});

const options = [
  { value: "+91", label: "+91" },
  { value: "+971", label: "+971" },
];

const StyledPhoneNumber = ({ onChange, placeholder }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  const handleCountryCodeChange = (selectedOption) => {
    setSelectedCountryCode(selectedOption.value);
  };

  const handlePhoneNumberChange = (event) => {
    onChange({ countryCode: selectedCountryCode, phoneNumber: event.target.value });
  };

  return (
    <div className="flex h-14 items-center rounded border border-border bg-muted p-0">
      <Select
        placeholder="+91"
        onChange={handleCountryCodeChange}
        options={options}
        styles={customStyles}
        theme={customTheme}
      />
      <input
        placeholder={placeholder}
        onChange={handlePhoneNumberChange}
        className="min-w-0 flex-1 border-0 bg-muted px-2 font-sans text-sm font-normal leading-4 text-muted-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
      />
    </div>
  );
};

export default StyledPhoneNumber;
