import React, { useState } from 'react'
import StyledTab from '../ui/StyledTab'

import AddVehicles from '../components/dataManagement/evVehicles/AddVehicles'
import AllVehicles from '../components/dataManagement/evVehicles/AllVehicles'
import { useVehicleListForDashboard } from '../hooks/queries/useVehicle'


export default function Vehicles() {
  const [togglePage, setTogglePage] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filter = { pageNo };
  if(searchQuery){
    filter.searchQuery = searchQuery;
  }

  const { data: vehicleData, refetch: refetchVehicles } = useVehicleListForDashboard(filter);
  const vehicleListData = vehicleData?.result?.map((item) => ({ ...item, charger_types: item.compactable_port.toString() })) || [];
  const totalCount = vehicleData?.totalCount || 0;

  const init = () => {
    refetchVehicles();
  };

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };
  return (
    <div className="w-full">
      <div className="flex flex-row bg-secondary">
        <StyledTab
          activeIndex={togglePage}
          buttons={['All EV Vehicle', 'Add EV Vehicle']} onChanged={buttonChanged} />
      </div>
      {togglePage === 0 ? <AllVehicles data={vehicleListData} setPageNo={setPageNo} totalCount={totalCount} setSearchQuery={setSearchQuery} updateData={init} /> : <AddVehicles formSubmited={() => { setTogglePage(0); init() }} />}
    </div>
  );
}
