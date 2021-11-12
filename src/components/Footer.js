import React from 'react';
import styled from 'styled-components';

const _Footer = styled.footer`
	display: flex;
	flex: 0 0 25px;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	background: #dee1e6;
	padding: 0px 16px;

	font-family: Roboto;
	font-size: 10px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 2;
	letter-spacing: 0.25px;
	text-align: left;
	color: #212121;
`;

const Footer = () => {
	return (
		<_Footer>
			<span>Copyright 2021. NETAND Inc. all rights reserved</span>
		</_Footer>
	);
};

export default Footer;
