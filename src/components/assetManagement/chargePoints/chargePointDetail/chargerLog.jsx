import React, { useEffect, useState } from 'react'
import { Box, Modal, Stack, Typography } from '@mui/material'
import { ReactComponent as ReloadIcon } from '../../../../assets/icons/reload.svg'
import StyledSearchField from '../../../../ui/styledSearchField'
import { FileDownloadOutlined } from '@mui/icons-material'
import StyledTable from '../../../../ui/styledTable'
import { chargerLogData } from '../../../../assets/json/chargepoints'
import LastSynced from '../../../../layout/LastSynced'
import StyledIconButton from '../../../../ui/stylediconButton'
import { useMachineLog } from '../../../../hooks/queries/useOcpp'
import { tableHeaderReplace } from '../../../../utils/tableHeaderReplace'
import { searchAndFilter } from '../../../../utils/search'
import RightDrawer from '../../../../ui/RightDrawer'
import Filter from './chargerLog/filter'
import { exportExcelData } from '../../../../utils/excelExport'
import Indicator from './indicator'
import StyledDivider from '../../../../ui/styledDivider'
import { ReactComponent as Close } from "../../../../assets/icons/close-circle.svg";
import { Controller, useForm } from 'react-hook-form'
import StyledInput from '../../../../ui/styledInput'
import CalendarInput from '../../../../ui/CalendarInput'
import StyledButton from '../../../../ui/styledButton'
import styled from "styled-components";


const tableHeader = [
    'Connector Id',
    'Time',
    'Command',
    'Payload Data',
    'Unique ID'
]


export default function ChargerLog({ CPID }) {
    const [logList, setLogList] = useState([])
    const [pageNo, setPageNo] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadFilter, setDownloadFilter] = useState(null);
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
        clearErrors,
      } = useForm();
      const onSubmit = async(data) => {
        setLoading(true);
        // prepare filter for download and trigger the download hook
        const dt = {
          startDate: data.startDate,
          endDate: data.endDate,
        };
        setDownloadFilter(dt);
        // when downloadFilter is set the download hook will be enabled and fetch data
      };
      
    
      const handleDateChangeInParent = (date) => {
        setValue("startDate", date); // Assuming you have 'expiryDate' in your form state
        clearErrors("startDate");
    
      };
      const startDate = watch("startDate", ""); // Watching the value for 'expiryDate'
    
    
      const handleEndDateChangeInParent = (date) => {
        setValue("endDate", date); // Assuming you have 'expiryDate' in your form state
        clearErrors("endDate");
    
      };
      const endDate = watch("endDate", ""); // Watching the value for 'expiryDate'
    

    const handleOpen = () => {
        setOpen(true);
      };
    
      // Function to close the modal
      const handleClose = () => {
        setOpen(false);
      };
    const filter = {
      pageNo,
      ...(searchQuery && { searchQuery }),
    };

    const { data: machineData = {}, refetch } = useMachineLog(CPID, filter, !!CPID);

    // derive list and totalCount from hook data
    const derivedLogList = machineData.result || [];
    const derivedTotalCount = machineData.totalCount || 0;

    useEffect(() => {
      setLogList(tableHeaderReplace(derivedLogList, ['connectorId', 'date', 'command', 'payload', 'uniqueId', 'source'], tableHeader));
      setTotalCount(derivedTotalCount);
    }, [derivedLogList, derivedTotalCount]);

    // Download-specific hook instance (enabled only when downloadFilter is set)
    const { data: downloadData = {}, refetch: refetchDownload } = useMachineLog(CPID, downloadFilter || {}, !!(CPID && downloadFilter));

    // watch downloadData and trigger export when available
    useEffect(() => {
      if (downloadFilter && downloadData && downloadData.status) {
        const updatedLog = tableHeaderReplace(downloadData.result, ['connectorId', 'date', 'command', 'payload', 'uniqueId', 'source'], tableHeader);
        exportExcelData(updatedLog, 'ChargerLog');
        handleClose();
        reset();
        setLoading(false);
        setDownloadFilter(null);
      }
    }, [downloadData]);

    // compatibility init used by Filter component to update pagination/search
    const init = (dt = { pageNo }) => {
      if (dt.pageNo !== undefined) setPageNo(dt.pageNo);
      if (dt.searchQuery !== undefined) setSearchQuery(dt.searchQuery);
    };

    const handleClick = () => {
      handleOpen();
    }

    return (
        <><LastSynced heading={'Charger logs'} reloadHandle={() => refetch()}>
            <StyledSearchField placeholder={'Search'} onChange={(e) => {
                setSearchQuery(e.target.value)
            }} />
            <RightDrawer>
                <Filter onSubmited={init}/>
            </RightDrawer>
            <StyledIconButton icon={<FileDownloadOutlined sx={{ color: 'secondary.contrastText',cursor:'pointer' }} />}
            onClick = {handleClick}
            />
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={modalStyle}>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            my={2}
          >
            <Typography
              sx={{
                color: "secondary.greytext",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Download Logs
            </Typography>
            <Close onClick={handleClose} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <Stack direction={"column"} spacing={2} sx={{ background: '' }}>
            <Label>Start date</Label>

            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}

                    iconright={
                      <CalendarInput
                        onDateChange={handleDateChangeInParent}
                      />}
                    placeholder={"mm/dd/yyyy"}
                    value={startDate}
                    readOnly

                  />
                  {errors.startDate && (
                    <span style={errorMessageStyle}>
                      {errors.startDate.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "StartDate is required" }}
            />
            <Label>End date</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}

                    iconright={
                      <CalendarInput
                        onDateChange={handleEndDateChangeInParent}
                      />}
                    placeholder={"mm/dd/yyyy"}
                    value={endDate}
                    readOnly

                  />
                  {errors.endDate && (
                    <span style={errorMessageStyle}>
                      {errors.endDate.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "endDate is required" }}
            />

            <Stack direction={"row"} spacing={1} sx={{ justifyContent: 'center' }}>
              <StyledButton width={150} variant="primary" type="submit">
                {loading ? 'Downloading...' : 'Download'}
              </StyledButton>
            </Stack>
          </Stack>
        </Box>
      </form>
      </Modal>
        </LastSynced>
            <Box sx={{ p: 3, overflow: 'scroll' }}>
                <StyledTable headers={tableHeader} setPageNo={setPageNo} totalCount={totalCount} data={logList} showActionCell={false} />
                <Indicator/>
            </Box>
        </>
    )
}

// Modal style
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto", // Adjust width to fit your content or screen
    bgcolor: "#27292F", // Dark background color
    boxShadow: 10,
    p: 4,
    color: "#fff", // White text for better visibility on dark background
    outline: "none", // Remove the focus ring
  };
  
  const errorMessageStyle = {
    color: "red",
    // margin: '1px 0',
  };

  export const FormContainer = styled.div`
  display: inline-flex;
  padding: 30px 20px;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  background: #1c1d22;
`;

export const Heading = styled.h1`
  color: var(--Grey, #b5b8c5);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
`;

export const Label = styled.label`
  color: var(--white, #f7f8fc);
  text-align: start;
  width: 100%;
  height: 16px;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
  text-transform: capitalize;
`;
