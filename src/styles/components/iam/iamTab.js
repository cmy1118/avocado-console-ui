import styled from 'styled-components';

export const TabContainer = styled.div`
	display: flex;
	flex: ${(props) => props.isOpened && '1 1 auto'};
	flex-direction: column;
`;
export const TabContentSpace = styled.div`
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
`;
export const CoveredByTabContent = styled.div`
	flex: 1;
	overflow: scroll;
	display: ${(props) => !props.isOpened && 'none'};
`;

export const TabContentContainer = styled.div`
	width: 100%;
`;
