import React, { SetStateAction } from "react";
import { FormItem, FormType } from "../create-invoice/page";

export default function ItemForm({
  item,
  setForm,
  form,
  index,
}: {
  item: FormItem;
  setForm: React.Dispatch<SetStateAction<FormType>>;
  form: FormType;
  index: number;
}) {
  const handleOnDescriptChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      items: [
        ...form.items.slice(0, index),
        {
            ...form.items[index],
            description: e.target.value,

        },
        ...form.items.slice(index+1)
      ]
    });
  };

  const handleOnPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      items: [
        ...form.items.slice(0, index),
        {
            ...form.items[index],
            price: parseFloat(e.target.value),

        },
        ...form.items.slice(index+1)
      ]
    });
  }

  return (
    <div className="flex items-center justify-start gap-x-5 w-full">
      <div>
        <div className="text-base">Item Name*</div>
        <input
          type="text"
          value={item.description}
          onChange={(e)=>handleOnDescriptChange(e)}
          required
          className="rounded h-12 border-2 border-black w-64 pl-5"
        ></input>
      </div>
      <div>
        <div className="text-base">Price*</div>
        <input
          type="number"
          value={item.price}
          onChange={(e)=>handleOnPriceChange(e)}
          required
          className="rounded h-12 border-2 border-black w-64 pl-5"
        ></input>
      </div>
      <div className="w-full">
        <div className="text-base">Description*</div>
        <input
          type="text"
          required
          className="rounded h-12 border-2 border-black w-full pl-5"
        ></input>
      </div>
    </div>
  );
}
