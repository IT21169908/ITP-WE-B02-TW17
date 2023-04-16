import {AppThunk} from "../store";
import {clearUser} from "./reducer";
import {getUser} from "./actionCreator";

// TODO: remove this file if no need extra functionality separation, ADDED FOR THUNK MIDDLEWARE UNDERSTANDING PURPOSES ONLY
export const fetchUser = (id: string): AppThunk =>
    (dispatch, getState) => {
        console.log("fetchUser.AppThunk")
        dispatch(getUser(id))
    }

export const removeUser = (): AppThunk =>
    (dispatch, getState) => {
        console.log("removeUser.AppThunk")
        dispatch(clearUser());
    }