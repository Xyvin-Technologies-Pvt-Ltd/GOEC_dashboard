import React, { useState } from "react";
import { Box } from "@mui/material";
import Tax from "../components/tariff/tax/Tax";
import { useTaxList } from "../hooks/queries/useTax";

export default function CTax() {
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const headers = [
    "Name",
    "Description",
    "Status",
    "Created on",
  ];

  const filter = { pageNo };
  if(searchQuery){
    filter.searchQuery = searchQuery;
  }

  const { data: taxData, refetch: refetchTaxData } = useTaxList(filter);
  const taxListData = taxData?.taxs || [];
  const totalCount = taxData?.totalCount || 0;

  const getTaxData = () => {
    refetchTaxData();
  }
  

  return (
    <Box>
      <Tax data={taxListData} setPageNo={setPageNo} totalCount={totalCount} headers={headers} onIsChange={setIsChange} isChange={isChange} updateData={getTaxData} setSearchQuery={setSearchQuery}/>
    </Box>
  );
}
