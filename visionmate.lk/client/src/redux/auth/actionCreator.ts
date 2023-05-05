import {createAsyncThunk} from "@reduxjs/toolkit";
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
        localStorage.setItem("authToken", JSON.stringify(result.data.token))
        return result.data.user;
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