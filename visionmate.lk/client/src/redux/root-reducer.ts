/**
 * Redux store root reducer
 *
 * @author M.M.N.H. Fonseka
 * */

import {combineReducers} from 'redux';
import {userReducer} from "./users/reducer";

const rootReducer = combineReducers({
    users: userReducer,
});

export default rootReducer;