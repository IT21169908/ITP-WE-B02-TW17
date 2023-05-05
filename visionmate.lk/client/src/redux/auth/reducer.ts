import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import IUser from "../../models/User";
import {signIn, verifyUser} from "./actionCreator";
import {Role} from "../../enums/Role";

const initialState: {
    isLoading: boolean
    isLoggedIn: boolean
    user: IUser | null
} = {
    isLoading: true,
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            console.log("reducers.logOut");
            state.isLoading = false;
            state.isLoggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, action) => {
                console.log("extraReducer.getUser.pending")
                return {...state, ...initialState, isLoading: false};
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<IUser>) => {
                console.log("extraReducer.getUser.fulfilled")
                state.isLoading = false;
                state.isLoggedIn = true;
                state.user = action.payload

                // TODO: Find another way to handle redirect
                switch (action.payload?.role) {
                    case Role.ADMIN:
                        window.location.href = '/admin'
                        break;
                    case Role.PATIENT:
                        window.location.href = '/patient'
                        break;
                    case Role.SURGEON:
                        window.location.href = '/surgeon'
                        break;
                    case Role.DOCTOR:
                        window.location.href = '/doctor'
                        break;
                    default:
                        break;
                }

            })
            .addCase(signIn.rejected, (state, action) => {
                console.log("extraReducer.getUser.rejected")
                return {...state, ...initialState, isLoading: false};
            });
        builder
            .addCase(verifyUser.pending, (state, action) => {
                state.isLoading = true;
                console.log("extraReducer.getUser.pending")
            })
            .addCase(verifyUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                console.log("extraReducer.getUser.fulfilled")
                state.isLoading = false;
                state.isLoggedIn = true;
                state.user = action.payload
            })
            .addCase(verifyUser.rejected, (state, action) => {
                console.log("extraReducer.getUser.rejected")
                return {...state, ...initialState, isLoading: false};
            });
    }
})

export const {logOut} = authSlice.actions;

export default authSlice.reducer;
