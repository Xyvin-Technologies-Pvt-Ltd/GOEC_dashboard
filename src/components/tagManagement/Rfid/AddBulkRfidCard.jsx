import React, { useState } from "react";
import CommonLayout from "../../../layout/CommonLayout";
import { Grid, List, ListItem, Typography } from "@mui/material";
import StyledFooter from "../../../ui/StyledFooter";
import StyledButton from "../../../ui/styledButton";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow-down.svg";
import UploadFile from "../../../ui/UploadFile";
import ProgressBar from "../../../ui/ProgressBar";
import { useForm } from 'react-hook-form';
import { excelToJSONConvert, exportRFIDSampleFile } from "../../../utils/excelExport";
import { toast } from "react-toastify";
import XLSX from 'sheetjs-style';
import { useCreateManyRfid } from "../../../hooks/mutations/useRfidMutation";

const AddBulkRfidCard = ({ Close, Save }) => {

  const { register, handleSubmit, watch, setValue } = useForm();

  const selectedFile = watch('file'); // Watch the 'file' field

  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [selectedFileName, setselectedFileName] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [excelData, setExcelData] = useState([])

  // TanStack Query mutation hook
  const { mutate: createBulkRfid, isPending: isCreating } = useCreateManyRfid({
    onSuccess: () => {
      toast.success("RFID Added Successfully");
      Close();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to add RFID cards");
    },
  });

  const handleFileSelect = (file) => {
    var re = /(\.csv|\.xls|\.xlsx)$/i;
    if (!re.exec(file.name)) {
      toast.error("File not supported!");
      return
    }

    setselectedFileName(file.name)

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(json)
    };

    reader.onprogress = (data) => {
      if (data.lengthComputable) {
        var progress = parseInt(((data.loaded / data.total) * 100), 10);
        setUploadPercentage(progress)
        setButtonDisabled(false)
      }
    }
    reader.readAsBinaryString(file);
    // let i = 5;
    // const interval = setInterval(() => {
    //   i += 5
    //   if (i == 100) {
    //     clearInterval(interval)
    //   }
    //   setUploadPercentage(i);
    // }, 500);
  };

  const onSubmit = (data) => {
    if (excelData.length > 2) {
      // API call using mutation hook
      createBulkRfid({ data: excelData });
    } else if (excelData.length > 50) {
      toast.error("Datas exceeding Limit! please enter on 50 Data Maximum ")
    } else if (excelData.length < 2) {
      toast.error("Datas no exist! please enter atleast 2 data")
    }
  };

  const handleBrowseClick = () => {
    // trigger file input click
    document.getElementById('fileInput').click();
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonLayout header="Add bulk RFID Card" onClick={Close}>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ pr: 2, pl: 2, fontSize: "14px" }}
          >
            <Grid
              item
              xs={12}
              textAlign="left"
              display="flex"
              justifyContent="flex-start"
              sx={{ mb: 2 }}
            >
              <UploadFile onFileSelect={handleFileSelect} />
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                multiple={false}
                onChange={(e) => { handleFileSelect(e.target.files[0]); }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              textAlign="right"
              display="flex"
              justifyContent="flex-end"
            >
              <StyledButton variant="gray" width="180" mr="20" fontSize="10" type="button"
                onClick={handleBrowseClick}>
                Browse
              </StyledButton>
            </Grid>
            <Grid
              item
              xs={6}
              textAlign="left"
              display="flex"
              justifyContent="flex-start"
            >
              <StyledButton variant="gray" width="180" mr="20" type="button" fontSize="10" onClick={exportRFIDSampleFile}>
                <ArrowDown />
                Download Sample
              </StyledButton>
            </Grid>
            <Grid
              item
              xs={12}
              textAlign="left"
              display="flex"
              justifyContent="flex-start"
            >
              {selectedFileName && (
                <ProgressBar
                  UploadProgress={uploadPercentage}
                  filename={selectedFileName}
                  onClose={() => { setselectedFileName(); setButtonDisabled(true); setExcelData([]) }}
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              textAlign="left"
              display="flex"
              justifyContent="flex-start"
            >
              <Typography align="left" color={'secondary.contrastText'}>Instructions for bulk import:</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              textAlign="left"
              display="flex"
              justifyContent="flex-start"
            >
              <List
                sx={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}

              >
                <ListItem sx={{ display: "list-item", color: 'secondary.contrastText', fontSize: 12 }}>
                  RFID Field is mandatory.
                </ListItem>
                <ListItem sx={{ display: "list-item", color: 'secondary.contrastText' }}>
                  If any value is not present, then please use hyphen ("-") rather than leaving it blank.
                </ListItem>
                <ListItem sx={{ display: "list-item", color: 'secondary.contrastText' }}>
                  Don't remove headers.
                </ListItem>
                <ListItem sx={{ display: "list-item", color: 'secondary.contrastText' }}>
                  Maximum of 50 entries allowed at a time.
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CommonLayout>
        <StyledFooter width={100}>
          <StyledButton variant="secondary" width={'130'} style={{ height: '50px' }} mr="20" onClick={Close} type="button">
            Cancel
          </StyledButton>
          <StyledButton variant={buttonDisabled ? 'gray' : 'primary'} width={'150'} style={{ height: '50px', cursor: buttonDisabled ? 'no-drop' : 'pointer' }} type="submit" disabled={buttonDisabled} >
            Upload
          </StyledButton>
        </StyledFooter>
      </form>
    </>
  );
};

export default AddBulkRfidCard;
