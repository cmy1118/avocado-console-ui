import {combineReducers} from '@reduxjs/toolkit';
import {CLIENT, clientReducer} from './ClientManagement/client';
import {USER, userReducer} from './UserManagement/user';
import {
	REMOTE_RESOURCE,
	remoteResourceReducer,
} from './RemoteResourceManagement/remoteResource';
import {
	GROUP_TYPE,
	groupTypeReducer,
} from './RemoteResourceManagement/groupType';

const rootReducer = combineReducers({
	[CLIENT]: clientReducer,
	[USER]: userReducer,
	[REMOTE_RESOURCE]: remoteResourceReducer,
	[GROUP_TYPE]: groupTypeReducer,
});

export default rootReducer;
