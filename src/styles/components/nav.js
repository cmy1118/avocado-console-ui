import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const NavContainer = styled.div`
	border-right: 1px solid;
	border-color: #e1e5eb;
	z-index: 5;
	display: flex;
	flex-direction: column;
	transform: translateX(1px);
	width: 256px;
	min-width: 256px;
	height: 100%;
	background: #ffffff;
	z-index: 75;
	box-shadow: 3.5px 0 7.5px 0 rgba(0, 0, 0, 0.06);
`;

export const NavItemList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const NavItem = styled(NavLink)`
	font-size: 16px;
	font-style: normal;
	line-height: 1.31;
	letter-spacing: 0.1px;
	color: ${(props) => (props?.selected ? '#e4f3f4' : '#212121')};
	text-decoration: none;
	align-items: center;
`;

export const NavItemTemp = styled.div`
	font-size: 16px;
	font-style: normal;
	line-height: 1.31;
	letter-spacing: 0.1px;
	color: ${(props) => props?.color || '#212121'};
	text-decoration: none;
	align-items: center;
`;
