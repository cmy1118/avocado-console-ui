import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	background: #f0f3f6;
`;

export const IamContents = styled.div`
	padding: 16px 34px 16px 16px;
	background: #f0f3f6;
`;

export const IamSection = styled.div`
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 3.5px 5.5px 0 rgba(0, 0, 0, 0.02);
	border: solid 1px #e1e7eb;
`;

export const TitleBar = styled.div`
	border: none;
	align-items: center;
	box-sizing: border-box;
	font-size: 18px;
	font-weight: bold;
	line-height: 1.17;
	letter-spacing: -0.25px;
	text-align: left;
	color: #212121;
	display: flex;
	justify-content: space-between;
	height: 54px;
	padding: 9.5px 8px 11px 24px;
	background: #ffffff;
`;

export const TitleBarText = styled.div`
	display: flex;
	align-items: center;
	line-height: 20px;
`;
export const TitleBarButtons = styled.div`
	display: flex;
`;
