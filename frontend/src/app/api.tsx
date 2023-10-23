import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:8000/",
});

export const getInvoicesEndpoint = async () => {
    const response = await base.get(`/invoices`);
    console.log(response.data);
    return response;
  
};

export const postInvoiceEndpoint = async () => {
    const response = await base.post(`/invoices`);
    console.log(response.data);
    return response;
};
