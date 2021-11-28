import React from 'react';
import {HoverIconButton} from '../../styles/components/icons';
import {helpIcon, notificationIcon, settingIcon} from '../../icons/icons';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import AUTH_USER from '../../reducers/api/Auth/authUser';
import AccountContextMenu from '../ContextMenu/AccountContextMenu';

const _Container = styled.div`
align-items: center;
	display: flex;
`;

const _UserContainer = styled.div`
	display: flex;
	// border-right: 1px #e3e5e5 solid;
	padding-right: 8px;
`;

const _UserId = styled.div`
  line-height: 1.54;
  letter-spacing: 0.25px;
	color:#D7D7D7;
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
background :#3f7e81;

`

const MenuButtons = () => {
	const {user} = useSelector(AUTH_USER.selector);

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
				<HoverIconButton color={'#D7D7D7'} >{notificationIcon}</HoverIconButton>
				<HoverIconButton color={'#D7D7D7'}>{settingIcon}</HoverIconButton>
				<HoverIconButton color={'#D7D7D7'}>{helpIcon}</HoverIconButton>
			</_Settings>
			{/*<HoverIconButton onClick={onClickCloseAside}>Q</HoverIconButton>*/}
		</_Container>
	);
};

export default MenuButtons;
