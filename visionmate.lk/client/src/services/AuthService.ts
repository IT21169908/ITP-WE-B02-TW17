import axios from 'axios';
import IUser from "../models/User";
import { UserLoginData } from "../types/service-types/auth";
import { AppResponse, AxiosAppResponse } from "../types/service-types/response";
import { ApiUtils } from "../utils/api-utils";

const token = localStorage.getItem('token');

const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export class AuthService {

    public static async getOwnUser(): Promise<AppResponse<IUser>> {
        axios.interceptors.request.use(req => {
            req.headers.authorization = 'Bearer ' + localStorage.getItem('token');
            return req;
        });
        const ep = ApiUtils.authUrl('me');
        const res = await axios.get<void, AxiosAppResponse<IUser>>(ep);
        if (res.data.error) {
            //TODO read token from cookie and remove this implementation
            localStorage.removeItem("token");
        }
        return res.data;
    }

    public static async signInWithEmail(userLoginData: UserLoginData): Promise<AppResponse<string>> {
        const ep = ApiUtils.publicUrl('login');
        const res = await axios.post<UserLoginData, AxiosAppResponse<string>>(ep, userLoginData);
        if (res.data.success) {
            //TODO read token from cookie and remove this implementation
            localStorage.setItem("token", res.data.data);
        }
        return res.data;
    }

    public static async signUpWithEmail(userLoginData: UserLoginData): Promise<AppResponse<string>> {
        try {
            const ep = ApiUtils.publicUrl('register');
            const res = await axios.post<UserLoginData, AxiosAppResponse<string>>(ep, userLoginData);
            if (res.data.success) {
                localStorage.setItem("token", res.data.data);
            }
            return res.data;
        } catch (error: any) {
            if (error.response) {
                const errorData = error.response.data;
                console.error(`Request failed with status code ${error.response.status}: ${errorData.error}`);
                throw new Error(errorData.error);
            } else if (error.request) {
                console.error(`No response received: ${error.request}`);
                throw new Error('No response received');
            } else {
                console.error(`Error setting up request: ${error.message}`);
                throw new Error(error.message);
            }
        }
    }

    public static async updateUser(data: any): Promise<AppResponse<IUser>> {
        const ep = ApiUtils.authUrl('user/update');
        const res = await axios.post<IUser, AxiosAppResponse<IUser>>(ep, data);
        return res.data;
    }

    public static logout(): void {
        //TODO read token from cookie and remove this implementation
        localStorage.removeItem("token");
    }

    public static getToken(): string | null {
        //TODO read token from cookie and remove this implementation
        return localStorage.getItem("token");
    }

}
