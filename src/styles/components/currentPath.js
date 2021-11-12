import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const CurrentPathContainer = styled.div`
	display: flex;
	padding: 16px 15px;
	height: 50px;
	border-bottom: 1px solid;
	border-color: #e3e5e5;
	background: #fffff;
`;

export const PathLink = styled(NavLink)`
	font-size: 16px;
	font-style: normal;
	line-height: 1.31;
	letter-spacing: 0.1px;
	color: ${(props) => props?.color || '#212121'};
	text-decoration: none;
	align-items: center;
`;

export const AppBarLink = styled(PathLink)`
	color: #178082;
	&:hover {
		color: ${(props) => props?.color || '#389193'};
		text-decoration: underline;
	}
`;

export const NextPath = styled.div`
	margin: 0px 5px;
	align-items: center;
`;
