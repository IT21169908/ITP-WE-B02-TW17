import axios from 'axios';
import IAppointment from "../models/Appointment";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class AppointmentService {

    private static authToken = JSON.parse(localStorage.getItem('authToken') || '');

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllAppointments(): Promise<AppResponse<IAppointment[]>> {
        const ep = ApiUtils.authUrl('appointment/get-all');
        const res = await axios.get<Partial<IAppointment>, AxiosAppResponse<IAppointment[]>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async getAppointmentById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.authUrl(`appointment/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async createAppointment(appointment: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.patientUrl('appointment/add');
        const res = await axios.post<Partial<IAppointment>, AxiosAppResponse<any>>(ep, appointment, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async updateAppointment(appointment: any) {
        const ep = ApiUtils.patientUrl('appointment/update');
        const res = await axios.put<Partial<IAppointment>, AxiosAppResponse<any>>(ep, appointment, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async deleteAppointment(appointmentId: string) {
        const ep = ApiUtils.patientUrl(`appointment/delete/${appointmentId}`);
        const response = await axios.delete(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }


}
