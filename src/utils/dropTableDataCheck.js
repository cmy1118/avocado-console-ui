import {tableKeys} from '../Constants/Table/keys';
import {alertMessages} from '../components/DialogBoxs/Alert/ConfirmDialogBox';

//drop table data 의 type 확인을 위한 객체
export const tableDropDataType = [
	{
		type: 'users',
		tablekeys: [
			'GROUP_ADD_USERS_INCLUDE',
			'GROUP_SUMMARY_TABS_USERS_INCLUDE',
		],
	},
	{
		type: 'groups',
		tablekeys: [
			'USER_ADD_GROUPS_INCLUDE',
			'USER_SUMMARY_TABS_GROUPS_INCLUDE',
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
			return alertMessages.maxNumberOfGroups;

		case tableKeys.users.summary.tabs.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		//사용자 생성
		case tableKeys.users.add.groups.exclude:
			return alertMessages.maxNumberOfGroups;

		case tableKeys.users.add.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		//그룹 상세
		case tableKeys.groups.summary.tabs.users.exclude:
			return alertMessages.maxNumberOfUsers;

		case tableKeys.groups.summary.tabs.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		//그룹 생성
		case tableKeys.groups.add.users.exclude:
			return alertMessages.maxNumberOfUsers;

		case tableKeys.groups.add.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		default:
			return true;
	}
};

export const isDropTypeLimited = (tableKey) => {
	//roles , groups
	switch (tableKey) {
		//사용자 상세
		case tableKeys.users.summary.tabs.groups.exclude:
			return alertMessages.singleCountGroupTypes;

		case tableKeys.users.summary.tabs.roles.exclude:
			return alertMessages.singleCountRolesTypes;

		//사용자 생성
		case tableKeys.users.add.groups.exclude:
			return alertMessages.singleCountGroupTypes;

		case tableKeys.users.add.roles.exclude:
			return alertMessages.singleCountRolesTypes;

		//그룹 상세
		case tableKeys.groups.summary.tabs.roles.exclude:
			return alertMessages.singleCountRolesTypes;

		//그룹 생성
		case tableKeys.groups.add.roles.exclude:
			return alertMessages.singleCountRolesTypes;
		default:
			return true;
	}
};
