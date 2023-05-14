import axios from 'axios';
import User from "../models/User";
import {AppResponse, AxiosAppResponse} from '../types/service-types/response';
import {ApiUtils} from "../utils/api-utils";

export class UserService {

    private static authToken = JSON.parse(localStorage.getItem('authToken') || '');

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllUsers(): Promise<AppResponse<User[]>> {
        const ep = ApiUtils.adminUrl('users');
        const response = await axios.get<Partial<User>, AxiosAppResponse<User[]>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async getUserById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl(`users/${id}`);
        const response = await axios.get<Partial<User>, AxiosAppResponse<User>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }


    static async updateUser(_id: string, data: User) {
        const ep = ApiUtils.adminUrl('users/' + _id);
        const response = await axios.put<Partial<User>, AxiosAppResponse<any>>(ep, data, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }


    static async deleteUser(_id: string) {
        const endpoint = ApiUtils.adminUrl(`users/${_id}`);
        const response = await axios.delete(endpoint, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

}
