import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { getInvoicesEndpoint } from "../api";

export default function InvoiceTable() {
  const InvoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoicesEndpoint(),
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.secondary.main,
      border: 0,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="w-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Reference</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Sender</StyledTableCell>
              <StyledTableCell>Recipient</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {InvoicesQuery?.data?.data.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.reference}
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.sender}</StyledTableCell>
                <StyledTableCell>{row.recipient}</StyledTableCell>
                <StyledTableCell>{row.amount}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
