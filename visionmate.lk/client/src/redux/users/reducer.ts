/**
 * userSlice actions and reducers
 *
 * @author M.M.N.H. Fonseka
 * */

import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import UserModel from '../../models/user'
import {getUser} from "./actionCreator";

const initialState: UserModel = {
    _id: "",
    name: "",
    email: '',
    phone: '',
    createdAt: "",
    updatedAt: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserModel>) => {
            console.log("reducers.setUser")
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        clearUser: (state) => {
            console.log("reducers.clearUser")
            state._id = '';
            state.name = '';
            state.email = '';
            state.phone = '';
            state.createdAt = '';
            state.updatedAt = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                console.log("extraReducer.getUser.pending")
                return {...state, ...initialState};
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
                console.log("extraReducer.getUser.fulfilled")
                return {...state, ...action.payload};
            })
            .addCase(getUser.rejected, (state, action) => {
                console.log("extraReducer.getUser.rejected")
                return {...state, ...initialState};
            });
    }
})

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;