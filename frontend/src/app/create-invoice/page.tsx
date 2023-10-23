import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

export default function CreateInvoicePage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start pt-20 container gap-y-8">
      <Link
        href={`/`}
        className="flex items-center justify-center text-[var(--emeraldGreen)]"
      >
        <ArrowBackIosIcon className="text-base" />
        <div className="text-base">Back</div>
      </Link>
      <div className=" text-4xl font-semibold text-[var(--emeraldGreen)]">
        Create Invoice
      </div>
      <form className="flex flex-col items-start justify-start gap-y-5">
        <div>
          <div className="text-base">Invoice Title*</div>
          <input
            type="text"
            required
            className="rounded h-12 border-2 border-black w-64 pl-5"
          ></input>
        </div>
        <div className="flex items-center justify-start gap-x-5">
          <div>
            <div className="text-base">Sender*</div>
            <input
              type="text"
              required
              className="rounded h-12 border-2 border-black w-64 pl-5"
            ></input>
          </div>
          <div>
            <div className="text-base">Recipient*</div>
            <input
              type="text"
              required
              className="rounded h-12 border-2 border-black w-64 pl-5"
            ></input>
          </div>
        </div>
        <div className="text-lg text-[var(--emeraldGreen)] font-medium my-3">Add Items</div>
      </form>
    </main>
  );
}
