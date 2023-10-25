"use client"
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";

type InvoiceType = {
  id: number;
  reference: string;
  title: string;
  sender: string;
  recipient: string;
  items: InvoiceItem[];
  amount: number;
  date: string;
};

type InvoiceItem = {
  description: string;
  price: number;
};

export default function InvoiceTable({
  InvoicesQuery,
  searchQuery,
}: {
  InvoicesQuery: UseQueryResult<AxiosResponse<any, any>, unknown>;
  searchQuery: string;
}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom: 0,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    minWidth: "800px",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.secondary.main,
      border: 0,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="w-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
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
            {InvoicesQuery?.data?.data
              .filter((item: InvoiceType) => {
                const a = {
                  ...item,
                  title: item.title.toLowerCase(),
                  sender: item.sender.toLowerCase(),
                  date: item.date.toLowerCase(),
                  recipient: item.recipient.toLowerCase(),
                  reference: item.reference.toLowerCase(),
                  amount: item.amount.toString(),
                };

                return (
                  a.title.includes(searchQuery.toLowerCase()) ||
                  a.sender.includes(searchQuery.toLowerCase()) ||
                  a.date.includes(searchQuery.toLowerCase()) ||
                  a.recipient.includes(searchQuery.toLowerCase()) ||
                  a.reference.includes(searchQuery.toLowerCase()) ||
                  a.amount.includes(searchQuery.toLowerCase())
                );
              })
              .map((row: any) => (
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
