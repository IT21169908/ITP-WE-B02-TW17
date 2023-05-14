import {createAsyncThunk} from "@reduxjs/toolkit";
import { AntdNotification } from "../../components/notifications/Notification";
import IUser from "../../models/User";
import {ApiUtils} from "../../utils/api-utils";

export const signIn = createAsyncThunk<IUser, { email: string, password: string, signal: AbortSignal }>(
    'authenticate/user',
    async ({email, password, signal}) => {
        console.log("createAsyncThunk.authenticate.user")
        const response = await fetch(`${ApiUtils.publicUrl('login')}`, {
            method: "POST",
            signal,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', JSON.stringify(result.data.token));
            return result.data.user;
        } else {
            AntdNotification.error({
                message: 'Authentication Failed',
                description: result.message,
            });
            throw new Error(result.message);
        }
        // localStorage.setItem("authToken", JSON.stringify(result.data.token))
        // return result.data.user;
    });

export const signUp = createAsyncThunk<IUser, { name: string, email: string, password: string, confirmPassword: string, phone: string, role: number, signal: AbortSignal }>(
    'authenticate/register',
    async ({name, email, password, confirmPassword, phone, role, signal}) => {
        console.log("createAsyncThunk.authenticate.user")
        const response = await fetch(`${ApiUtils.publicUrl('register')}`, {
            method: "POST",
            signal,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password, confirmPassword, phone, role}),
        });
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', JSON.stringify(result.data.token));
            return result.data.user;
        } else {
            AntdNotification.error({
                message: 'Registration Failed',
                description: result.error,
            });
            throw new Error(result.message);
        }
        // localStorage.setItem("authToken", JSON.stringify(result.data.token));
        // return result.data.user;
    });

export const verifyUser = createAsyncThunk<IUser, { authToken: string, signal?: AbortSignal }>(
    'verifyUser/user',
    async ({authToken, signal}) => {
        console.log("createAsyncThunk.verifyUser")
        const response = await fetch(`${ApiUtils.authUrl('me')}`, {
            method: "GET",
            signal,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(authToken)
            },
        });
        const result = await response.json();
        return result.data;

    });
