import React, {useCallback} from 'react';
import styled from 'styled-components';
import {burgerMenuIcon} from '../icons/icons';
import {HoverButton} from '../styles/components/icons';

const _Container = styled.div`
	display: flex;
	justify-content: space-between;
	height: 54px;
`;

const _Title = styled.div`
	display: flex;
`;

const Header = () => {
	const onClickCloseNav = useCallback(() => {
		document.querySelector('.iam-nav-bar').classList.toggle('close');
	}, []);

	return (
		<_Container>
			<_Title>
				<HoverButton margin_right={'6px'} onClick={onClickCloseNav}>
					{burgerMenuIcon}
				</HoverButton>
				Avocado Console Management
			</_Title>
			<div>Search bar</div>
			<div>Icons</div>
		</_Container>
	);
};

export default Header;
