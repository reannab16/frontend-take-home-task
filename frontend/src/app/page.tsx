"use client";
import InvoiceTable from "./components/invoiceTable";
import SearchBar from "./components/searchBar";
import Link from "next/link";
import { useQuery } from "react-query";
import { getInvoicesEndpoint } from "./api";
import LoadingSnackbar from "./components/loadingSnackbar";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery]= useState("")

  /**
   * gets array of all invoices
   */
  const invoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoicesEndpoint(),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-20 container gap-y-8  md:px-3 pl-7 sm:pl-3">
      {(invoicesQuery?.isRefetching || invoicesQuery?.isLoading) && <LoadingSnackbar />}

      {/* Desktop View */}
      <div className=" hidden md:flex flex-row w-full items-center justify-between text-[var(--emeraldGreen)]">
        <div className="text-4xl font-semibold flex flex-col">
          Your Invoices
        </div>
        <div className="flex items-center justify-center w-auto gap-x-5 ">
          <SearchBar setSearchQuery={setSearchQuery} />
          <Link
            href={`/create-invoice`}
            className="cursor-pointer h-12 w-48 flex items-center justify-center text-[var(--background)] bg-[var(--emeraldGreen)] rounded-md text-base font-medium"
          >
            Create Invoice
          </Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col w-full text-[var(--emeraldGreen)] pr-7 sm:pr-0 gap-y-5">
        <div className="flex justify-end items-start">
          <Link
            href={`/create-invoice`}
            className="cursor-pointer h-12 w-48 flex items-center justify-center text-[var(--background)] bg-[var(--emeraldGreen)] rounded-md text-base font-medium"
          >
            Create Invoice
          </Link>
        </div>
        <div className="flex flex-col items-start justify-start gap-y-3">
          <div className="text-3xl font-semibold flex flex-col">
            Your Invoices
          </div>
          <SearchBar setSearchQuery={setSearchQuery}/>
        </div>
      </div>

      <InvoiceTable InvoicesQuery={invoicesQuery} searchQuery={searchQuery} />
    </main>
  );
}
