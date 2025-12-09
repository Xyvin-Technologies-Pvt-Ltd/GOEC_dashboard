import { Box, Dialog } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../../layout/LastSynced";
import StyledTable from "../../../../ui/styledTable";
import { RFIDData } from "../../../../assets/json/crm";
import AssignRFID from "./assignRFID";
import { Transition } from "../../../../utils/DialogAnimation";
import { useUserRfidList } from "../../../../hooks/queries/useUser";
import { useRemoveRfidTag } from "../../../../hooks/mutations/useUserMutation";
import { useParams } from "react-router-dom";
import { tableHeaderReplace } from "../../../../utils/tableHeaderReplace";
import { toast } from "react-toastify";


const tableHeader = [
  "RFID tag",
  "Created on",
  "Expires on",
  "Serial No",
  "Status",
];

export default function RFID() {

    const { id } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [open, setopen] = useState(false);

  const filters = { pageNo };
  const { data: rfidData } = useUserRfidList(id, filters);
  const removeRfidTagMutation = useRemoveRfidTag();

  const data = rfidData?.result || [];
  const totalCount = rfidData?.totalCount || 0;

  const tableActionClick = (e) => {
    const rfid = { "rfidTagId": e.data.id };
    removeRfidTagMutation.mutate(
      { id, data: rfid },
      {
        onSuccess: () => {
          toast.success("Unassigned successfully!");
        },
        onError: () => {
          toast.error("Some error occurred");
        },
      }
    );
  };

  const rfidTableData = tableHeaderReplace(data, ['rfidTag', 'createdOn', 'expiry', 'serialNumber', 'status'], tableHeader)

  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={open}
        onClose={() => {
          setopen(false);
        }}
        TransitionComponent={Transition}
      >
        <AssignRFID />
      </Dialog>
      <LastSynced
        heading={"Assigned RFID"}
        showButton={true}
        handleClick={() => {
          setopen(true);
        }}
      />
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <StyledTable
          headers={tableHeader}
          data={rfidTableData}
          setPageNo={setPageNo} 
          totalCount={totalCount}
          showActionCell={true}
          actions={["Unassign"]}
          onActionClick={tableActionClick}
        />
      </Box>
    </Box>
  );
}
