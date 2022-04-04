import React from 'react';
import {HoverIconButton} from '../../styles/components/icons';
import {helpIcon, notificationIcon, settingIcon} from '../../icons/icons';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';

import AccountContextMenu from '../ContextMenu/AccountContextMenu';

const _Container = styled.div`
	align-items: center;
	display: flex;
`;

const _UserContainer = styled.div`
	display: flex;

	padding-right: 8px;
`;

const _UserId = styled.div`
	line-height: 1.54;
	letter-spacing: 0.25px;
	color: #d7d7d7;
	display: flex;
	font-size: 14px;
	padding-right: 8px;
	align-items: center;
`;

const _Settings = styled.div`
	background-color: #3f7e81;
	display: flex;
	padding-left: 8px;
`;
const _AccountContextMenu = styled(AccountContextMenu)`
	background: #3f7e81;
`;

const MenuButtons = () => {
	const {userAuth} = useSelector(AUTH.selector);

	// const onClickCloseAside = useCallback(() => {
	// 	document.querySelector('.aside-bar').classList.toggle('close');
	// }, []);

	return (
		<_Container>
			<_UserContainer>
				<AccountContextMenu />
				<_UserId>{userAuth?.user_id}</_UserId>
			</_UserContainer>
			<_Settings>
				<HoverIconButton size='sm' color={'rgba(255, 255, 255, 0.6)'}>
					{notificationIcon}
				</HoverIconButton>
				<HoverIconButton size='sm' color={'rgba(255, 255, 255, 0.6)'}>
					{settingIcon}
				</HoverIconButton>
				<HoverIconButton size='sm' color={'rgba(255, 255, 255, 0.6)'}>
					{helpIcon}
				</HoverIconButton>
			</_Settings>
		</_Container>
	);
};

export default MenuButtons;
