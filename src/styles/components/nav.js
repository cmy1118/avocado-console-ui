import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const NavContainer = styled.div`
	border-right: 1px solid;
	border-color: #e3e5e5;
	z-index: 5;
	display: flex;
	flex-direction: column;
	transform: translateX(1px);
	// transition: transform 0.5s ease-in-out;
	width: 255px;
	height: 100%;
	min-width: 255px;
	background: #ffffff;
	z-index: 75;

	// &.close {
	// 	display: none;
	// 	transform: translateX(-255px);
	// }
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
	color: ${(props) => props?.color || '#212121'};
	text-decoration: none;
	align-items: center;
`;
