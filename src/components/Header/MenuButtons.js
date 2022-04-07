import React from 'react';
import {HoverIconButton, IconButton} from '../../styles/components/icons';
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
	display: flex;
	font-size: 13px;
	align-items: center;
	color: rgba(255, 255, 255, 0.87);
`;

const _Settings = styled.div`
	display: flex;
	padding-left: 8px;
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
				<IconButton
					size='sm'
					margin={'0px 4px 0px 16px'}
					color={'rgba(255, 255, 255, 0.6)'}
				>
					{notificationIcon}
				</IconButton>
				<IconButton
					size='sm'
					margin={'0px 4px'}
					color={'rgba(255, 255, 255, 0.6)'}
				>
					{settingIcon}
				</IconButton>
				<IconButton
					size='sm'
					margin={'0px 8px 0px 4px'}
					color={'rgba(255, 255, 255, 0.6)'}
				>
					{helpIcon}
				</IconButton>
			</_Settings>
		</_Container>
	);
};

export default MenuButtons;
