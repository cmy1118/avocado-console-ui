import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	height: 100%;
	flex-direction: column;
`;

export const DescriptionPageContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;

	.tabBar {
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
//APP BAR

export const SubHeader = styled.div`
	border: none;
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

export const SummaryPageSubHeader = styled(SubHeader)`
	padding: 30px 16px 13px 16px;
`;

export const DottedBorderSubHeader = styled(SubHeader)`
	border-bottom: 2px #e3e5e5 dotted;
`;

export const SubHeaderText = styled.div`
	display: flex;
	align-items: center;
`;

export const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const AppBarButtons = styled.div`
	display: flaex;
	// justify-content: space-between;
`;

export const DataSummaryList = styled.ul`
	margin: 2px 17px 16px 0px;
`;
