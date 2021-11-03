import styled from 'styled-components';

export const PositionRelativeDiv = styled.div`
	position: relative;
`;

export const RowDiv = styled.div`
	display: flex;
	width: ${(props) => props.width || 'initial'};
	height: ${(props) => props.height || 'initial'};
	margin: ${(props) => props.margin || '0px'};
	padding: ${(props) => props.padding || '0px'};
	align-items: ${(props) => props.alignItems || 'initial'};
	justify-content: ${(props) => props.justifyContent || 'initial'};
`;

export const ColDiv = styled(RowDiv)`
	flex-direction: column;
`;

export const _Tables = styled(RowDiv)`
	width: 100%;
`;

export const TableHeader = styled.div`
	height: 34px;
	display: flex;
	margin: 0px 16px;
	align-items: center;
`;
