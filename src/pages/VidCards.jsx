import React, { useState } from 'react'
import StyledTab from "../ui/StyledTab";
import AllVidCards from '../components/tagManagement/Vid/AllVidCards';
import AssignVid from '../components/tagManagement/Vid/AssignVid';

const VidCards = () => {
    const [togglePage, setTogglePage] = useState(0);

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };
  return (
     <div className="w-full">
      <div className="flex flex-row bg-secondary">
        <StyledTab
        buttons={['All VID cards', 'Assign VID']} onChanged={buttonChanged} />
      </div>
      {togglePage === 0 ? <AllVidCards /> : <AssignVid />}
    </div>
  )
}

export default VidCards
