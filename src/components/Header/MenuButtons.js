import React from 'react';
import {HoverIconButton} from '../../styles/components/icons';
import {helpIcon, notificationIcon, settingIcon} from '../../icons/icons';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import USER from '../../reducers/api/Auth/user';
import AccountContextMenu from '../ContextMenu/AccountContextMenu';

const _Container = styled.div`
	display: flex;
	// align-items: center;
`;

const _UserContainer = styled.div`
	display: flex;
	border-right: 1px #e3e5e5 solid;
	padding-right: 8px;
`;

const _UserName = styled.div`
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
	const {user} = useSelector(USER.selector);

	// const onClickCloseAside = useCallback(() => {
	// 	document.querySelector('.aside-bar').classList.toggle('close');
	// }, []);

	return (
		<_Container>
			<_UserContainer>
				<AccountContextMenu />
				<_UserName>{user?.user_id}</_UserName>
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
