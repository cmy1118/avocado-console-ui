import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;
export const TitleBar = styled.div`
	border: none;
	align-items: center;
	box-sizing: border-box;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.31;
	letter-spacing: 0.3px;
	text-align: left;
	color: #212121;
	display: flex;
	justify-content: space-between;
	height: 54px;
	padding: 10px 16px;
`;
export const TitleBarText = styled.div`
	display: flex;
	align-items: center;
	line-height: 20px;
`;
export const TitleBarButtons = styled.div`
	display: flex;
`;
export const FoldableContainer = styled.div`
	.fold-title {
		border-bottom: 2px transparent dotted;
	}

	.fold-title.close {
		border-bottom: 2px #e3e5e5 dotted;
	}
`;
