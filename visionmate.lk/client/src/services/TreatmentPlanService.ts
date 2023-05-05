import axios from 'axios';
import ITreatmentPlan from "../models/TreatmentPlan";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class TreatmentPlanService {

    private static authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0ZTRjOTgxNmUzZTg4YTgwNDc5Y2E0IiwiaWF0IjoxNjgzMjU5ODI3LCJleHAiOjE2ODMzNDYyMjd9.ZB38tEh26XiHlPs674ColHsFSkZHp7LM6p3VVCtA5_E';

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllTreatmentPlans(): Promise<AppResponse<ITreatmentPlan[]>> {
        const ep = ApiUtils.doctorUrl('treatment-plan/get-all');
        const res = await axios.get<Partial<ITreatmentPlan>, AxiosAppResponse<ITreatmentPlan[]>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async getTreatmentPlanById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.authUrl(`treatment-plan/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async createTreatmentPlan(treatmentPlan: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.doctorUrl('treatment-plan/add');
        const res = await axios.post<Partial<ITreatmentPlan>, AxiosAppResponse<any>>(ep, treatmentPlan, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async updateTreatmentPlan(treatmentPlan: any) {
        const ep = ApiUtils.doctorUrl('treatment-plan/update');
        const res = await axios.put<Partial<ITreatmentPlan>, AxiosAppResponse<any>>(ep, treatmentPlan, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async deleteTreatmentPlan(treatmentPlanId: string) {
        const ep = ApiUtils.doctorUrl(`treatment-plan/delete/${treatmentPlanId}`);
        const response = await axios.delete(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }
}
