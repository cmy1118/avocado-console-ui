import {combineReducers} from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import createFilter from 'redux-persist-transform-filter';
import {persistReducer} from 'redux-persist';

import IAM_RULE_MANAGEMENT_TEMPLATE from './api/IAM/Policy/RuleManagement/template';

import IAM_USER from './api/IAM/User/User/user';
import IAM_USER_GROUP_TYPE from './api/IAM/User/Group/groupType';
import IAM_USER_GROUP from './api/IAM/User/Group/group';
import IAM_USER_GROUP_MEMBER from './api/IAM/User/Group/groupMember';
import IAM_CLIENT from './api/IAM/Client/client';

import PAGINATION from './pagination';
import SETTING from './setting';
import DIALOG_BOX from './dialogBoxs';
import CURRENT_TARGET from './currentTarget';
import RRM_RESOURCE from './api/RRM/Resource/resource';
import RRM_GROUP_TYPE from './api/RRM/Group/groupType';
import IAM_ROLES from './api/IAM/User/Role/roles';
import IAM_ROLES_GRANT_ROLE_GROUP from './api/IAM/User/Role/GrantRole/group';
import IAM_ROLES_GRANT_ROLE_USER from './api/IAM/User/Role/GrantRole/user';
import PAM_ROLES from './api/PAM/Role/roles';
import PAM_ROLE_SET from './api/PAM/Role/roleSet';
import PAM_ROLE_USER from './api/PAM/Role/user';
import PAM_ROLE_USER_GROUP from './api/PAM/Role/userGroup';
import IAM_USER_POLICY from './api/IAM/User/Policy/policy';
import IAM_USER_TAG from './api/IAM/User/Tag/tags';
import AUTH from './api/Auth/auth';
import IAM_GRANT_POLICY_BY_ROLE from './api/IAM/User/Policy/GrantPolicy/role';
import IAM_GRANT_POLICY_BY_USER from './api/IAM/User/Policy/GrantPolicy/user';
import IAM_POLICY_TEMPLATE from './api/IAM/User/Policy/policyTemplate';
import PAM_SESSION from './api/PAM/session';
import IAM_RULE_TEMPLATE_DETAIL from './api/IAM/Policy/RuleManagement/templateDetail';
import IAM_POLICY_MANAGEMENT_POLICIES from './api/IAM/Policy/PolicyManagement/policies';
import IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL from './api/IAM/Policy/ActionManagement/actionTemplateDetail';
import IAM_ACTION_MANAGEMENT_TEMPLATE from './api/IAM/Policy/ActionManagement/actionTemplate';

import IAM_POLICY_MANAGEMENT_RULE_TEMPLATE from './api/IAM/Policy/PolicyManagement/policyRuleTemplate';
import IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE from "./api/IAM/Policy/PolicyManagement/policyActionTemplate";

const authFilter = createFilter(AUTH.name, [
	'companyId',
	'userAuth',
	'isLoggedIn',
]);
const iamUserFilter = createFilter(IAM_USER.name, ['users']);
const iamRolesFilter = createFilter(IAM_ROLES.name, ['roles']);
const iamRolesGrantRoleUserFilter = createFilter(
	IAM_ROLES_GRANT_ROLE_USER.name,
	['roles'],
);
const iamRolesGrantRoleGroupFilter = createFilter(
	IAM_ROLES_GRANT_ROLE_GROUP.name,
	['roles'],
);
const iamGroupFilter = createFilter(IAM_USER_GROUP.name, ['groups']);
const iamGroupTypeFilter = createFilter(IAM_USER_GROUP_TYPE.name, [
	'groupTypes',
]);
const iamPolicyTypeFilter = createFilter(IAM_USER_POLICY.name, ['groupTypes']);

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: [
		AUTH.name,
		IAM_USER.name,
		IAM_USER_GROUP.name,
		IAM_USER_GROUP_TYPE.name,
		IAM_ROLES.name,
		IAM_ROLES_GRANT_ROLE_USER.name,
		IAM_ROLES_GRANT_ROLE_GROUP.name,
		IAM_USER_POLICY.name,
	],
	transforms: [
		authFilter,
		iamUserFilter,
		iamGroupFilter,
		iamGroupTypeFilter,
		iamRolesFilter,
		iamRolesGrantRoleUserFilter,
		iamRolesGrantRoleGroupFilter,
		iamPolicyTypeFilter,
	],
};

const rootReducer = combineReducers({
	[SETTING.name]: SETTING.reducer,
	[PAGINATION.name]: PAGINATION.reducer,
	[IAM_CLIENT.name]: IAM_CLIENT.reducer,
	[AUTH.name]: AUTH.reducer,
	/******************************************/
	/* ambacc244 : IAM - Action reducers
    /******************************************/
	[IAM_POLICY_MANAGEMENT_POLICIES.name]:
		IAM_POLICY_MANAGEMENT_POLICIES.reducer,
	[IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL.name]:
		IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL.reducer,
	[IAM_ACTION_MANAGEMENT_TEMPLATE.name]:
		IAM_ACTION_MANAGEMENT_TEMPLATE.reducer,
	[IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE.name]:
	IAM_POLICY_MANAGEMENT_ACTION_TEMPLATE.reducer,

	/******************************************/
	/* ambacc244 : IAM - Rule reducers
    /******************************************/
	[IAM_RULE_MANAGEMENT_TEMPLATE.name]: IAM_RULE_MANAGEMENT_TEMPLATE.reducer,
	[IAM_RULE_TEMPLATE_DETAIL.name]: IAM_RULE_TEMPLATE_DETAIL.reducer,
	[IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.name]:
		IAM_POLICY_MANAGEMENT_RULE_TEMPLATE.reducer,
	/******************************************/
	/******************************************/
	/* seob : IAM - User reducers
    /******************************************/
	[IAM_USER.name]: IAM_USER.reducer,
	[IAM_USER_GROUP.name]: IAM_USER_GROUP.reducer,
	[IAM_USER_GROUP_TYPE.name]: IAM_USER_GROUP_TYPE.reducer,
	[IAM_USER_GROUP_MEMBER.name]: IAM_USER_GROUP_MEMBER.reducer,
	[IAM_ROLES.name]: IAM_ROLES.reducer,
	[IAM_ROLES_GRANT_ROLE_USER.name]: IAM_ROLES_GRANT_ROLE_USER.reducer,
	[IAM_ROLES_GRANT_ROLE_GROUP.name]: IAM_ROLES_GRANT_ROLE_GROUP.reducer,
	[IAM_USER_POLICY.name]: IAM_USER_POLICY.reducer,
	[IAM_USER_TAG.name]: IAM_USER_TAG.reducer,
	[IAM_GRANT_POLICY_BY_ROLE.name]: IAM_GRANT_POLICY_BY_ROLE.reducer,
	[IAM_GRANT_POLICY_BY_USER.name]: IAM_GRANT_POLICY_BY_USER.reducer,
	[IAM_POLICY_TEMPLATE.name]: IAM_POLICY_TEMPLATE.reducer,
	/******************************************/

	/******************************************/
	/* seob : PAM reducers
    /******************************************/
	[PAM_ROLES.name]: PAM_ROLES.reducer,
	[PAM_ROLE_SET.name]: PAM_ROLE_SET.reducer,
	[PAM_ROLE_USER.name]: PAM_ROLE_USER.reducer,
	[PAM_ROLE_USER_GROUP.name]: PAM_ROLE_USER_GROUP.reducer,
	[PAM_SESSION.name]: PAM_SESSION.reducer,

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

export default persistReducer(persistConfig, rootReducer);
