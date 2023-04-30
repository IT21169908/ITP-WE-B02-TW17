import axios from 'axios';
import { Sample } from "../models/Sample";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class AppointmentService {

    static async getAllAppointments(): Promise<AppResponse<Sample[]>> {
        const ep = ApiUtils.surgeonUrl('appointment/get-all');
        const res = await axios.get<Partial<Sample>, AxiosAppResponse<Sample[]>>(ep);
        return res.data;
    }

    static async getAppointmentById(id: string): Promise<AppResponse<any>> {
        const ep = ApiUtils.surgeonUrl(`appointment/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep);
        return res.data;
    }

    static async createAppointment(appointment: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.surgeonUrl('appointment/add');
        const res = await axios.post<Partial<Sample>, AxiosAppResponse<any>>(ep, appointment);
        return res.data;
    }

    static async updateAppointment(appointment: any) {
        const ep = ApiUtils.surgeonUrl('appointment/update');
        const res = await axios.put<Partial<Sample>, AxiosAppResponse<any>>(ep, appointment);
        return res.data;
    }

    static async deleteAppointment(appointmentId: string) {
        const endpoint = ApiUtils.surgeonUrl(`appointment/delete/${appointmentId}`);
        const response = await axios.delete(endpoint);
        return response.data;
    }


}
