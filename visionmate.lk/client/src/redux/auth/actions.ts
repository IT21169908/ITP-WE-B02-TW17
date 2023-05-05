import {AppThunk} from "../store";
import {logOut} from "./reducer";
import {verifyUser} from "./actionCreator";

export const signOut = (): AppThunk => (dispatch, getState) => {
    console.log("signOut.AppThunk")
    localStorage.removeItem("authToken")
    dispatch(logOut());
}

export const authorization = ({signal}: {
    signal?: AbortSignal
}): AppThunk => (dispatch, getState) => {
    console.log("authorization.AppThunk")
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
        dispatch(verifyUser({authToken, signal}));
    } else {
        dispatch(signOut())
    }
}
