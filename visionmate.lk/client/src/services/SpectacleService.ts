import axios from 'axios';
import Spectacle from "../models/Spectacle";
import {AppResponse, AxiosAppResponse} from '../types/service-types/response';
import {ApiUtils} from "../utils/api-utils";

export class SpectacleService {

    private static authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0Y2MyNDEzZjg3ZmRkYzVkMjIwOWJmIiwiaWF0IjoxNjgyODM1NjE4LCJleHAiOjE2ODI5MjIwMTh9.4APh0u7ZTpgJkGZaSnzDbZMoSfMRYRWdPjrHIubRAr0';

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllSpectacles(): Promise<AppResponse<Spectacle[]>> {
        const ep = ApiUtils.adminUrl('spectacles');
        const response = await axios.get<Partial<Spectacle>, AxiosAppResponse<Spectacle[]>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async getSpectacleById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl(`spectacles/${id}`);
        const response = await axios.get<Partial<Spectacle>, AxiosAppResponse<Spectacle>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async createSpectacle(data: Spectacle): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl('spectacles');

        const response = await axios.post<Partial<Spectacle>, AxiosAppResponse<any>>(ep, data, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async updateSpectacle(_id: string, data: Spectacle) {
        const ep = ApiUtils.adminUrl('spectacles/' + _id);
        const response = await axios.put<Partial<Spectacle>, AxiosAppResponse<any>>(ep, data, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }


    static async deleteSpectacle(_id: string) {
        const endpoint = ApiUtils.adminUrl(`spectacles/${_id}`);
        const response = await axios.delete(endpoint, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

}
