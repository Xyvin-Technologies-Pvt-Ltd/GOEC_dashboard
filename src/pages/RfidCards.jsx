import React, { useState } from 'react'
import StyledTab from "../ui/StyledTab";
import AllRfidCards from '../components/tagManagement/Rfid/AllRfidCards';
import AssignRfid from '../components/tagManagement/Rfid/AssignRfid';
import { useRfidList } from '../hooks/queries/useRfid';

const RfidCards = () => {
  const [togglePage, setTogglePage] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const { data: rfidListData, refetch } = useRfidList({ pageNo });

  const rfidData = rfidListData?.result || [];
  const totalCount = rfidListData?.totalCount || 0;

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row bg-secondary">
        <StyledTab
          buttons={["All RFID cards", "Assign RFID"]}
          onChanged={buttonChanged}
        />
      </div>
      {togglePage === 0 ? <AllRfidCards data={rfidData} setPageNo={setPageNo} totalCount={totalCount} updateData={refetch} /> : <AssignRfid />}
    </div>
  )
}

export default RfidCards
