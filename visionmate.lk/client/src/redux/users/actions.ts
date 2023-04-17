/**
 * usage of AppThunk
 *
 * @author M.M.N.H. Fonseka
 * */

import {AppThunk} from "../store";
import {clearUser} from "./reducer";
import {getUser} from "./actionCreator";

// TODO: remove this file if no need extra functionality separation, ADDED FOR THUNK MIDDLEWARE UNDERSTANDING PURPOSES ONLY
export const fetchUser = ({id, signal}: { id: string, signal: AbortSignal }): AppThunk =>
    (dispatch, getState) => {
        console.log("fetchUser.AppThunk")
        dispatch(getUser({user_id: id, signal}))
    }

export const removeUser = (): AppThunk =>
    (dispatch, getState) => {
        console.log("removeUser.AppThunk")
        dispatch(clearUser());
    }