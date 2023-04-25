import axios from 'axios';
import User from "../models/User";
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

    public static async getOwnUser(): Promise<AppResponse<User>> {
        axios.interceptors.request.use(req => {
            req.headers.authorization = 'Bearer ' + localStorage.getItem('token');
            return req;
        });
        const ep = ApiUtils.authUrl('me');
        const res = await axios.get<void, AxiosAppResponse<User>>(ep);
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
        const ep = ApiUtils.publicUrl('sign-up-with-email');
        const res = await axios.post<UserLoginData, AxiosAppResponse<string>>(ep, userLoginData);
        if (res.data.success) {
            //TODO read token from cookie and remove this implementation
            localStorage.setItem("token", res.data.data);
        }
        return res.data;
    }

    public static async updateUser(data: any): Promise<AppResponse<User>> {
        const ep = ApiUtils.authUrl('user/update');
        const res = await axios.post<User, AxiosAppResponse<User>>(ep, data);
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
