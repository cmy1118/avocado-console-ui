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
export const SummaryList = styled.ul`
	margin: 0px 16px;
	padding-left: 24px;
	margin-bottom: ${(props) => (props.isOpened ? '40px' : '30px')};
`;
export const SummaryTablesContainer = styled.div`
	flex: 1;
`;
