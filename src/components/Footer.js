import React from 'react';
import styled from 'styled-components';
import {searchIcon, zoomInIcon, zoomOutIcon} from '../icons/icons';
import {HoverIconButton} from '../styles/components/icons';

const _Footer = styled.footer`
	width: -webkit-fill-available;
	position: fixed;
	bottom: 0;
	height: 25px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	// background: '#dee1e6';
	background: #dee1e6;
	padding: 0px 16px;
	z-index: 99999999;

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
const _RightSideContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Footer = () => {
	return (
		<_Footer>
			<span>Copyright 2021. NETAND Inc. all rights reserved</span>
		</_Footer>
	);
};

export default Footer;
