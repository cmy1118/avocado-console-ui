import styled from 'styled-components';

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

export const ErrorSpan = styled.span`
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.75;
	letter-spacing: 0.1px;
	text-align: left;
	color: #f34722;
`;

export const LiText = styled.li`
	padding: 4px 0;
`;
