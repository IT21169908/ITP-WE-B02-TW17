import { createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "../../models/User";

export const getUser = createAsyncThunk<IUser, { user_id: string, signal: AbortSignal }>(
    'fetch/user',
    async ({user_id, signal}) => {
        // TODO: Move into Service
        console.log("createAsyncThunk.getUser")
        const response = await fetch(`http://localhost:5000/api/users/${user_id}`, {
            method: "GET",
            signal,
        });
        const data: IUser = await response.json();
        return data;
    });

