import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const NavContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	transition: margin 0.5s ease-in-out;

	&.close {
		display: none;
		transform: translateX(-255px);
	}
`;

export const NavItemList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PathContainer = styled.div`
	display: flex;
`;

export const AsideContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	transition: margin 0.5s ease-in-out;
	&.close {
		display: none;
		transform: translateX(255px);
	}
`;

export const MainContainer = styled.div`
	flex: 1;
`;

export const AppBarContents = styled.div`
	box-sizing: border-box;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.31;
	letter-spacing: 0.3px;
	text-align: left;
	color: #212121;
	display: flex;
	justify-content: space-between;
	height: 54px;
	padding: 10px 16px;
`;

export const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const AppBarNavi = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 15px 16px 15px;
	height: 50px;
	border-bottom: 1px solid;
	border-color: #e3e5e5;
	background: #fffff;
`;
export const AppBarButtons = styled.div`
	display: flaex;
	// justify-content: space-between;
`;
