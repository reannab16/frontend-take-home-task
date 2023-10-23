"use client"
import { Button } from "@mui/material";
import InvoiceTable from "./components/invoiceTable";
import SearchBar from "./components/searchBar"
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20 container gap-y-8">
      <div className="flex flex-row w-full items-center justify-between text-[var(--emeraldGreen)]">
        <div className="text-4xl font-semibold">Your Invoices</div>
        <div className="flex items-center justify-center w-auto gap-x-5 ">
          <SearchBar/>
          <Link href={`/create-invoice`} className="h-14 w-48 flex items-center justify-center text-[var(--background)] bg-[var(--emeraldGreen)] rounded-md text-base font-medium">
            Create Invoice
          </Link>
          
        </div>
      </div>
      
      <InvoiceTable/>
    </main>
  );
}
