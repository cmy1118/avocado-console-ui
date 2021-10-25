//Button styles
import styled from 'styled-components';

export const DefaultButton = styled.button`
	height: fit-content;
	width: fit-content;
	padding: 7px 16px;
	font-size: 14px;
	border: none;
	border-radius: 4px;
	margin: 0px 8px;
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
	background: transparent;
	color: #556367;
	&:hover {
		background: #f8f9fa;
	}
	&:active {
		background: #f8f9fa;
	}
`;
