import styled from 'styled-components';
import {TitleBar} from './iam';

export const CreateSpaceContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;

export const CreatePageContainer = styled.div`
	padding: 16px;
`;

export const CreatePageContent = styled.div`
	padding: 0px;
`;

export const CreatePageDialogBoxTitle = styled(TitleBar)`
	width: fit-content;
	padding: 30px 16px 13px 16px;
	color: black;
`;

export const TextBoxDescription = styled.span`
	color: #757575;
	margin: 0 10px;
	font-size: 12px;
	display: inline-flex;
	align-items: center;
`;
