/**
 * Redux store root reducer
 *
 * @author M.M.N.H. Fonseka
 * */

import {combineReducers} from 'redux';
import LayoutChangeReducer from "./theme-layout/reducers";
import {userReducer} from "./users/reducer";

const rootReducer = combineReducers({
    ChangeLayoutMode: LayoutChangeReducer,
    users: userReducer,
});

export default rootReducer;
