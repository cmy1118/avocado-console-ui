import React, {useCallback} from 'react';
import {HoverIconButton} from '../../styles/components/icons';
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
			<HoverIconButton>U</HoverIconButton>
			<div>jealos</div>
			<HoverIconButton>{notificationIcon}</HoverIconButton>
			<HoverIconButton>{settingIcon}</HoverIconButton>
			<HoverIconButton onClick={onClickCloseAside}>Q</HoverIconButton>
		</_Container>
	);
};

export default MenuButtons;
