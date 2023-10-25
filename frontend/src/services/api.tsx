import axios from "axios";
import { FormType } from "../app/create-invoice/page";

const base = axios.create({
  baseURL: "http://localhost:8000/",
});

/**
 * 
 * @returns array of all invoices
 */
export const getInvoicesEndpoint = async () => {
    const response = await base.get(`/invoices`);
    console.log(response.data);
    return response;
  
};

/**
 * 
 * @param param0 inputted form data
 * @returns post request axios response
 */
export const postInvoiceEndpoint = async ({form}:{form:FormType}) => {
    const response = await base.post(`/invoices`, form);
    console.log(response.data);
    return response;
};
