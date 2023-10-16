import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Invoice, InvoicePostSchema } from "./schemas";
import { v4 as uuid } from "uuid";
import cors from "cors";

const corsOptions = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

const app: Express = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
const invoices: Invoice[] = [
  {
    id: 1,
    reference: "INV-2020-0001",
    title: "Invoice 1",
    sender: "John Doe",
    recipient: "Jane Doe",
    amount: 100,
    date: "2020-01-01",
    items: [],
  },
];

app.get("/invoices", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).send(JSON.stringify(invoices));
  }, 5000);
});

app.post("/invoices", (req: Request, res: Response) => {
  const invoice = req.body;
  try {
    const validatedInvoice = InvoicePostSchema.parse(invoice);
    if (invoices.some((invoice) => invoice.title === validatedInvoice.title)) {
      res
        .status(400)
        .send(JSON.stringify({ error: "Invoice title already exists" }));
      return;
    }
    const newInvoice: Invoice = {
      id: invoices.length + 1,
      reference: uuid(),
      date: new Date().toISOString(),
      ...validatedInvoice,
    };
    invoices.push(newInvoice);
    res.status(201).send(JSON.stringify(invoices));
  } catch (err) {
    res.status(400).send(JSON.stringify({ error: "Invalid invoice" }));
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
