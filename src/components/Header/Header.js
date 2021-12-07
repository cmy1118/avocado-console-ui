import React, {useRef} from 'react';
import styled from 'styled-components';
import {avocadoLogo_white, searchIcon} from '../../icons/icons';
import {Icon} from '../../styles/components/icons';
import MenuButtons from './MenuButtons';
import TextBox from '../RecycleComponents/New/TextBox';
import Form from '../RecycleComponents/New/Form';
import {NavItem} from '../../styles/components/nav';
import {account} from '../../utils/auth';
import kt from '../../images/logo/kt.png';
import sk from '../../images/logo/sk.png';
import {useSelector} from 'react-redux';
import AUTH from '../../reducers/api/Auth/auth';

const _Container = styled.div`
	background: #3f7e81;
	display: flex;
	flex: 0 0 54px;
	justify-content: space-between;
	border-bottom: 1px #e3e5e5 solid;
	padding: 0px 16px;
	align-items: center;
	box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.2);
`;

const _Title = styled.div`
	display: flex;
`;

const _Logo = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-start;
`;

const _LogoImage = styled.img`
	height: 20px;
`;

const _LogoText = styled.span`
	display: inline-block;
	font-family: Roboto;
	font-size: 17px;
	font-weight: 540;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.18;
	letter-spacing: 1.4px;
	color: white;
	margin-left: 8px;
`;

const Header = () => {
	const ref = useRef(null);
	const {companyId} = useSelector(AUTH.selector);

	return (
		<_Container>
			<_Title>
				<NavItem to='/'>
					{companyId === account.KT.companyId ? (
						<_Logo>
							<_LogoImage src={kt} />
							<_LogoText>Console Management</_LogoText>
						</_Logo>
					) : companyId === account.SK.companyId ? (
						<_Logo>
							<_LogoImage src={sk} />
							<_LogoText>Console Management</_LogoText>
						</_Logo>
					) : (
						<_Logo>{avocadoLogo_white}</_Logo>
					)}
				</NavItem>
			</_Title>
			<Form
				onSubmit={(data) => console.log(data)}
				innerRef={ref}
				initialValues={{search: ''}}
			>
				<TextBox
					placeholder_text_color={'#D7D7D7'}
					border_color={'#0B6365'}
					placeholder={'제품 및 리소스 검색'}
					background={'#0B6365'}
					front={
						<Icon
							color={'#D7D7D7'}
							size={'sm'}
							margin_right={'0px'}
						>
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
