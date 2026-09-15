import styled from "styled-components";
import React, { useEffect, useState } from "react";
import StyledPagination from "./styledPagination";
import StyledStopButton from "./styledStopButton";
import StyledActionCell from "./styledActionCell";
import StyledStatusChip from "./styledStatusChip";
import StyledPayloadTableCell from "./styledPayloadTableCell";
import TableSkeleton from "./tableSkeleton";
import { Typography } from "@mui/material";
import { useRemoteStopTransaction } from "../hooks/mutations/useOcppMutation";
import { toast } from "react-toastify";
import moment from "moment";
// StyledTable component

const StyledTable = ({
  headers,
  data,
  onActionClick,
  showActionCell = true,
  actions = ["Edit", "View", "Delete"],
  setPageNo,
  totalCount,
}) => {
  const [page, setPage] = useState(0);
  const [firstopen, setFirstOpen] = useState(true);
  const [isChange, setIsChange] = useState(false);

  // TanStack Query mutation hook
  const { mutate: stopTransaction, isPending: isStopping } = useRemoteStopTransaction({
    onSuccess: () => {
      toast.success("Session terminated successfully");
      setIsChange(!isChange);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to terminate session");
      setIsChange(!isChange);
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      setFirstOpen(false);
    }
  }, [data, isChange]);

  setTimeout(() => {
    setFirstOpen(false);
  }, 5000);

  const rowsPerPage = 10;

  const pageCount =
    Math.ceil(totalCount / rowsPerPage) > 0 ? Math.ceil(totalCount / rowsPerPage) : 1;

  const handleChangePage = (newPage) => {
    setPage(newPage); // Assuming newPage is 1-indexed
    setPageNo(newPage + 1);
  };

  const handleStopClick = (session) => {
    const transactionId = session["OCPP Txn ID"] ? session["OCPP Txn ID"] : null;
    const payload = {
      transactionId: transactionId,
    };

    stopTransaction({ cpid: session.CPID, data: payload });
  };
  let prevHeader = null;

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {headers.map((header) => (
              <HeaderCell key={header}>{header}</HeaderCell>
            ))}
            {showActionCell && <HeaderCell></HeaderCell>}
          </tr>
        </TableHeader>

        <TableBody>
          {firstopen ? (
            <TableSkeleton tableHeader={headers} />
          ) : data.length === 0 ? (
            <TableCell colSpan={headers.length}>
              <Typography color={"#deb500"} sx={{ textAlign: "center" }}>
                No Data
              </Typography>
            </TableCell>
          ) : (
            data.map((row, rowIndex) => {
              const sourceData = row.source;
              return (
                <tr key={rowIndex}>
                  {headers.map((header, cellIndex) => {
                    const isStatusColumn = header.toLowerCase() === "status";
                    const isPayload = header.toLowerCase() === "payload data";
                    const isTerminateSession = header.toLowerCase() === "terminate session";
                    const isPublished = header.toLowerCase() === "published";
                    const isConnectionStatus = header.toLowerCase() === "connector status";
                    const isCommand = header.toLowerCase() === "command";
                    const isDateColumn =
                      header.toLowerCase() === "date" ||
                      header.toLowerCase() === "created on" ||
                      header.toLowerCase() === "last updated";
                    const command = prevHeader;
                    prevHeader = header;

                    return (
                      <TableCell
                        key={`${rowIndex}-${header}`}
                        $isfirstcolumn={cellIndex === 0}
                        $isMessage={header.toLowerCase() === "message"}
                        $sourceData={sourceData}
                        $isPayload={isPayload}
                        $isCommand={isCommand}
                        onClick={() => {
                          if (
                            showActionCell &&
                            cellIndex === 0 &&
                            actions.includes("View")
                          ) {
                            onActionClick({ action: "View", data: row });
                          }
                        }}
                      >
                        {/* Render cell content based on header */}
                        {isStatusColumn ? (
                          <StyledStatusChip $status={row[header]}>{row[header]}</StyledStatusChip>
                        ) : isTerminateSession ? (
                          <StyledStopButton onClick={() => handleStopClick(row)}>
                            Stop
                          </StyledStopButton>
                        ) : isPayload ? (
                          <StyledPayloadTableCell
                            value={row[header]}
                            command={row[command]}
                            sourceData={sourceData}
                          />
                        ) : isPublished || isConnectionStatus ? (
                          <StyledStatusChip $status={row[header]}>{row[header]}</StyledStatusChip>
                          // ) : isDateColumn ? (
                          //   moment(row[header]).format("DD-MM-YYYY")
                        ) : row[header] || row[header] === "" ? (
                          row[header]
                        ) : (
                          "_"
                        )}
                      </TableCell>
                    );
                  })}

                  {/* Render action cell if required */}
                  {showActionCell && (
                    <td>
                      <StyledActionCell
                        actions={actions}
                        id={row.id} // Assuming your row data has an 'id' property
                        onCliked={(e) => {
                          onActionClick && onActionClick({ data: row, ...e });
                        }}
                      />
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </TableBody>
      </Table>
      <StyledPagination page={page} pageCount={pageCount} onChange={handleChangePage} />
    </TableContainer>
  );
};

export default StyledTable;

//! STYLINGS

// Styled table container
export const TableContainer = styled.div`
  background: #121212; // Dark background for the table
  overflow-x: scroll; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
  margin: 16px 0; // Margin for spacing, adjust as needed
`;

// Styled table
export const Table = styled.table`
  width: 100%; // Full-width table
  border-collapse: collapse; // Collapses table borders
  color: #fff; // White text color
`;

// Styled table header
export const TableHeader = styled.thead`
  background: #1e1e1e; // Slightly lighter dark background for header
  text-align: left;
  padding: 10px 10px;
`;

// Styled table header cell
export const HeaderCell = styled.th`
  color: var(--greyish, #b5b8c5);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.2px;
  white-space: nowrap; // Prevent text wrapping
  overflow: hidden; // Hide overflowed content
  text-overflow: ellipsis; // Show ellipsis for overflowed content
  min-width: 100px; // Minimum width for each header cell, adjust as needed
  // Optionally, if using flexbox in your table:
  flex-grow: 1; // Allows the cell to grow to fit available space
  padding: 20px 90px 20px 10px;
  &::first-letter {
    text-transform: uppercase;
  }
`;

// Styled table body
export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #333; // Border color for row separation

    &:nth-child(even) {
      background: #242424; // Alternating row background
    }
  }
`;

// Styled table cell
export const TableCell = styled.td`
  padding: 16px; // Padding inside cells, adjust as needed
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  cursor: ${(props) => (props.$isfirstcolumn ? "pointer" : "default")};
  color: ${(props) =>
    props.$isfirstcolumn
      ? "#2D9CDB" // Blue text color for the first column
      : props.$isMessage
        ? "red" // Red text color for the "Message" column
        : props.$sourceData === "CMS"
          ? props.$isCommand || props.$isPayload
            ? "#EB5757" // Change color to red for isCommand and isPayload if sourceData is 'cms'
            : "rgba(181, 184, 197, 1)" // Default text color for other columns
          : props.$sourceData === "CP"
            ? props.$isCommand || props.$isPayload
              ? "#219653" // Change color to green for isCommand and isPayload if sourceData is 'cp'
              : "rgba(181, 184, 197, 1)" // Default text color for other columns
            : "rgba(181, 184, 197, 1)"}; // Default text color for other columns
`;
