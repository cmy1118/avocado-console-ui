import styled from 'styled-components';
import {TitleBar} from './iam';

export const AddSpaceContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;
export const AddPageContainer = styled.div`
	flex: 1 1 auto;
	height: 0;
	overflow: scroll;
	padding: 16px;
	backgounr-color: #f0f3f6;
`;
export const AddPageContent = styled.div`
	padding: 0px 16px 30px 16px;
`;
export const AddPageDialogBoxTitle = styled(TitleBar)`
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
