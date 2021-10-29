import React, {useCallback} from 'react';
import styled from 'styled-components';
import {burgerMenuIcon} from '../icons/icons';
import {HoverButton} from '../styles/components/icons';
import MenuButtons from './Header/MenuButtons';
import useInput from '../hooks/useInput';
import SearchInput from './RecycleComponents/SearchInput';

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
				<HoverButton margin_right={'6px'} onClick={onClickCloseNav}>
					{burgerMenuIcon}
				</HoverButton>
				Avocado Console Management
			</_Title>
			<SearchInput
				value={searchInput}
				onChange={onChangeSearchInput}
				placeholder='Search...'
			/>
			<MenuButtons />
		</_Container>
	);
};

export default Header;
