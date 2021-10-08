import {combineReducers} from '@reduxjs/toolkit';
import {CLIENT, clientReducer} from './api/IAM/Client/Client/client';
import IAM_USER from './api/IAM/User/User/user';
import {DIALOG_BOX, dialogBoxReducer} from './dialogBoxs';
import {REMOTE_RESOURCE, remoteResourceReducer} from './api/RRM/remoteResource';
import {GROUP_TYPE, groupTypeReducer} from './api/RRM/groupType';
import {SETTING, settingReducer} from './setting';
import {CURRENT_TARGET, currentTargetReducer} from './currentTarget';
import IAM_USER_GROUP_TYPE from './api/IAM/User/Group/groupType';
import IAM_USER_GROUP from './api/IAM/User/Group/group';
import IAM_USER_GROUP_MEMBER from './api/IAM/User/Group/groupMember';

const rootReducer = combineReducers({
	[SETTING]: settingReducer,
	[CLIENT]: clientReducer,

	/******************************************/
	/* seob : IAM - User reducers
    /******************************************/
	[IAM_USER.name]: IAM_USER.reducer,
	[IAM_USER_GROUP.name]: IAM_USER_GROUP.reducer,
	[IAM_USER_GROUP_TYPE.name]: IAM_USER_GROUP_TYPE.reducer,
	[IAM_USER_GROUP_MEMBER.name]: IAM_USER_GROUP_MEMBER.reducer,
	/******************************************/

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
