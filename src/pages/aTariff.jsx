import React, { useState } from "react";
import StyledTab from "../ui/StyledTab";
import Personal from "../components/tariff/assignTariff/personal";
import Location from "../components/tariff/assignTariff/location";
import { useChargingStationDropdown } from "../hooks/queries/useChargingStation";

export default function ATariff() {
  const [togglePage, setTogglePage] = useState(0);
  const { data: locationList = [] } = useChargingStationDropdown();

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row bg-secondary">
        <StyledTab
          buttons={["Location", "Personal"]}
          onChanged={buttonChanged}
        />
      </div>
      {togglePage === 0 ? <Location location={locationList} /> : <Personal location={locationList} />}
    </div>
  );
}
