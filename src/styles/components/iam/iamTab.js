import styled from 'styled-components';

export const TabContainer = styled.div`
	display: flex;
	flex: ${(props) => props.isOpened && '1 1 auto'};
	flex-direction: column;
	transition: all 0.2s ease-out;
`;
export const TabContentSpace = styled.div`
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
`;
export const CoveredByTabContent = styled.div`
	overflow: scroll;
	flex: ${(props) => (props.isOpened ? '1' : '0')};
	transition: all 0.2s ease-out;
`;

export const TabContentContainer = styled.div`
	width: 100%;
`;
