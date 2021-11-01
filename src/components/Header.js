import React, {useRef} from 'react';
import styled from 'styled-components';
import {avocadoLogo, searchIcon} from '../icons/icons';
import {Icon} from '../styles/components/icons';
import MenuButtons from './Header/MenuButtons';
import TextBox from './RecycleComponents/New/TextBox';
import Form from './RecycleComponents/New/Form';

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
	const ref = useRef(null);

	return (
		<_Container>
			<_Title>
				<_Logo>{avocadoLogo}</_Logo>
			</_Title>
			<Form
				onSubmit={(data) => console.log(data)}
				innerRef={ref}
				initialValues={{search: ''}}
			>
				<TextBox
					placeholder={'제품 및 리소스 검색'}
					background={'#f0f3f6'}
					front={
						<Icon size={'sm'} margin_right={'0px'}>
							{searchIcon}
						</Icon>
					}
					name={'search'}
				/>
			</Form>
			<MenuButtons />
		</_Container>
	);
};

export default Header;
