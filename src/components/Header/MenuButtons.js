import React from 'react';
import {HoverIconButton} from '../../styles/components/icons';
import {helpIcon, notificationIcon, settingIcon} from '../../icons/icons';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import Auth from '../../reducers/api/Auth/auth';
import AccountContextMenu from '../ContextMenu/AccountContextMenu';

const _Container = styled.div`
	display: flex;
`;

const _UserContainer = styled.div`
	display: flex;
	border-right: 1px #e3e5e5 solid;
	padding-right: 8px;
`;

const _UserId = styled.div`
	display: flex;
	font-size: 14px;
	padding-right: 8px;
	align-items: center;
`;

const _Settings = styled.div`
	display: flex;
	padding-left: 8px;
`;

const MenuButtons = () => {
	const {user} = useSelector(Auth.selector);

	// const onClickCloseAside = useCallback(() => {
	// 	document.querySelector('.aside-bar').classList.toggle('close');
	// }, []);

	return (
		<_Container>
			<_UserContainer>
				<AccountContextMenu />
				<_UserId>{user?.user_id}</_UserId>
			</_UserContainer>
			<_Settings>
				<HoverIconButton>{notificationIcon}</HoverIconButton>
				<HoverIconButton>{settingIcon}</HoverIconButton>
				<HoverIconButton>{helpIcon}</HoverIconButton>
			</_Settings>
			{/*<HoverIconButton onClick={onClickCloseAside}>Q</HoverIconButton>*/}
		</_Container>
	);
};

export default MenuButtons;
