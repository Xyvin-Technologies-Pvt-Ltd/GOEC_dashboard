import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTab from '../ui/styledTab'
import AllEvChargers from '../components/dataManagement/evChargers/AllEvChargers';
import AddEvCharger from '../components/dataManagement/evChargers/AddEvCharger';
import { useEvModelList } from '../hooks/queries/useEvMachine';


export default function EvChargers() {
  const [togglePage, setTogglePage] = useState(0);
  const [evModelListData, setEvModelListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ pageNo: 1 });

  // Use the query hook to fetch EV model list
  const { data: evModelData = {}, refetch } = useEvModelList(filters);

  // Update state when hook data changes
  useEffect(() => {
    if (evModelData.result) {
      setEvModelListData(evModelData.result);
      setTotalCount(evModelData.totalCount || 0);
    }
  }, [evModelData]);

  // Update filters when pageNo or searchQuery changes
  useEffect(() => {
    const newFilters = { pageNo };
    if (searchQuery) {
      newFilters.searchQuery = searchQuery;
    }
    setFilters(newFilters);
  }, [pageNo, searchQuery]);


  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };

  return (
    <Box>
      <Stack direction={"row"} sx={{ backgroundColor: "secondary.main" }}>
        <StyledTab
          buttons={['All EV chargers', 'Add EV charger']} onChanged={buttonChanged} activeIndex={togglePage} />
      </Stack>
      {togglePage === 0 ? <AllEvChargers data={evModelListData} setPageNo={setPageNo} totalCount={totalCount} updateData={refetch} setSearchQuery={setSearchQuery}/> : <AddEvCharger formSubmitted={() => { refetch(); setTogglePage(0) }} />}
    </Box>
  );
}
