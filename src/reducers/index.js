import {combineReducers} from '@reduxjs/toolkit';
import IAM_USER from './api/IAM/User/User/user';
import IAM_USER_GROUP_TYPE from './api/IAM/User/Group/groupType';
import IAM_USER_GROUP from './api/IAM/User/Group/group';
import IAM_USER_GROUP_MEMBER from './api/IAM/User/Group/groupMember';
import IAM_CLIENT from './api/IAM/Client/Client/client';
import SETTING from './setting';
import DIALOG_BOX from './dialogBoxs';
import CURRENT_TARGET from './currentTarget';
import RRM_RESOURCE from './api/RRM/Resource/resource';
import RRM_GROUP_TYPE from './api/RRM/Group/groupType';
import IAM_ROLES from './api/IAM/User/Role/roles';

const rootReducer = combineReducers({
	[SETTING.name]: SETTING.reducer,
	[IAM_CLIENT.name]: IAM_CLIENT.reducer,

	/******************************************/
	/* seob : IAM - User reducers
    /******************************************/
	[IAM_USER.name]: IAM_USER.reducer,
	[IAM_USER_GROUP.name]: IAM_USER_GROUP.reducer,
	[IAM_USER_GROUP_TYPE.name]: IAM_USER_GROUP_TYPE.reducer,
	[IAM_USER_GROUP_MEMBER.name]: IAM_USER_GROUP_MEMBER.reducer,
	[IAM_ROLES.name]: IAM_ROLES.reducer,
	/******************************************/
	/******************************************/
	/* seob : RRM reducers
    /******************************************/
	[RRM_RESOURCE.name]: RRM_RESOURCE.reducer,
	[RRM_GROUP_TYPE.name]: RRM_GROUP_TYPE.reducer,
	/******************************************/
	/* roberto : Table_update 선택기능추가
    /******************************************/
	[CURRENT_TARGET.name]: CURRENT_TARGET.reducer,
	/******************************************/

	[DIALOG_BOX.name]: DIALOG_BOX.reducer,
});

export default rootReducer;
