import React, {useCallback} from 'react';
import {HoverIconButton} from '../../styles/components/icons';
import {
	helpIcon,
	notificationIcon,
	settingIcon,
	userIcon,
} from '../../icons/icons';
import styled from 'styled-components';

const _Container = styled.div`
	display: flex;
	// align-items: center;
`;

const _userContainer = styled.div`
	display: flex;
	border-right: 1px #e3e5e5 solid;
	padding-right: 8px;
`;

const _userName = styled.div`
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
	// const onClickCloseAside = useCallback(() => {
	// 	document.querySelector('.aside-bar').classList.toggle('close');
	// }, []);

	return (
		<_Container>
			<_userContainer>
				<HoverIconButton>{userIcon}</HoverIconButton>
				<_userName>User Name</_userName>
			</_userContainer>
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
