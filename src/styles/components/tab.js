import styled from 'styled-components';

export const DescriptionPageContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;
export const TabContainer = styled.div`
	display: flex;
	flex: ${(props) => props.isOpened && '1 1 auto'};
	flex-direction: column;
`;

export const TabContents = styled.div`
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
`;

export const VisibleContent = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CoveredContent = styled.div`
	flex: 1;
	overflow: scroll;
	display: ${(props) => !props.isOpened && 'none'};
`;

export const TabContentContainer = styled.div`
	width: 100%;
`;

export const SummaryContainer = styled.div``;

export const ContentsContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
`;
