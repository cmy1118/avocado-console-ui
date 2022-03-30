import {tableKeys} from '../Constants/Table/keys';
import {
	confirmAlertMessages,
	confirmAlertMessages as alertMessages,
} from './alertMessage';

//drop table data 의 type 확인을 위한 객체
export const tableDropDataType = [
	{
		type: 'users',
		tablekeys: [
			'GROUP_ADD_USERS_INCLUDE',
			'GROUP_ADD_USERS_EXCLUDE',
			'GROUP_SUMMARY_TABS_USERS_INCLUDE',
			'GROUP_SUMMARY_TABS_USERS_EXCLUDE',
			'ROLE_ADD_USER_INCLUDE',
			'ROLE_ADD_USER_EXCLUDE'
		],
	},
	{
		type: 'groups',
		tablekeys: [
			'USER_ADD_GROUPS_INCLUDE',
			'USER_SUMMARY_TABS_GROUPS_INCLUDE',
			'ROLE_ADD_GROUP_INCLUDE',
			'ROLE_ADD_GROUP_EXCLUDE',
		],
	},
	{
		type: 'roles',
		tablekeys: [
			'USER_ADD_ROLES_INCLUDE',
			'USER_SUMMARY_TABS_ROLES_INCLUDE',
			'GROUP_ADD_ROLES_INCLUDE',
			'GROUP_SUMMARY_TABS_ROLES_INCLUDE',

		],
	},

	{
		type:'policy',
		tablekeys:[
			'ROLE_ADD_POLICIES_INCLUDE'
		],
	},


];
export const CheckDropDataType = (tableKey) => {
	let type;
	tableDropDataType.map((v) => {
		v.tablekeys.includes(tableKey) ? (type = v.type) : true;
	});
	return type;
};

export const isDropDataMaxNumber = (tableKey) => {
	switch (tableKey) {
		//사용자 상세
		case tableKeys.users.summary.tabs.groups.exclude:
			return confirmAlertMessages.maxNumberOfGroups;

		case tableKeys.users.summary.tabs.roles.exclude:
			return confirmAlertMessages.maxNumberOfRoles;

		//사용자 생성
		case tableKeys.users.add.groups.exclude:
			return confirmAlertMessages.maxNumberOfGroups;

		case tableKeys.users.add.roles.exclude:
			return confirmAlertMessages.maxNumberOfRoles;

		//그룹 상세
		case tableKeys.groups.summary.tabs.users.exclude:
			return confirmAlertMessages.maxNumberOfUsers;

		case tableKeys.groups.summary.tabs.roles.exclude:
			return confirmAlertMessages.maxNumberOfRoles;

		//그룹 생성
		case tableKeys.groups.add.users.exclude:
			return confirmAlertMessages.maxNumberOfUsers;

		case tableKeys.groups.add.roles.exclude:
			return confirmAlertMessages.maxNumberOfRoles;

		default:
			return true;
	}
};

export const isDropTypeLimited = (tableKey) => {
	//roles , groups
	switch (tableKey) {
		//사용자 상세
		case tableKeys.users.summary.tabs.groups.exclude:
			return confirmAlertMessages.singleCountGroupTypes;
		case tableKeys.users.summary.tabs.roles.exclude:
			return confirmAlertMessages.singleCountRolesTypes;

		//사용자 생성
		case tableKeys.users.add.groups.exclude:
			return confirmAlertMessages.singleCountGroupTypes;
		case tableKeys.users.add.roles.exclude:
			return confirmAlertMessages.singleCountRolesTypes;

		//그룹 상세
		case tableKeys.groups.summary.tabs.roles.exclude:
			return confirmAlertMessages.singleCountRolesTypes;

		//그룹 생성
		case tableKeys.groups.add.roles.exclude:
			return confirmAlertMessages.singleCountRolesTypes;

		default:
			return true;
	}
};
