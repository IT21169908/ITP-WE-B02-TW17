/**
 * Redux store root reducer
 *
 * @author M.M.N.H. Fonseka
 * */

import {combineReducers} from 'redux';
import LayoutChangeReducer from "./theme-layout/reducers";
import userReducer from "./users/reducer";
import authReducer from "./auth/reducer";

const rootReducer = combineReducers({
    ChangeLayoutMode: LayoutChangeReducer,
    users: userReducer,
    auth: authReducer,
});

export default rootReducer;
