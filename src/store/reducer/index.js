import {combineReducers} from '@reduxjs/toolkit';
import {CLIENT, clientReducer} from './ClientManagement/client';

const rootReducer = combineReducers({
	[CLIENT]: clientReducer,
});

export default rootReducer;
