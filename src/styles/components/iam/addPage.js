import styled from 'styled-components';
import {TitleBar} from './iam';

export const CreateSpaceContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;

export const IamSectionContents = styled.div`
	padding: 16px;
`;

export const IamTabSectionContents = styled.div`
	margin: 16px 0xp 0px 0px;
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
	color: #343f55;
	margin: 0 10px;
	font-size: 11px;
	display: inline-flex;
	line-height: 1.91;
	letter-spacing: -0.25px;
	align-items: center;
`;
