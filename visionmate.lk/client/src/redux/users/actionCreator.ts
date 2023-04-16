import UserModel from '../../models/user'
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getUser = createAsyncThunk<UserModel, string>(
    'fetch/user',
    async (user_id: string) => {
        // TODO: Move into Service
        console.log("createAsyncThunk.getUser")
        const response = await fetch(`http://localhost:5000/api/users/${user_id}`, {
            method: "GET",
        });
        const data: UserModel = await response.json();
        return data;
    });

