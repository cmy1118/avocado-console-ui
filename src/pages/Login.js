import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import AUTH_USER from '../reducers/api/Auth/authUser';
import {useHistory} from 'react-router-dom';
import {account} from '../utils/auth';
import LoginForm from '../components/Form/LoginForm';
import {consoleManagement} from '../icons/icons';
import styled from 'styled-components';
import background from '../images/backgound/bg-img-1@2x.png';

const _Container = styled.div`
	background-image: url(${background});
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

const Login = ({match}) => {
	const history = useHistory();
	const {user} = useSelector(AUTH_USER.selector);

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, [history, user]);

	// useEffect(() => {
	// 	if (
	// 		match.params.companyId !== account.KT.companyId &&
	// 		match.params.companyId !== account.SAMSUNG.companyId
	// 	) {
	// 		history.push('/404');
	// 	}
	// }, [history, match.params.companyId]);

	return (
		<_Container>
			<_HeaderContainer>
				<_LogoContainer>
					<_Logo>{consoleManagement}</_Logo>
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

Login.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			companyId: PropTypes.string,
		}),
	}),
};

export default Login;
