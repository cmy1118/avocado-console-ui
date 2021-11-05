import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import background from '../../images/bg-img-1@2x.png';
import {consoleManagement} from '../../icons/icons';

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
`;

const _Description = styled.div`
	letter-spacing: 0.15px;
	color: #ffffff;
	width: 378px;
	height: 48px;
	line-height: 1.71;
	margin: 28.4px 0 0;
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

const _Logo = styled.div`
	svg {
		width: 299.1px;
		height: 149.6px;
		g {
			width: 299.1px;
			height: 149.6px;
		}
	}
`;

const LoginLayout = ({children}) => {
	return (
		<_Container>
			<_HeaderContainer>
				<_Logo>{consoleManagement}</_Logo>
				<_Description>
					Manage your servers from your browser with a professional
					and feature-rich terminal and remote deskcop client.
				</_Description>
			</_HeaderContainer>
			{children}
			<_Footer>Copyright NETAMD Co.,Ltd. All rights reserved.</_Footer>
		</_Container>
	);
};

LoginLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default LoginLayout;
