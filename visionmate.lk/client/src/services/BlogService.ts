import axios from 'axios';
import IBlog from "../models/Blog";
import { AppResponse, AxiosAppResponse } from '../types/service-types/response';
import { ApiUtils } from "../utils/api-utils";

export class BlogService {
    private static authToken = JSON.parse(localStorage.getItem('authToken') || '');

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllBlogs(): Promise<AppResponse<IBlog[]>> {
        const ep = ApiUtils.publicUrl('blog/get-all');
        const res = await axios.get<Partial<IBlog>, AxiosAppResponse<IBlog[]>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async getBlogById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.publicUrl(`blog/getById/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<any>>(ep, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async createBlog(blogPost: any): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl('blog/add');
        const res = await axios.post<Partial<IBlog>, AxiosAppResponse<any>>(ep, blogPost, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async updateBlog(blogPost: any) {
        const ep = ApiUtils.adminUrl('blog/update');
        const res = await axios.put<Partial<IBlog>, AxiosAppResponse<any>>(ep, blogPost, this.config);
        if (res.data.success) {
            return res.data;
        } else {
            throw Error("Request failed with status: " + res.status + " message: " + res.data.error);
        }
    }

    static async deleteBlog(blogPostId: string) {
        const ep = ApiUtils.adminUrl(`blog/delete/${blogPostId}`);
        const response = await axios.delete(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }
}
