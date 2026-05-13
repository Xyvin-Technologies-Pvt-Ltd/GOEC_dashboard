import { ReactComponent as AvailableCCS } from "../assets/icons/CCS/Property 1=Available.svg";
import { ReactComponent as BusyCCS } from "../assets/icons/CCS/Property 1=Busy.svg";
import { ReactComponent as FaultyCCS } from "../assets/icons/CCS/Property 1=Faulty.svg";
import { ReactComponent as UnknownCCS } from "../assets/icons/CCS/Property 1=Unknown.svg";

import { ReactComponent as AvailableCHAdeMO } from "../assets/icons/CHAdeMO/Property 1=Available.svg";
import { ReactComponent as BusyCHAdeMO } from "../assets/icons/CHAdeMO/Property 1=Busy.svg";
import { ReactComponent as FaultyCHAdeMO } from "../assets/icons/CHAdeMO/Property 1=Faulty.svg";
import { ReactComponent as UnknownCHAdeMO } from "../assets/icons/CHAdeMO/Property 1=Unknown.svg";

import { ReactComponent as AvailableCombo1 } from "../assets/icons/Combo1/Property 1=Available.svg";
import { ReactComponent as BusyCombo1 } from "../assets/icons/Combo1/Property 1=Busy.svg";
import { ReactComponent as FaultyCombo1 } from "../assets/icons/Combo1/Property 1=Faulty.svg";
import { ReactComponent as UnknownCombo1 } from "../assets/icons/Combo1/Property 1=Unknown.svg";

import { ReactComponent as AvailableGBT } from "../assets/icons/GBT/Property 1=Available.svg";
import { ReactComponent as BusyGBT } from "../assets/icons/GBT/Property 1=Busy.svg";
import { ReactComponent as FaultyGBT } from "../assets/icons/GBT/Property 1=Faulty.svg";
import { ReactComponent as UnknownGBT } from "../assets/icons/GBT/Property 1=Unknown.svg";

import { ReactComponent as AvailableIEC60309 } from "../assets/icons/IEC60309/Property 1=Available.svg";
import { ReactComponent as BusyIEC60309 } from "../assets/icons/IEC60309/Property 1=Busy.svg";
import { ReactComponent as FaultyIEC60309 } from "../assets/icons/IEC60309/Property 1=Faulty.svg";
import { ReactComponent as UnknownIEC60309 } from "../assets/icons/IEC60309/Property 1=Unknown.svg";

import { ReactComponent as AvailableType1 } from "../assets/icons/Type1/Property 1=Available.svg";
import { ReactComponent as BusyType1 } from "../assets/icons/Type1/Property 1=Busy.svg";
import { ReactComponent as FaultyType1 } from "../assets/icons/Type1/Property 1=Faulty.svg";
import { ReactComponent as UnknownType1 } from "../assets/icons/Type1/Property 1=Unknown.svg";

import { ReactComponent as AvailableType2 } from "../assets/icons/Type2/Property 1=Available.svg";
import { ReactComponent as BusyType2 } from "../assets/icons/Type2/Property 1=Busy.svg";
import { ReactComponent as FaultyType2 } from "../assets/icons/Type2/Property 1=Faulty.svg";
import { ReactComponent as UnknownType2 } from "../assets/icons/Type2/Property 1=Unknown.svg";

const TYPE_ENUM = {
    CCS: "CCS",
    CHAdeMO: "CHAdeMO",
    COMBO_1: "Combo 1",
    GBT: "GBT",
    IEC_60309: "IEC 60309",
    Type_1: "Type 1",
    Type_2: "Type 2"
};

const STATUS_ENUM = {
    AVAILABLE: "Available",
    BUSY: "Busy",
    FAULTY: "Faulty",
    UNKNOWN: "Unknown"
};

export const getConnectorIcon = (type, status) => {
    switch (type) {
        case TYPE_ENUM.CCS:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableCCS />
                case STATUS_ENUM.BUSY:
                    return <BusyCCS />
                case STATUS_ENUM.FAULTY:
                    return <FaultyCCS />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownCCS />
                default: return <UnknownCCS />
            }

        case TYPE_ENUM.CHAdeMO:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableCHAdeMO />
                case STATUS_ENUM.BUSY:
                    return <BusyCHAdeMO />
                case STATUS_ENUM.FAULTY:
                    return <FaultyCHAdeMO />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownCHAdeMO />
                default: return <UnknownCHAdeMO />
            }

        case TYPE_ENUM.COMBO_1:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableCombo1 />
                case STATUS_ENUM.BUSY:
                    return <BusyCombo1 />
                case STATUS_ENUM.FAULTY:
                    return <FaultyCombo1 />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownCombo1 />
                default: return <UnknownCombo1 />
            }
        case TYPE_ENUM.GBT:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableGBT />
                case STATUS_ENUM.BUSY:
                    return <BusyGBT />
                case STATUS_ENUM.FAULTY:
                    return <FaultyGBT />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownGBT />
                default: return <UnknownGBT />
            }

        case TYPE_ENUM.IEC_60309:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableIEC60309 />
                case STATUS_ENUM.BUSY:
                    return <BusyIEC60309 />
                case STATUS_ENUM.FAULTY:
                    return <FaultyIEC60309 />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownIEC60309 />
                default: return <UnknownIEC60309 />
            }

        case TYPE_ENUM.Type_1:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableType1 />
                case STATUS_ENUM.BUSY:
                    return <BusyType1 />
                case STATUS_ENUM.FAULTY:
                    return <FaultyType1 />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownType1 />
                default: return <UnknownType1 />
            }
        case TYPE_ENUM.Type_2:
            switch (status) {
                case STATUS_ENUM.AVAILABLE:
                    return <AvailableType2 />
                case STATUS_ENUM.BUSY:
                    return <BusyType2 />
                case STATUS_ENUM.FAULTY:
                    return <FaultyType2 />
                case STATUS_ENUM.UNKNOWN:
                    return <UnknownType2 />
                default: return <UnknownType2 />
            }
        default:
            return <UnknownCCS />
    }
}