import React, {useRef} from 'react';
import styled from 'styled-components';
import {avocadoLogo, searchIcon} from '../../icons/icons';
import {Icon} from '../../styles/components/icons';
import MenuButtons from './MenuButtons';
import TextBox from '../RecycleComponents/New/TextBox';
import Form from '../RecycleComponents/New/Form';
import {NavItem} from '../../styles/components/nav';

const _Container = styled.div`
	background: #fff;
	display: flex;
	flex: 0 0 54px;
	justify-content: space-between;
	border-bottom: 1px #e3e5e5 solid;
	padding: 0px 16px;
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
				<NavItem to='/'>
					<_Logo>{avocadoLogo}</_Logo>
				</NavItem>
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
