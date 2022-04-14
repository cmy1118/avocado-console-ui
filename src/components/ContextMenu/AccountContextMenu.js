import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';
import {accountCircleIcon} from '../../icons/icons';
import ContextMenu from '../RecycleComponents/ContextMenu';

const AccountContextMenu = () => {
	const dispatch = useDispatch();

	const menuOptions = [{value: 'logout', label: '로그아웃'}];

	const handleClick = useCallback(
		(value) => {
			value === 'logout' && dispatch(AUTH.asyncAction.logoutAction());
		},
		[dispatch],
	);

	return (
		<ContextMenu
			id={'AccountContextMenu'}
			header={accountCircleIcon}
			options={menuOptions}
			onClick={handleClick}
			width={100}
		/>
	);
};

export default AccountContextMenu;
