import styled from 'styled-components';
import {TitleBar} from './iam';

export const DescriptionPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
`;
export const SummaryTableTitle = styled(TitleBar)`
	width: fit-content;
	padding: 30px 16px 13px 16px;
	color: #178082;
	&:hover {
		color: ${(props) => props?.color || '#389193'};
		text-decoration: underline;
	}
`;
export const SummaryContainer = styled.div`
	padding: 16px;
	font-family: NotoSansCJKKR;
	font-size: 13px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.8;
	letter-spacing: -0.25px;
	color: #343f55;
`;

export const SummaryList = styled.div`
	padding: 0px 8px;
`;

export const SummaryText = styled.li``;

export const SummaryTablesContainer = styled.div`
	flex: 1;
`;
