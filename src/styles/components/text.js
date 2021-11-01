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
	line-height: normal;
	letter-spacing: 0.14px;
	color: #212121;
	white-space: nowrap;
`;

export const ErrorSpan = styled.span`
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.75;
	letter-spacing: 0.1px;
	text-align: left;
	// color: #757575;
	color: #f34722;
`;

export const GreenSpan = styled(Span)`
	color: #178082;
`;
