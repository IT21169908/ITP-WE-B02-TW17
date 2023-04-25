import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import User from "../../models/User";
import {getUser} from "./actionCreator";

const initialState: User = {
    name: '',
    email: '',
    phone: '',
    role: 0,
    signedUpAs: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            console.log("reducers.setUser")
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.role = action.payload.role;
            state.signedUpAs = action.payload.signedUpAs;
        },
        clearUser: (state) => {
            console.log("reducers.clearUser");
            state.name = '';
            state.email = '';
            state.phone = '';
            state.role = 0;
            state.signedUpAs = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                console.log("extraReducer.getUser.pending")
                return {...state, ...initialState};
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
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
