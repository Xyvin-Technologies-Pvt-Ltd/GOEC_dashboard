import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTab from "../ui/styledTab";
import OEM from "../components/dataManagement/manufacturers/OEM";
import Vehicles from "../components/dataManagement/manufacturers/Vehicle";
import { useOemList } from "../hooks/queries/useEvMachine";
import { useBrandList } from "../hooks/queries/useVehicle";

export default function Manufactures() {
  const [togglePage, setTogglePage] = useState(0);
  const [oemListData, setOemListData] = useState([]);
  const [brandListData, setBrandListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageNo1, setPageNo1] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [totalCount1, setTotalCount1] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [oemFilters, setOemFilters] = useState({ pageNo: 1 });
  const [brandFilters, setBrandFilters] = useState({ pageNo: 1 });

  // Use the query hooks to fetch OEM and brand lists
  const { data: oemData = {}, refetch: refetchOem } = useOemList(oemFilters);
  const { data: brandData = {}, refetch: refetchBrand } = useBrandList(brandFilters);

  // Update OEM state when hook data changes
  useEffect(() => {
    if (oemData.result) {
      setOemListData(oemData.result);
      setTotalCount(oemData.totalCount || 0);
    }
  }, [oemData]);

  // Update brand state when hook data changes
  useEffect(() => {
    if (brandData.result) {
      setBrandListData(brandData.result);
      setTotalCount1(brandData.totalCount || 0);
    }
  }, [brandData]);

  // Update OEM filters when pageNo or searchQuery changes
  useEffect(() => {
    const newFilters = { pageNo };
    if (searchQuery) {
      newFilters.searchQuery = searchQuery;
    }
    setOemFilters(newFilters);
  }, [pageNo, searchQuery]);

  // Update brand filters when pageNo1 or searchQuery1 changes
  useEffect(() => {
    const newFilters = { pageNo: pageNo1 };
    if (searchQuery1) {
      newFilters.searchQuery = searchQuery1;
    }
    setBrandFilters(newFilters);
  }, [pageNo1, searchQuery1]);

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };
  return (
    <Box>
      <Stack direction={"row"} sx={{ backgroundColor: "secondary.main" }}>
        <StyledTab buttons={["OEM", "Brand"]} onChanged={buttonChanged} />
      </Stack>
      {togglePage === 0 ? oemListData && <OEM data={oemListData} setPageNo={setPageNo} totalCount={totalCount} setSearchQuery={setSearchQuery} updateData={refetchOem} /> : brandListData && <Vehicles data={brandListData} setPageNo1={setPageNo1} totalCount1={totalCount1} setSearchQuery1={setSearchQuery1} updateData={refetchBrand} />}
    </Box>
  );
}
