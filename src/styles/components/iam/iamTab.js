import styled from 'styled-components';

export const TabContainer = styled.div`
	display: flex;
	flex: ${(props) => props.isOpened && '1 1 auto'};
	flex-direction: column;
	transition: all 0.2s ease-out;
`;
export const TabContentSpace = styled.div`
	flex: 1 1 auto;
	// height: 0;
	overflow: scroll;
	height: 100%;
	background: #ffffff;
	border-radius: 0px 4px 4px 4px;
`;
export const TempTabContents = styled.div`
	height: 72px;
	padding: 25px;
	display: flex;
	align-items: center;
	text-align: center;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
export const CoveredByTabContent = styled.div`
	overflow: scroll;
	flex: ${(props) => (props.isOpened ? '1' : '0')};
	transition: all 0.2s ease-out;
`;

export const TabContentContainer = styled.div`
	width: 100%;
	padding: 16px 24px 24px 24px;
`;
