//Button styles
import styled from 'styled-components';

export const DefaultButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 34px;
	width: ${(props) => props?.width || 'fit-content'};
	padding: 7px 12px 6px;
	font-size: 14px;
	border-radius: 4px;
	border: none;
	margin: ${(props) => props?.margin || '0px 5px'};
	font-weight: 500;
	letter-spacing: 0.14px;
	cursor: pointer;
`;

export const NormalButton = styled(DefaultButton)`
	color: #ffffff;
	background: #178082;
	&:hover {
		background: #389193;
	}
	&:active {
		background: #0a6f71;
	}
`;

export const WarningButton = styled(DefaultButton)`
	color: #ffffff';
	background: #d45959;
	&:hover {
		background:#de6565;
	}
	&:active {
		background: #b84646;
	}
`;

export const TransparentButton = styled(DefaultButton)`
	background: transparent;
	color: #556367;
	border: solid 1px #c2c2c2;
	&:hover {
		background: #f8f9fa;
		border: solid 1px #c2c2c2;
	}
	&:active {
		background: #f8f9fa;
		border: solid 1px #a8a8a8;
	}
`;

export const DisabledButton = styled(DefaultButton)`
	color: #ffffff';
	background: #e7e9ea;
`;

export const NormalBorderButton = styled(TransparentButton)`
	background: transparent;
	color: #178082;
	border: solid 1px #178082;
	&:hover {
		color: #389193;
		background: transparent;
		border: solid 1px #389193;
	}
	&:active {
		color: #0a6f71;
		background: transparent;
		border: solid 1px #0a6f71;
	}
`;

export const WarningBorderButton = styled(TransparentButton)`
	background: transparent;
	color: #d45959;
	border: solid 1px #d45959;
	&:hover {
		color: #de6565;
		background: transparent;
		border: solid 1px #de6565;
	}
	&:active {
		color: #b84646;
		background: transparent;
		border: solid 1px #b84646;
	}
`;

export const TransparentBorderButton = styled(DefaultButton)`
	color: #556367;
	background: transparent;
	&:hover {
		background: #f8f9fa;
	}
	&:active {
		background: #f8f9fa;
	}
`;
