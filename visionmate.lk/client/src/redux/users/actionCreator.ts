import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../models/User";

export const getUser = createAsyncThunk<User, { user_id: string, signal: AbortSignal }>(
    'fetch/user',
    async ({user_id, signal}) => {
        // TODO: Move into Service
        console.log("createAsyncThunk.getUser")
        const response = await fetch(`http://localhost:5000/api/users/${user_id}`, {
            method: "GET",
            signal,
        });
        const data: User = await response.json();
        return data;
    });

