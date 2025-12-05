import { Box, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import StyledSelectField from "../../../ui/styledSelectField";
import AsyncSelect from "react-select/async";
import InputField from "../../../ui/styledInput";
import StyledButton from "../../../ui/styledButton";
import ProgressBar from "../../../ui/ProgressBar";
import { Controller, useForm } from "react-hook-form";
import { userSuggestionList } from "../../../services/userApi";
import FileUpload from "../../../utils/FileUpload";
import StyledTextArea from "../../../ui/styledTextArea";
import { toast } from "react-toastify";
import { useSendBulkMail } from "../../../hooks/mutations/useNotificationMutation";

export default function EmailNotification() {
  const [userOptions, setUserOption] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const reference = useRef();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sendTo: [],
      subject: "",
      content: "",
    },
  });

  const sendBulkMailMutation = useSendBulkMail({
    onSuccess: (res) => {
      toast.success("Send successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to send mail");
    },
  });

  const onSubmit = (data) => {
    const mails = data.sendTo.map((dt) => dt.value);

    const formData = new FormData();
    formData.append("to", mails);
    formData.append("subject", data.subject);
    formData.append("text", data.content);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    let formDataObject = {};
    for (let pair of formData.entries()) {
      if (pair[0] === "to[]") {
        if (!formDataObject["to"]) {
          formDataObject["to"] = [];
        }
        formDataObject["to"].push(pair[1]);
      } else {
        formDataObject[pair[0]] = pair[1];
      }
    }
    sendBulkMailMutation.mutate(formDataObject);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file.files[0]);
    let i = 0;
    let st = setInterval(() => {
      if (i === 90) {
        clearInterval(st);
      }
      i = i + 10;
      setUploadPercentage(i);
    }, 40);
  };

  const loadUserOptions = async (inputValue) => {
    try {
      const response = await userSuggestionList(inputValue);
      if (response.status) {
        const mappedUsers = response.result.map((user) => ({
          label: user.email,
          value: user.email,
        }));
      
        // Adding the 'All' option to the beginning of the mappedUsers array
        const updatedSuggestions = [
          { label: 'All', value: '*' },
          ...mappedUsers,
        ];
      
        return updatedSuggestions;
      }
      return [];
    } catch (error) {
      console.error("Error fetching users", error);
      return [];
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          borderRadius: "8px",
          px: { md: 30, xs: 2 },
          py: 5,
          alignItems: "center",
        }}
      >
        <Stack direction={"column"} spacing={2}>
          <Box sx={BoxStyle}>
            <Typography sx={HeadingStyle}>Create Email</Typography>
            <Typography sx={TextStyle}>Send To</Typography>
            <Controller
              name="sendTo"
              control={control}
              render={({ field }) => (
                <>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadUserOptions}
                    placeholder="Select User Emails"
                    isMulti
                    {...field}
                    styles={customStyles}
                    theme={customTheme}
                    onChange={(selectedOptions) => {
                      if (
                        selectedOptions.some((option) => option.value === "*")
                      ) {
                        const confirmation = window.confirm("Are you sure want to send mail to all?");
                        if(confirmation){                          
                          loadUserOptions("").then((fullList) => {
                            const filteredList = fullList.filter((option) => option.value !== '*');
                            setValue("sendTo", filteredList);
                          });
                        }
                      } else {
                        setValue("sendTo", selectedOptions);
                      }
                    }}
                  />
                  {errors.sendTo && (
                    <span style={errorMessageStyle}>
                      {errors.sendTo.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "User is required" }}
            />
            <Typography sx={TextStyle}>Subject</Typography>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <>
                  <InputField placeholder={"Enter Subject line"} {...field} />
                  {errors.subject && (
                    <span style={errorMessageStyle}>
                      {errors.subject.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Subject is required" }}
            />
            <Typography sx={TextStyle}>Content</Typography>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <>
                  <StyledTextArea
                    placeholder={"Add message"}
                    height={"153px"}
                    specialAlign={true}
                    {...field}
                  />{" "}
                  {errors.content && (
                    <span style={errorMessageStyle}>
                      {errors.content.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Content is required" }}
            />

            <FileUpload
              ref={reference}
              accept={"*"}
              removedFile={selectedFile ? false : true}
              onFileSelect={handleFileSelect}
            />
            {selectedFile && (
              <ProgressBar
                UploadProgress={uploadPercentage}
                filename={selectedFile.name}
                onClose={() => {
                  setSelectedFile();
                }}
              />
            )}
            <StyledButton
              type="submit"
              variant={"primary"}
              width="316"
              height="46"
              style={{ borderRadius: "8px" }}
            >
              Send
            </StyledButton>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}
const TextStyle = {
  color: "var(--white, #F7F8FC)",
  textAlign: "start",
  width: "100%",
  fontFamily: "Inter",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "normal",
  letterSpacing: "0.3px",
  textTransform: "capitalize",
};
const BoxStyle = {
  display: "flex",
  padding: "30px 20px",
  flexDirection: "column",
  alignItems: "center",
  gap: "17px",
  borderRadius: "var(--borderRadius, 4px)",
  background: "#1c1d22",
  width: "356x",
};

const HeadingStyle = {
  color: "var(--Grey, #B5B8C5)",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "normal",
  letterSpacing: "0.3px",
};
const errorMessageStyle = {
  color: "red",
};

// customStyles for react-select/AsyncSelect
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "8px",
    border: "1px solid rgba(255, 255, 255, 0.20)",
    borderRadius: "4px",
    backgroundColor: state.isFocused ? "#39383D" : "#39383D",
    color: state.isFocused ? "#fff" : "#B5B8C5",
    boxShadow: state.isFocused ? "0 0 0 2px #fff" : "none",
    cursor: "pointer",
    height: "55px", // Set this to the height of your input
    overflow: "hidden", // Hide the overflow
    
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
    backgroundColor: state.isFocused ? "#242424" : "#39383D",
    color: state.isFocused ? "#fff" : "#B5B8C5",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#242424",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#39383D",
    color: "#B5B8C5",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#F7F8FC",
  }),
};

// customTheme for react-select/AsyncSelect
const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#39383D", // primary color for the select, used for the focused state
    // Add other color overrides if necessary
  },
});
