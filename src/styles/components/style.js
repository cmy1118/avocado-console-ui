import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const AddContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;

export const AddInfo = styled.div`
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
`;

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
	width: fit-content;
	padding: 30px 16px 13px 16px;
	color: #178082;
	&:hover {
		color: ${(props) => props?.color || '#389193'};
		text-decoration: underline;
	}
`;

export const AddPageDialogBoxSubHeader = styled(SubHeader)`
	width: fit-content;
	padding: 30px 16px 13px 16px;
	color: black;
`;

export const DottedBorderSubHeader = styled(SubHeader)`
	border-bottom: 2px #e3e5e5 dotted;
`;

export const SubHeaderText = styled.div`
	display: flex;
	align-items: center;
	line-height: 20px;
`;

export const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const AppBarButtons = styled.div`
	display: flex;
`;

export const SummaryList = styled.ul`
	margin: 2px 17px 20px 0px;
`;

export const SummaryTablesContainer = styled.div`
	flex: 1;
	// overflow-y: scroll;
`;
export const InputDescriptionText = styled.span`
	color: #757575;
	margin: 0 10px;
	font-size: 12px;
	display: inline-flex;
	align-items: center;
`;
