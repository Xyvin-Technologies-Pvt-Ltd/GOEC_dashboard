import React, { useState } from "react";
import StyledTab from "../ui/StyledTab";
import About from "../components/help/About";

function Help() {
    const [togglePage, setTogglePage] = useState(0);
  
    const buttonChanged = (e) => {
      setTogglePage(e.index);
    };
  return (
    <div className="w-full">
      <div className="flex flex-row bg-secondary">
        <StyledTab
          buttons={["About Us", "Raise Ticket"]}
          onChanged={buttonChanged}
        />
      </div>
      {togglePage === 0 ? <About /> : ""}
    </div>
  );
}

export default Help;
