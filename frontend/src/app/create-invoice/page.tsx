"use client";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { Button } from "@mui/material";
import ItemForm from "../components/itemForm";
import { getInvoicesEndpoint, postInvoiceEndpoint } from "../api";
import { useQuery } from "react-query";

export type FormItem = {
  description: string;
  price: number;
};

export type FormType = {
  id: number;
  reference: string;
  title: string;
  sender: string;
  recipient: string;
  items: FormItem[];
  amount: number;
  date: string;
};

export default function CreateInvoicePage() {
  const [numberItems, setNumberItems] = useState(0);
  const [form, setForm] = useState({
    id: 0,
    reference: "",
    title: "",
    sender: "",
    recipient: "",
    items: [
      {
        description: "",
        price: 0,
      },
    ],
    amount: 0,
    date: "",
  });

  const InvoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoicesEndpoint(),
  });

  const handleAddFormItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          description: "",
          price: 0,
        },
      ],
    });
  };

  const handleSubmit = async() => {
    const totalAmount = form.items.reduce((sum, item) => sum + (+item.price), 0);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() +1;
    const day = today.getDate();

    // const id = InvoicesQuery.data?.data.length +1; // id is a unique identifier for each invoice representing the order/position of the invoice in the sequence of all invoices created

    // const reference = `INV-${year}-00${id.toString().padStart(4, '0')}`; //reference shows the year in which the invoice was created and the invoices id, the id doesn't depend on how many invoices created in that year but total invoices (sufficient if small number of invoices but would need to be changed if large number invoices)


    setForm({
      ...form,
      amount: totalAmount,
      date: `${year}-${month}-${day}`,
      // id: id,
      // reference: reference,
    });
    

    const updatedForm = {
      ...form,
      amount: totalAmount,
      date: `${year}-${month}-${day}`,
      // id: id,
      // reference: reference,
      
    }; // using this as state doesn't update immediately


    await postInvoiceEndpoint({form: updatedForm});

    console.log(updatedForm);

    
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setForm({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start py-20 container gap-y-8 w-screen">
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
      <form className="container w-full flex flex-col items-start justify-start gap-y-5">
        <div>
          <div className="text-base">Invoice Title*</div>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleOnChange(e, "title")}
            required
            className="rounded h-12 border-2 border-black w-64 pl-5"
          ></input>
        </div>
        <div className="flex items-center justify-start gap-x-5">
          <div>
            <div className="text-base">Sender*</div>
            <input
              type="text"
              value={form.sender}
              onChange={(e) => handleOnChange(e, "sender")}
              required
              className="rounded h-12 border-2 border-black w-64 pl-5"
            ></input>
          </div>
          <div>
            <div className="text-base">Recipient*</div>
            <input
              value={form.recipient}
              onChange={(e) => handleOnChange(e, "recipient")}
              type="text"
              required
              className="rounded h-12 border-2 border-black w-64 pl-5"
            ></input>
          </div>
        </div>
        <div className="text-lg text-[var(--emeraldGreen)] font-medium mt-3">
          Add Items
        </div>
        {form.items.map((item, index) => (
          <ItemForm item={item} setForm={setForm} form={form} index={index} />
        ))}

        <Button
          onClick={handleAddFormItem}
          variant="outlined"
          sx={{
            height: "48px",
            border: "solid 2px",
            marginTop: "12px",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              border: "solid 2px",
            },
          }}
        >
          Add Another Item
        </Button>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          sx={{
            height: "48px",
            border: "solid 2px",
            marginTop: "12px",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              border: "solid 2px",
            },
          }}
        >
          Submit
        </Button>
      </form>
    </main>
  );
}
