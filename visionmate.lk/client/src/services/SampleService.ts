import axios from 'axios';
import { Sample } from "../models/Sample";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class SampleService {

    /*
     * TODO: Follow this sample file to make your services
     */

    static async getAllSamples(): Promise<AppResponse<Sample[]>> {
        const ep = ApiUtils.publicUrl('all-samples');
        const res = await axios.get<Partial<Sample>, AxiosAppResponse<Sample[]>>(ep);
        return res.data;
    }

    static async getSampleById(id: string): Promise<AppResponse<any>> {
        const ep = ApiUtils.authUrl(`sample/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep);
        return res.data;
    }

    static async createSample(sample: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.patientUrl('sample/add');
        const res = await axios.post<Partial<Sample>, AxiosAppResponse<any>>(ep, sample);
        return res.data;
    }

    static async updateSample(sample: any) {
        const ep = ApiUtils.patientUrl('sample/update');
        const res = await axios.post<Partial<Sample>, AxiosAppResponse<any>>(ep, sample);
        return res.data;
    }

}
