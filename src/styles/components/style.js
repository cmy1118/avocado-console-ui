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
export const Label = styled.label`
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: 0.1px;
	text-align: left;
	color: #212121;
	margin-bottom: 2px;
	width: ${(props) => props.width || '120px'};
`;
export const Span = styled.span`
	font-size: 14px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: ${(props) => props.lineHeight || 'normal'};
	letter-spacing: 0.14px;
	color: #212121;
	white-space: nowrap;
	padding: ${(props) => props.padding || '0px'};
	margin: ${(props) => props.margin || '0px'};
	color: ${(props) => props.color || 'initial'};
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
//group, role add page 정리 후 삭제 예정
export const TableHeader = styled.div`
	font-size: 13px;
	font-weight: 500;
	letter-spacing: -0.25px;
	color: #1e2a42;
	height: 32px;
	margin: 0 0 10px;
	display: flex;
	align-items: center;
`;

export const PermissionName = styled.div`
	display: flex;
	align-items: center;
`;

export const CollapsbleContent = styled.div`
	max-height: ${(props) => (props.height ? props.height : '0px')};
	overflow: scroll;
	transition: max-height 0.2s ease-out;
`;
