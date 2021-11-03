import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const DetailContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;

	.tabBar {
		margin-bottom: 20px;
		position: inherit;
		z-index: 1;
	}
	.tabBar.fix {
		margin-left: 2px;
		margin-bottom: 0;
		position: fixed;
		bottom: 0;
		z-index: 75;
	}
`;

export const NavContainer = styled.div`
	border-right: 1px solid;
	border-color: #e3e5e5;

	display: flex;
	flex-direction: column;
	transform: translateX(1px);
	// transition: transform 0.5s ease-in-out;
	width: 255px;
	height: 100%;
	min-width: 255px;
	background: #ffffff;

	// &.close {
	// 	display: none;
	// 	transform: translateX(-255px);
	// }
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
	margin-bottom: 10px;
	border-bottom: 3px #e3e5e5 dotted;
	align-items: center;

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
