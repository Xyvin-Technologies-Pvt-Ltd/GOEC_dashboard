import React from "react";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import StyledButton from "../../ui/styledButton";
import StyledSelectField from "../../ui/styledSelectField";
import StyledPagination from "../../ui/styledPagination";
import TableSkeleton from "../../ui/tableSkeleton";
import DashboardDataCard from "../../ui/dashboardDataCard";
import { Table, TableHeader, TableBody, TableCell, HeaderCell } from "../../ui/styledTable";
import { connectorLabel } from "../../utils/connectorLabel";

export const COLUMNS = [
  { header: "Transaction Id", field: "transactionId", sortKey: "transactionId" },
  { header: "Transaction Date", field: "transactionDate", sortKey: "transactionDate" },
  { header: "Name", field: "name", sortKey: "name" },
  { header: "Transaction Mode", field: "transactionMode", sortKey: "transactionMode" },
  { header: "Station", field: "station", sortKey: "station" },
  { header: "State", field: "state", sortKey: "state" },
  { header: "Charge Point", field: "chargePoint", sortKey: "chargePoint" },
  { header: "Connector Id", field: "connectorId", sortKey: "connectorId" },
  { header: "OCPP Start Time", field: "ocppStartTime", sortKey: "ocppStartTime" },
  { header: "OCPP Stop Time", field: "ocppStopTime", sortKey: "ocppStopTime" },
  { header: "Session Duration(hh:mm:ss)", field: "sessionDuration", sortKey: "sessionDuration" },
  { header: "Meter Start", field: "meterStart", sortKey: "meterStart" },
  { header: "Meter Stop", field: "meterStop", sortKey: "meterStop" },
  { header: "Units Consumed(kWh)", field: "unitsConsumed", sortKey: "unitsConsumed" },
  { header: "Tariff Rate", field: "tariffRate", sortKey: "tariffRate" },
  { header: "Tax Percentage", field: "taxPercentage", sortKey: "taxPercentage" },
  { header: "Tax Amount", field: "taxAmount", sortKey: "taxAmount" },
  { header: "Total Amount", field: "totalAmount", sortKey: "totalAmount" },
  { header: "Stop Reason", field: "stopReason", sortKey: "stopReason" },
  { header: "Closed By", field: "closedBy", sortKey: "closedBy" },
];

const PAGE_SIZE_OPTIONS = [
  { label: "10 / page", value: 10 },
  { label: "20 / page", value: 20 },
  { label: "50 / page", value: 50 },
  { label: "100 / page", value: 100 },
];

const cellValue = (value, field) => {
  if (value === undefined || value === null || value === "") return "-";
  if (field === "connectorId") return connectorLabel(value);
  return value;
};

export default function ReportViewResults({
  data,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  sortBy,
  sortOrder,
  onSortChange,
  page,
  limit,
  onPageChange,
  onLimitChange,
  onDownloadExcel,
  downloadLoading,
  stale,
}) {
  const rows = data?.result?.rows || [];
  const pagination = data?.result?.pagination;
  const summary = data?.result?.summary;
  const pageCount = pagination?.totalPages > 0 ? pagination.totalPages : 1;

  return (
    <ResultsContainer>
      {stale && !isLoading && (
        <StaleBanner>Filters changed — click View to refresh the results below.</StaleBanner>
      )}

      {summary && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <DashboardDataCard title="Total Sessions" value={summary.totalSessions ?? "-"} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <DashboardDataCard title="Total kWh" value={summary.totalKwh ?? "-"} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <DashboardDataCard title="Total Amount" value={summary.totalAmount ?? "-"} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <DashboardDataCard title="Total Tax" value={summary.totalTax ?? "-"} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <DashboardDataCard title="Avg Session Duration" value={summary.avgSessionDuration ?? "-"} />
          </Grid>
        </Grid>
      )}

      <ToolbarRow>
        <StyledButton
          type="button"
          variant="secondary"
          width={180}
          height={40}
          fontSize="13"
          disabled={downloadLoading || isLoading}
          onClick={onDownloadExcel}
        >
          {downloadLoading ? "Downloading..." : "Download Excel"}
        </StyledButton>

        <PageSizeWrap>
          <Typography sx={{ color: "#B5B8C5", fontSize: 12 }}>Rows per page</Typography>
          <StyledSelectField
            options={PAGE_SIZE_OPTIONS}
            value={limit}
            isSearchable={false}
            onChange={(opt) => onLimitChange(opt.value)}
          />
        </PageSizeWrap>
      </ToolbarRow>

      <ScrollArea>
        <Table>
          <TableHeader>
            <tr>
              {COLUMNS.map((col) => {
                const isActive = sortBy === col.sortKey;
                return (
                  <StickyHeaderCell key={col.field} onClick={() => onSortChange(col.sortKey)}>
                    <HeaderLabel>
                      {col.header}
                      {isActive ? (
                        sortOrder === "asc" ? (
                          <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                        ) : (
                          <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                        )
                      ) : (
                        <UnfoldMoreIcon sx={{ fontSize: 14, opacity: 0.4 }} />
                      )}
                    </HeaderLabel>
                  </StickyHeaderCell>
                );
              })}
            </tr>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton tableHeader={COLUMNS.map((c) => c.header)} />
            ) : isError ? (
              <tr>
                <TableCell colSpan={COLUMNS.length}>
                  <ErrorState>
                    <Typography sx={{ color: "#EB5757", textAlign: "center" }}>{errorMessage}</Typography>
                    {onRetry && (
                      <StyledButton type="button" variant="gray" width={120} height={36} fontSize="13" onClick={onRetry}>
                        Retry
                      </StyledButton>
                    )}
                  </ErrorState>
                </TableCell>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <TableCell colSpan={COLUMNS.length}>
                  <Typography sx={{ color: "#deb500", textAlign: "center" }}>
                    No data for the selected filters
                  </Typography>
                </TableCell>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr key={row.transactionId ?? rowIndex}>
                  {COLUMNS.map((col) => (
                    <TableCell key={col.field}>{cellValue(row[col.field], col.field)}</TableCell>
                  ))}
                </tr>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {!isError && rows.length > 0 && (
        <StyledPagination
          page={page - 1}
          pageCount={pageCount}
          onChange={(zeroIndexedPage) => onPageChange(zeroIndexedPage + 1)}
        />
      )}
    </ResultsContainer>
  );
}

const ResultsContainer = styled.div`
  margin: 20px 16px;
`;

const StaleBanner = styled.div`
  background: #39383d;
  color: #f7f8fc;
  border-radius: 4px;
  padding: 10px 16px;
  margin-bottom: 16px;
  font-family: Inter;
  font-size: 13px;
`;

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const PageSizeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
`;

const ScrollArea = styled.div`
  max-height: 600px;
  overflow: auto;
  border-radius: 8px;
  background: #121212;
`;

const StickyHeaderCell = styled(HeaderCell)`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #1e1e1e;
  cursor: pointer;
  user-select: none;
`;

const HeaderLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
`;
