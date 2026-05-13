import React, { useState, useEffect } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import LastSynced from "../layout/LastSynced";
import StyledInput from "../ui/StyledInput";
import StyledSelectField from "../ui/StyledSelectField";
import StyledButton from "../ui/StyledButton";
import CustomerCard from "../components/crm/searchCustomer/customerCard";
import { toast } from "react-toastify";
import { useUserByEmailMobile } from "../hooks/queries/useUser";

const selectOptions = [
  { value: "number", label: "Phone Number" },
  { value: "email", label: "Email" },
];

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SearchCustomers() {
  const [selectedOption, setSelectedOption] = useState("number");
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchCustomers, setSearchCustomers] = useState();

  const { data: customerData, error } = useUserByEmailMobile(searchQuery, !!searchQuery);

  useEffect(() => {
    if (customerData?.result?.[0]) setSearchCustomers(customerData.result[0]);
  }, [customerData]);

  useEffect(() => {
    if (error) toast.error(error.response?.data?.error || "Error searching customer");
  }, [error]);

  const onSubmit = () => {
    if (inputValue === "") {
      toast.error(selectedOption === "email" ? "Enter Email" : "Enter Phone number");
      return;
    }
    if (selectedOption === "email" && inputValue.toLowerCase().match(EMAIL_REGEX)) {
      setSearchQuery(`email=${inputValue}`);
    } else if (selectedOption === "email") {
      toast.error("Enter Valid email");
    } else {
      setSearchQuery(`phoneNumber=${inputValue}`);
    }
  };

  return (
    <div className="w-full">
      <LastSynced heading="Search Customer" lastSyncVisible={false} />
      <div className="m-4 flex flex-col gap-3 rounded-2xl bg-secondary p-4 sm:p-6">
        <Typography>Search by</Typography>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems={{ md: "stretch" }}>
          <StyledSelectField
            options={selectOptions}
            placeholder="Select Search Option"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.value)}
          />
          <StyledInput
            type={selectedOption === "number" ? "number" : "text"}
            placeholder={selectedOption === "number" ? "Enter Phone Number" : "Enter Email"}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <StyledButton variant="primary" onClick={onSubmit}>
            Search
          </StyledButton>
        </Stack>
      </div>
      <Grid container spacing={2} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {searchCustomers && (
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <CustomerCard data={searchCustomers} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
