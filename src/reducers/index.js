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
import {SETTING, settingReducer} from './setting';
import {USERS, usersReducer} from './users';

const rootReducer = combineReducers({
	[SETTING]: settingReducer,
	[USERS]: usersReducer,
	[CLIENT]: clientReducer,
	[USER]: userReducer,
	[REMOTE_RESOURCE]: remoteResourceReducer,
	[GROUP_TYPE]: groupTypeReducer,
});

export default rootReducer;
