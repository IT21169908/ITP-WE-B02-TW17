import axios from 'axios';
import IAppointmentTransaction from "../models/AppointmentTransaction";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class TransactionService {

    private static authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ1NTQ1MjBiNmNjZmQzMWEyMjVjM2I2IiwiaWF0IjoxNjgzMzEzODExLCJleHAiOjE2ODM0MDAyMTF9.VRnabQrFTVLXQR7WwCmFhcjaefuxdDV0u-A5kbU4G7E';

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllTransactions(): Promise<AppResponse<IAppointmentTransaction[]>> {
        const ep = ApiUtils.authUrl('transaction/get-all');
        const res = await axios.get<Partial<IAppointmentTransaction>, AxiosAppResponse<IAppointmentTransaction[]>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async getTransactionById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.authUrl(`transaction/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async createTransaction(transaction: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.authUrl('transaction/add');
        const res = await axios.post<Partial<IAppointmentTransaction>, AxiosAppResponse<any>>(ep, transaction, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async updateTransaction(transaction: any) {
        const ep = ApiUtils.authUrl('transaction/update');
        const res = await axios.put<Partial<IAppointmentTransaction>, AxiosAppResponse<any>>(ep, transaction, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async deleteTransaction(transactionId: string) {
        const ep = ApiUtils.authUrl(`transaction/delete/${transactionId}`);
        const response = await axios.delete(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }
}
