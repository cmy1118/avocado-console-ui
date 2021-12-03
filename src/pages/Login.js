import React, {useEffect} from 'react';
import background_Kt from '../images/background/bg-img-1@2x.png';
import background_Sk from '../images/background/bg-img-2@2x.png';
import AUTH_USER from '../reducers/api/Auth/authUser';
import {useHistory} from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import {consoleManagement} from '../icons/icons';
import styled from 'styled-components';

import kt from '../images/logo/kt.png';
import sk from '../images/logo/sk.png';

import {useSelector} from 'react-redux';
import qs from 'qs';
import {account} from '../utils/auth';

const _Container = styled.div`
	background-image: ${(props) =>
		props.company === account.KT.companyId
			? `url(${background_Kt})`
			: `url(${background_Sk})`};
	object-fit: contain;
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const _HeaderContainer = styled.div`
	width: 50%;
	padding-left: 90px;
	padding-bottom: 250px;
`;

const _Description = styled.div`
	letter-spacing: 0.15px;
	color: #ffffff;
	width: 378px;
	height: 48px;
	line-height: 1.71;
	font-size: 14px;
`;

const _Footer = styled.div`
	width: 288px;
	height: 16px;
	color: #ffffff;
	position: fixed;
	bottom: 35px;
	left: 42px;
`;

const _LogoContainer = styled.div`
	position: absolute;
`;

const _Logo = styled.div`
	position: relative;
	right: 20px;
`;

const _LogoImage = styled.img`
	height: 190px;
`;

const Login = () => {
	const history = useHistory();
	const {isLoggedIn} = useSelector(AUTH_USER.selector);
	const URL = qs.parse(location).pathname;
	const companyId = URL?.substring(URL.lastIndexOf('/') + 1);

	useEffect(() => {
		if (isLoggedIn) {
			history.push('/');
		}
	}, [history, isLoggedIn]);

	return (
		<_Container company={companyId}>
			<_HeaderContainer>
				<_LogoContainer>
					{companyId === account.KT.companyId ? (
						<_LogoImage src={kt} />
					) : companyId === account.SK.companyId ? (
						<_LogoImage src={sk} />
					) : (
						<_Logo>{consoleManagement}</_Logo>
					)}
					<_Description>
						Manage your servers from your browser with a
						professional and feature-rich terminal and remote
						deskcop client.
					</_Description>
				</_LogoContainer>
			</_HeaderContainer>
			<LoginForm />
			<_Footer>Copyright NETAMD Co.,Ltd. All rights reserved.</_Footer>
		</_Container>
	);
};

// Login.propTypes = {
// 	match: PropTypes.shape({
// 		path: PropTypes.string.isRequired,
// 		params: PropTypes.shape({
// 			companyId: PropTypes.string,
// 		}),
// 	}),
// };

export default Login;
