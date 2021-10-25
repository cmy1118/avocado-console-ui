import DIALOG_BOX from '../reducers/dialogBoxs';
import {useDispatch} from 'react-redux';
import {keys} from '../Constants/Table/keys';
import {alertMessages} from '../components/DialogBoxs/Alert/ConfirmDialogBox';
// eslint-disable-next-line react-hooks/rules-of-hooks

export const isDropDataMaxNumber = (tableKey) => {
	switch (tableKey) {
		//사용자 상세
		case keys.users.summary.tabs.groups.exclude:
			return alertMessages.maxNumberOfGroups;

		case keys.users.summary.tabs.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		//사용자 생성
		case keys.users.add.groups.exclude:
			return alertMessages.maxNumberOfGroups;

		case keys.users.add.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		//그룹 상세
		case keys.groups.summary.tabs.users.exclude:
			return alertMessages.maxNumberOfUsers;

		case keys.groups.summary.tabs.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		//그룹 생성
		case keys.groups.add.users.exclude:
			return alertMessages.maxNumberOfUsers;

		case keys.groups.add.roles.exclude:
			return alertMessages.maxNumberOfRoles;

		default:
			return true;
	}
};

export const isDropTypeLimited = (tableKey) => {
	//roles , groups
	switch (tableKey) {
		//사용자 상세
		case keys.users.summary.tabs.groups.exclude:
			return alertMessages.singleCountGroupTypes;

		case keys.users.summary.tabs.roles.exclude:
			return alertMessages.singleCountRolesTypes;

		//사용자 생성
		case keys.users.add.groups.exclude:
			return alertMessages.singleCountGroupTypes;

		case keys.users.add.roles.exclude:
			return alertMessages.singleCountRolesTypes;

		//그룹 상세
		case keys.groups.summary.tabs.roles.exclude:
			return alertMessages.singleCountRolesTypes;

		//그룹 생성
		case keys.groups.add.roles.exclude:
			return alertMessages.singleCountRolesTypes;
		default:
			return true;
	}
};
