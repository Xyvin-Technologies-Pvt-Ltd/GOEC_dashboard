import { useState, useEffect } from "react";
import UserDetailsLayout from "./userDetails/userDetailLayout";
import UserChargingTransaction from "./userDetails/userChargingTransaction";
import UserFavourites from "./userDetails/userFavourites";
import UserAccountTransactiomn from "./userDetails/userAccountTransaction";
import AssignIDTags from "./userDetails/assignIDTags";
import UserINFO from "./userDetails/userINFO";
import UserTariff from "./userDetails/userTariff";
import VRDetails from "./userDetails/VRDetails";
import UserReview from "./userDetails/useReview";
import { useLocation, useParams } from "react-router-dom";
import { getUserByIdforAdmin } from "../../services/userApi";
import { getWalletTransactionForAdmin } from "../../services/transactionApi";

export default function UserDetails() {
  const [optionIndex, setOptionIndex] = useState(0);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const [isChange, setIsChange] = useState(false);

  const getData = () => {
    getUserByIdforAdmin(id).then((res) => {
      if (res.status) {
        console.log('res', res.result);
        setUserData(res.result);
      }
    });
  };

  useEffect(() => {
    getData();
  }, [id, isChange]);

  const onOptionChanged = (e) => {
    setOptionIndex(e.index);
  };
  return (
    <UserDetailsLayout onOptionChanged={onOptionChanged}>
      {optionIndex === 0 ? (
        <UserINFO userData={userData} onIsChange={setIsChange} isChange={isChange}/>
      ) : optionIndex === 1 ? (
        <UserAccountTransactiomn />
      ) : optionIndex === 2 ? (
        <UserChargingTransaction />
      ) : optionIndex === 3 ? (
        <UserFavourites />
      ) : optionIndex === 4 ? (
        <UserReview />
      ) : optionIndex === 5 ? (
        <UserTariff />
      ) : optionIndex === 6 ? (
        <AssignIDTags />
      ) : (
        <VRDetails />
      )}
    </UserDetailsLayout>
  );
}
