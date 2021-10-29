import React, {useCallback} from 'react';
import styled from 'styled-components';
import {avocadoLogo, burgerMenuIcon} from '../icons/icons';
import {HoverIconButton} from '../styles/components/icons';
import MenuButtons from './Header/MenuButtons';
import useInput from '../hooks/useInput';

const _Container = styled.div`
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	height: 54px;
	border-bottom: 1px #e3e5e5 solid;
	padding: 16px 16px;
	align-items: center;
`;

const _Title = styled.div`
	display: flex;
`;

const _Logo = styled.div``;

const Header = () => {
	const [searchInput, onChangeSearchInput] = useInput('');

	return (
		<_Container>
			<_Title>
				<_Logo>{avocadoLogo}</_Logo>
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
