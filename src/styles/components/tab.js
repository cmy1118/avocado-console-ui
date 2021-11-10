import styled from 'styled-components';

export const DescriptionPageContainer = styled.div`
	margin-top: 54px;
	height: calc(100% - 54px);
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;
export const TabContainer = styled.div`
	height: ${(props) => (props.isOpend ? props.height + 'px' : '50px')};
	z-index: 3;
	display: flex;
	flex-direction: column;
`;

export const TabContents = styled.div`
	padding: '10px 0px';
	flex: 1;
	overflow: scroll;
	display: flex;
`;

export const VisibleContent = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CoveredContent = styled.div`
	flex: 1;
	overflow: scroll;
`;

export const TabContentContainer = styled.div`
	width: 100%;
`;
