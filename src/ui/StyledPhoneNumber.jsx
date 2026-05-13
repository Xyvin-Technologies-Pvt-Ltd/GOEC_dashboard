import React, { useState } from "react";
import Select from "react-select";

const StyledPhoneNumber = ({ onChange, placeholder }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "0px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: state.isFocused ? "#39383D" : "var(--inner, #39383D)",
      color: state.isFocused ? "#fff" : "#B5B8C5",
      boxShadow: state.isFocused ? "none" : "none",
      cursor: "pointer",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#242424" : state.isFocused ? "#4a4a4a" : "var(--inner, #39383D)",
      color: state.isFocused ? "#fff" : "#B5B8C5",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--inner, #39383D)",
      color: "#B5B8C5",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#F7F8FC",
    }),
  };

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "var(--inner, #39383D)",
    },
  });

  const options = [
    { value: "+91", label: "+91" },
    { value: "+971", label: "+971" },
  ];

  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  const handleCountryCodeChange = (selectedOption) => {
    const countryCode = selectedOption.value;
    setSelectedCountryCode(countryCode);
  };

  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    onChange({ countryCode: selectedCountryCode, phoneNumber });
  };

  return (
    <div className="flex h-14 items-center rounded border border-white/20 bg-[var(--inner)] p-0">
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
        className="min-w-0 flex-1 border-0 bg-[var(--inner)] px-2 font-sans text-sm font-normal leading-4 text-[#b5b8c5] outline-none placeholder:text-[#b5b8c5] focus:ring-0"
      />
    </div>
  );
};

export default StyledPhoneNumber;
