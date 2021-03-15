import { combineReducers } from "redux";

import socket from "./user";

const rootReducer = combineReducers({
    user,
});

export default rootReducer;