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
export const MainHeaderContents = styled.div`
	// padding: 10px 16px;
`;

export const TableContainer = styled.div`
	margin: 0px 16px;
	flex: 1;
	.table {
		display: flex;
		flex-direction: column;
		border-spacing: 0;
		border-top: 1px solid #e3e5e5;
		border-bottom: 1px solid #e3e5e5;
		font-size: 13px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 0.13px;
		text-align: left;
		color: #212121;
		.head {
			background: #f8f9fa;
			border-bottom: 1px solid #e3e5e5;
			display: flex;
			justify-content: space-between;
		}
		.body {
			// border-bottom: 1px solid #e3e5e5;
			display: flex;
			justify-content: space-between;
			// :last-child {
			// 	border: none;
			// }
		}
		.odd {
			background: #f8f9fa;
		}
		.selected {
			background: rgba(228, 243, 244, 0.7);
		}

		.tr {
			display: flex;
			height: 40px;
			:last-child {
				.td {
					border-bottom: 0;
				}
			}
		}

		.th,
		.td {
			white-space: nowrap;
			box-sizing: border-box;
			text-align: left;
			margin-left: 9px;
			padding: 0.5rem;
		}
	}
`;

export const HoverTableContainer = styled(TableContainer)`
	display: flex;
	flex-direction: column;
	.table {
		flex: 1;
		margin-bottom: 16px;
		border-bottom: 1px solid #e3e5e5;
	}
	.body {
		border-bottom: 1px solid #e3e5e5;
		display: flex;
		justify-content: space-between;
		&:hover {
			background: #f8f9fa;
		}
	}
`;
