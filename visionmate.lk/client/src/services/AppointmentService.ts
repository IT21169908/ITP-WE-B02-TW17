import axios from 'axios';
import IAppointment from "../models/Appointment";
import { Sample } from "../models/Sample";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class AppointmentService {

    private static authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0ZTE1NzEyNjcwMDkwYjlhOTVjZTZjIiwiaWF0IjoxNjgyODM4ODk3LCJleHAiOjE2ODI5MjUyOTd9.2_PcljOOpXnNGgDKsinDqRAKBMMJDkIRNWPWSvxH6qY';

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllAppointments(): Promise<AppResponse<IAppointment[]>> {
        const ep = ApiUtils.surgeonUrl('appointment/get-all');
        const res = await axios.get<Partial<Sample>, AxiosAppResponse<IAppointment[]>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async getAppointmentById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.surgeonUrl(`appointment/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async createAppointment(appointment: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.surgeonUrl('appointment/add');
        const res = await axios.post<Partial<Sample>, AxiosAppResponse<any>>(ep, appointment, this.config);
        return res.data;
    }

    static async updateAppointment(appointment: any) {
        const ep = ApiUtils.surgeonUrl('appointment/update');
        const res = await axios.put<Partial<Sample>, AxiosAppResponse<any>>(ep, appointment, this.config);
        return res.data;
    }

    static async deleteAppointment(appointmentId: string) {
        const ep = ApiUtils.surgeonUrl(`appointment/delete/${appointmentId}`);
        const response = await axios.delete(ep, this.config);
        return response.data;
    }


}
