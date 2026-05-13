import React, { useEffect, useState } from "react";
import Select from "react-select";

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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "8px",
      border: "1px solid var(--White-20, rgba(255, 255, 255, 0.20));",
      borderRadius: "4px",
      backgroundColor: state.isFocused ? "#39383D" : "var(--inner, #39383D)",
      color: state.isFocused ? "#fff" : "#B5B8C5",
      boxShadow: state.isFocused ? "0 0 0 2px #fff" : "none",
      cursor: "pointer",
      height: height && height,
      overflow: "scroll",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#242424" : " #39383D",
      color: state.isFocused ? "#fff" : "#B5B8C5",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#242424",
      },
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
        } else {
          if (options[i].value === value || options[i].label === value) {
            selectedIndex = i;
            break;
          }
        }
      }
    }
    if (isMulti) {
      setValueOption({ value: options && isMulti && multiSelected });
    } else {
      setValueOption({ value: options && !isMulti && options[selectedIndex] });
    }
    if (!value) {
      setValueOption({ value: "" });
    }
  }, [value, options, isMulti]);

  return (
    <div className="relative w-full">
      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        styles={customStyles}
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
