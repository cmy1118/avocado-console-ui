import styled from 'styled-components';
import {NormalButton} from './buttons';

export const LogInContainer = styled.div`
	color: black;
	background: #fff;
	padding: 70px;
	border-radius: 16px;
	color: #212121;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
`;
export const LogInTitle = styled.div`
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 20px;
`;
export const LogInTitleSpan = styled.div`
	font-size: 14px;
	margin-bottom: 52px;
	a {
		color: #178082;
		text-decoration: underline;
	}
`;
export const LogInButton = styled(NormalButton)`
	width: 360px;
	height: 40px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: 0.15px;
`;
