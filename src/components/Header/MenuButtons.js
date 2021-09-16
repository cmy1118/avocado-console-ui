import React, {useCallback} from 'react';
import {HoverButton} from '../../styles/components/icons';
import {notificationIcon, settingIcon} from '../../icons/icons';
import styled from 'styled-components';

const _Container = styled.div`
	display: flex;
`;

const MenuButtons = () => {
	const onClickCloseAside = useCallback(() => {
		document.querySelector('.aside-bar').classList.toggle('close');
	}, []);

	return (
		<_Container>
			<HoverButton>U</HoverButton>
			<div>jealos</div>
			<HoverButton>{notificationIcon}</HoverButton>
			<HoverButton>{settingIcon}</HoverButton>
			<HoverButton onClick={onClickCloseAside}>Q</HoverButton>
		</_Container>
	);
};

export default MenuButtons;
