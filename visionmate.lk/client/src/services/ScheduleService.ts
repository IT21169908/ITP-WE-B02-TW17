import axios from 'axios';
import Schedule from "../models/Schedule";
import {AppResponse, AxiosAppResponse} from '../types/service-types/response';
import {ApiUtils} from "../utils/api-utils";

export class ScheduleService {

    private static authToken = JSON.parse(localStorage.getItem('authToken') || '');

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllSchedules(): Promise<AppResponse<Schedule[]>> {
        const ep = ApiUtils.adminUrl('schedule/get-all');
        const res = await axios.get<Partial<Schedule>, AxiosAppResponse<Schedule[]>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async getScheduleById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl(`schedule/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async createSchedule(schedule: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl('schedule/add');
        const res = await axios.post<Partial<Schedule>, AxiosAppResponse<any>>(ep, schedule, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async updateSchedule(schedule: any) {
        const ep = ApiUtils.adminUrl('schedule/update');
        const res = await axios.put<Partial<Schedule>, AxiosAppResponse<any>>(ep, schedule, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async deleteSchedule(scheduleId: string) {
        const ep = ApiUtils.adminUrl(`schedule/delete/${scheduleId}`);
        const response = await axios.delete(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }
}
