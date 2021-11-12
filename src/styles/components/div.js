import styled from 'styled-components';

export const PositionRelativeDiv = styled.div`
	position: relative;
`;

export const RowDiv = styled.div`
	display: flex;
	width: ${(props) => props.width};
	height: ${(props) => props.height || 'initial'};
	margin: ${(props) => props.margin || '0px'};
	padding: ${(props) => props.padding || '0px'};
	align-items: ${(props) => props.alignItems || 'initial'};
	justify-content: ${(props) => props.justifyContent || 'initial'};
`;

//임시
export const DnDDiv = styled.div`
	display: flex;
	width: ${(props) => props.width};
	height: ${(props) => props.height || 'initial'};
	margin: ${(props) => props.margin || '0px'};
	padding: ${(props) => props.padding || '0px'};
	align-items: ${(props) => props.alignItems || 'initial'};
	justify-content: ${(props) => props.justifyContent || 'initial'};
`;

export const ColDiv = styled(RowDiv)`
	flex-direction: column;
`;

export const TableHeader = styled.div`
	height: 62px;
	display: flex;
	padding: 14px 16px;
	align-items: center;
`;
export const AddPageContentsContainer = styled.div`
	padding: 0px 16px 30px 16px;
`;
