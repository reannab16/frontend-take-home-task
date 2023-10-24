import axios from "axios";
import { FormType } from "./create-invoice/page";

const base = axios.create({
  baseURL: "http://localhost:8000/",
});

export const getInvoicesEndpoint = async () => {
    const response = await base.get(`/invoices`);
    console.log(response.data);
    return response;
  
};

export const postInvoiceEndpoint = async ({form}:{form:FormType}) => {
  try {
    const response = await base.post(`/invoices`, form);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
    
};
