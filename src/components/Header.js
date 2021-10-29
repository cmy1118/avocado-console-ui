import React, {useCallback} from 'react';
import styled from 'styled-components';
import {burgerMenuIcon} from '../icons/icons';
import {HoverIconButton} from '../styles/components/icons';
import MenuButtons from './Header/MenuButtons';
import useInput from '../hooks/useInput';

const _Container = styled.div`
	display: flex;
	justify-content: space-between;
	height: 54px;
`;

const _Title = styled.div`
	display: flex;
`;

const Header = () => {
	const [searchInput, onChangeSearchInput] = useInput('');

	const onClickCloseNav = useCallback(() => {
		document.querySelector('.iam-nav-bar').classList.toggle('close');
	}, []);

	return (
		<_Container>
			<_Title>
				<HoverIconButton margin_right={'6px'} onClick={onClickCloseNav}>
					{burgerMenuIcon}
				</HoverIconButton>
				Avocado Console Management
			</_Title>
			<input
				type={'search'}
				value={searchInput}
				onChange={onChangeSearchInput}
				placeholder='Search...'
			/>
			<MenuButtons />
		</_Container>
	);
};

export default Header;
