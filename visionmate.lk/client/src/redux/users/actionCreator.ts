/**
 * user Async Thunk function for extra reducers
 *
 * @author M.M.N.H. Fonseka
 * */

import UserModel from '../../models/user'
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getUser = createAsyncThunk<UserModel, { user_id: string, signal: AbortSignal }>(
    'fetch/user',
    async ({user_id, signal}) => {
        // TODO: Move into Service
        console.log("createAsyncThunk.getUser")
        const response = await fetch(`http://localhost:5000/api/users/${user_id}`, {
            method: "GET",
            signal,
        });
        const data: UserModel = await response.json();
        return data;
    });

