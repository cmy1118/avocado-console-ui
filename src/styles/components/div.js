import styled from 'styled-components';

export const PositionRelativeDiv = styled.div`
	position: relative;
`;

export const RowDiv = styled.div`
	display: flex;
	margin: ${(props) => props.margin || '0px'};
	padding: ${(props) => props.padding || '0px'};
`;

export const ColDiv = styled(RowDiv)`
	flex-direction: column;
`;
