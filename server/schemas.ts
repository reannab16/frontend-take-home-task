import z from "zod";

export type Invoice = {
  id: number;
  reference: string;
  title: string;
  sender: string;
  recipient: string;
  items: InvoiceItem[];
  amount: number;
  date: string;
};

export type InvoiceItem = {
  description: string;
  price: number;
};

export const InvoicePostSchema = z.object({
  title: z.string().min(1),
  sender: z.string().min(1),
  recipient: z.string().min(1),
  amount: z.number(),
  items: z.array(
    z.object({
      description: z.string().min(1),
      price: z.number(),
    })
  ),
});
