import React, { useState } from "react";
import StyledTab from "../ui/StyledTab";
import About from "../components/help/About";

function Help() {
  const [togglePage, setTogglePage] = useState(0);

  return (
    <div className="w-full">
      <div className="flex flex-row bg-secondary">
        <StyledTab
          buttons={["About Us", "Raise Ticket"]}
          onChanged={(e) => setTogglePage(e.index)}
        />
      </div>
      {togglePage === 0 ? <About /> : ""}
    </div>
  );
}

export default Help;
