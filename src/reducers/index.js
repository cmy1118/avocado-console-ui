import {combineReducers} from '@reduxjs/toolkit';
import {CLIENT, clientReducer} from './ClientManagement/client';
import {USER, userReducer} from './UserManagement/user';
import {DIALOG_BOX, dialogBoxReducer} from './dialogBoxs';
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
import {GROUPS, groupsReducer} from './groups';
import {CURRENT_TARGET, currentTargetReducer} from './currentTarget';

const rootReducer = combineReducers({
	[SETTING]: settingReducer,
	[USERS]: usersReducer,
	[GROUPS]: groupsReducer,
	[CLIENT]: clientReducer,
	[USER]: userReducer,
	[REMOTE_RESOURCE]: remoteResourceReducer,
	[GROUP_TYPE]: groupTypeReducer,
	[DIALOG_BOX]: dialogBoxReducer,
	/******************************************/
	/* roberto : Table_update 선택기능추가
    /******************************************/
	[CURRENT_TARGET]: currentTargetReducer,
	/******************************************/
});

export default rootReducer;
