import styled from 'styled-components';

export const TableSpace = styled.div`
	box-sizing: border-box;
	padding: 0px 16px;
	height: 54px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	letter-spacing: 0.1px;
	text-align: left;
	color: #212121;
`;

export const TableFoldContainer = styled.div`
	.fold {
		border: none;
	}

	.fold.close {
		border-bottom: 2px #e3e5e5 dotted;
	}
`;
