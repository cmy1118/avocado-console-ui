import styled from 'styled-components';
import {NavItem} from './nav';

export const CurrentPathBar = styled.div`
	display: flex;
	padding: 16px 15px;
	height: 50px;
	border-bottom: 1px solid;
	border-color: #e3e5e5;
	background: #fffff;
`;
export const CurrentPathBarLink = styled(NavItem)`
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
