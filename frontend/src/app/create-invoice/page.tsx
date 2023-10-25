"use client";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { Button } from "@mui/material";
import ItemForm from "../components/itemForm";
import { getInvoicesEndpoint, postInvoiceEndpoint } from "../api";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  /**
   * gets the current list of endpoints, necessary on this page to later check if inputted invoice title has already been used
   */
  const invoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoicesEndpoint(),
  });

  const router = useRouter();

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

  /**
   *
   * @returns true if all required text fields have been filled, does not check if price of items is non zero as was not specified if this is a requirement
   */
  const isFormComplete = () => {
    return (
      form.title === "" ||
      form.sender === "" ||
      form.recipient === "" ||
      form.items.every((item) => item.description === "")
    );
  };

  /**
   * posts the form data, on success redirects to home page
   */
  const postInvoiceMutation = useMutation({
    mutationFn: async (updatedForm: FormType) =>
      await postInvoiceEndpoint({ form: updatedForm }),
    onSuccess: () => {
      toast.success("Invoice saved");
      router.push(`/`);
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.error}`);
      console.log(error);
    },
  });

  /**
   * creates a new item object
   */
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

  /**
   * Sets amount as the sum of all item prices, calls the post invoice mutation function to post the invoice data
   */
  const handleSubmit = async () => {
    const totalAmount = form.items.reduce((sum, item) => sum + +item.price, 0);

    setForm({
      ...form,
      amount: totalAmount,
    });

    const updatedForm = {
      ...form,
      amount: totalAmount,
    }; // using this as state doesn't update immediately

    postInvoiceMutation.mutateAsync(updatedForm);
  };

  /**
   * Sets the state of the form object to change the corresponding field to the inputted data
   *
   * @param e event from input field
   * @param fieldName name of input field
   */
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setForm({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  /**
   *
   * @returns true if an invoice already exists with the inputted title
   */
  const checkTitleExists = () => {
    invoicesQuery.data?.data.map((i: any) => {
      if (i.title === form.title) {
        return true;
      }
    });
    return false;
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start py-20 container gap-y-8 w-full md:px-3 px-7">
      <Link
        href={`/`}
        className="flex items-center justify-center text-[var(--emeraldGreen)]"
      >
        <ArrowBackIosIcon className="text-base" />
        <div className="text-base">Back</div>
      </Link>
      <div className=" md:text-4xl text-3xl font-semibold text-[var(--emeraldGreen)] -mt-4">
        Create Invoice
      </div>
      <form className="container w-full flex flex-col items-start justify-start gap-y-5">
        <div className="w-full flex flex-col ">
          <div className="text-base">Invoice Title*</div>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              handleOnChange(e, "title");
            }}
            required
            className="rounded h-12 border-2 border-black md:w-64 w-full pl-5"
          ></input>
          {checkTitleExists() === true && <div>Title already exists</div>}
        </div>
        <div className="flex md:flex-row flex-col md:items-start md:justify-start gap-x-5 md:gap-y-0 gap-y-5 w-full md:w-auto">
          <div className="w-full">
            <div className="text-base">Sender*</div>
            <input
              type="text"
              value={form.sender}
              onChange={(e) => handleOnChange(e, "sender")}
              required
              className="rounded h-12 border-2 border-black md:w-64 w-full pl-5"
            ></input>
          </div>
          <div>
            <div className="text-base">Recipient*</div>
            <input
              value={form.recipient}
              onChange={(e) => handleOnChange(e, "recipient")}
              type="text"
              required
              className="rounded h-12 border-2 border-black md:w-64 w-full pl-5"
            ></input>
          </div>
        </div>
        <div className="text-lg text-[var(--emeraldGreen)] font-medium mt-3">
          Add Items
        </div>
        {form.items.map((item, index) => (
          <ItemForm item={item} setForm={setForm} form={form} index={index} key={index} />
        ))}

        <Button
          onClick={handleAddFormItem}
          variant="outlined"
          sx={{
            height: "48px",
            width: "192px",
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
        <div className="w-full flex  items-center justify-end">
          <Button
            className="containedButton buttonFont"
            onClick={handleSubmit}
            variant="contained"
            disabled={isFormComplete()}
            sx={{
              fontWeight: 500,
            }}
          >
            Save Invoice
          </Button>
        </div>
      </form>
    </main>
  );
}
