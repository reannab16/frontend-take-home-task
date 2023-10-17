# Invoice Server

This is a sample server for managing invoices with two endpoints.

## Setup

1. Navigate to the server directory.
2. Run the following commands to set up and start the server:

```shell
npm install     # Installs dependencies
npm run build   # Build the server
npm run dev     # Start the server
```

The server will run on localhost:8000

## Endpoints

There are two endpoints for invoices.

### GET /invoices

This endpoint is used to retrieve a list of invoices, an invoice has the following data structure:

```shell
id: number;
reference: string;
title: string;
sender: string;
recipient: string;
items: [
  {
    description: string;
    price: number;
  }
];
amount: number;
date: string;
```

### POST /invoices

This endpoint is used to create a new invoice, it has the following structure:

```shell
title: string;
sender: string;
recipient: string;
items: [
  {
    description: string;
    price: number;
  }
];
amount: number;
```

All the fields are required, (items can be an empty array but the field must be present). A title of an invoice must also be unique from an already exisiting invoice.
