import React, { useMemo, useState } from "react";
import EmptyState from "@/components/common/EmptyState";
import StyledPagination from "./StyledPagination";
import StyledActionCell from "./StyledActionCell";
import StyledStatusChip from "./StyledStatusChip";
import StyledPayloadTableCell from "./StyledPayloadTableCell";
import TableSkeleton from "./TableSkeleton";
import RemoteSessionStopButton from "./RemoteSessionStopButton";
import {
  Table as UiTable,
  TableBody as UiTableBody,
  TableCell as UiTableCell,
  TableHead as UiTableHead,
  TableHeader as UiTableHeader,
  TableRow as UiTableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const StyledTable = ({
  headers,
  data,
  onActionClick,
  showActionCell = true,
  actions = ["Edit", "View", "Delete"],
  setPageNo,
  totalCount,
  isLoading = false,
  onRemoteStopSuccess,
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const pageCount =
    Math.ceil((totalCount || 1) / rowsPerPage) > 0
      ? Math.ceil((totalCount || 1) / rowsPerPage)
      : 1;

  const payloadMeta = useMemo(() => {
    const payloadIdx = headers.findIndex((h) => h.toLowerCase() === "payload data");
    const commandHeader = payloadIdx > 0 ? headers[payloadIdx - 1] : null;
    return { commandHeader };
  }, [headers]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    setPageNo?.(newPage + 1);
  };

  const showSkeleton = isLoading;
  const isEmpty = !data?.length;

  return (
    <div className="my-4 overflow-x-auto rounded-lg bg-[#121212]">
      <UiTable>
        <UiTableHeader>
          <UiTableRow className="border-border hover:bg-transparent">
            {headers.map((header) => (
              <UiTableHead
                key={header}
                className="whitespace-nowrap text-[#b5b8c5] first-letter:uppercase"
              >
                {header}
              </UiTableHead>
            ))}
            {showActionCell && <UiTableHead className="w-[52px]" />}
          </UiTableRow>
        </UiTableHeader>

        <UiTableBody>
          {showSkeleton ? (
            <TableSkeleton tableHeader={[...headers, ...(showActionCell ? [""] : [])]} />
          ) : isEmpty ? (
            <UiTableRow>
              <UiTableCell
                colSpan={headers.length + (showActionCell ? 1 : 0)}
                className="p-0"
              >
                <EmptyState
                  title="No data"
                  description="Try another page, search, or refresh."
                  className="py-8 text-muted-foreground"
                />
              </UiTableCell>
            </UiTableRow>
          ) : (
            data.map((row, rowIndex) => {
              const sourceData = row.source;
              const commandForPayload = payloadMeta.commandHeader
                ? row[payloadMeta.commandHeader]
                : null;
              return (
                <UiTableRow
                  key={rowIndex}
                  className="border-[#333] odd:bg-transparent even:bg-[#242424]"
                >
                  {headers.map((header, cellIndex) => {
                    const isStatusColumn = header.toLowerCase() === "status";
                    const isPayload = header.toLowerCase() === "payload data";
                    const isTerminateSession = header.toLowerCase() === "terminate session";
                    const isPublished = header.toLowerCase() === "published";
                    const isConnectionStatus = header.toLowerCase() === "connector status";
                    const isCommand = header.toLowerCase() === "command";

                    const cellTextClass = cn(
                      "font-sans text-xs leading-[150%]",
                      cellIndex === 0 && "cursor-pointer text-[#2D9CDB]",
                      header.toLowerCase() === "message" && "text-red-500",
                      sourceData === "CMS" &&
                        (isCommand || isPayload) &&
                        "text-[#EB5757]",
                      sourceData === "CP" && (isCommand || isPayload) && "text-[#219653]",
                      !cellIndex &&
                        !(
                          sourceData === "CMS" ||
                          sourceData === "CP" ||
                          header.toLowerCase() === "message"
                        ) &&
                        "text-[#b5b8c5]",
                      !cellIndex &&
                        (sourceData === "CMS" || sourceData === "CP") &&
                        !isCommand &&
                        !isPayload &&
                        "text-[#b5b8c5]",
                    );

                    return (
                      <UiTableCell
                        key={`${rowIndex}-${header}`}
                        className={cellTextClass}
                        onClick={() => {
                          if (showActionCell && cellIndex === 0 && actions.includes("View")) {
                            onActionClick?.({ action: "View", data: row });
                          }
                        }}
                      >
                        {isStatusColumn ? (
                          <StyledStatusChip $status={row[header]}>{row[header]}</StyledStatusChip>
                        ) : isTerminateSession ? (
                          <RemoteSessionStopButton
                            session={row}
                            onSuccess={onRemoteStopSuccess}
                          />
                        ) : isPayload ? (
                          <StyledPayloadTableCell
                            value={row[header]}
                            command={commandForPayload}
                            sourceData={sourceData}
                          />
                        ) : isPublished || isConnectionStatus ? (
                          <StyledStatusChip $status={row[header]}>{row[header]}</StyledStatusChip>
                        ) : row[header] || row[header] === "" ? (
                          row[header]
                        ) : (
                          "_"
                        )}
                      </UiTableCell>
                    );
                  })}

                  {showActionCell && (
                    <UiTableCell>
                      <StyledActionCell
                        actions={actions}
                        id={row.id}
                        onCliked={(e) => {
                          onActionClick?.({ data: row, ...e });
                        }}
                      />
                    </UiTableCell>
                  )}
                </UiTableRow>
              );
            })
          )}
        </UiTableBody>
      </UiTable>
      <StyledPagination page={page} pageCount={pageCount} onChange={handleChangePage} />
    </div>
  );
};

export default StyledTable;
