import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {
	useExpanded,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import TableCheckbox from './Options/TableCheckbox';
import {ColDiv} from '../../styles/components/style';
import styled from 'styled-components';

const Container = styled(ColDiv)`
	flex: 1;
	display: flex;
`;

const OptionContainer = styled.div`
	margin: 0px 16px;
`;

const NormalTable = styled.div`
	margin: ${(props) => (props.mode === 'inner' ? '0px' : ' 0px 16px 16px')};
	display: flex;
	min-width: 380px;
	min-height: ${(props) => props.mode === 'normal' && '240px'};
	height: ${(props) => props.mode === 'normal' && '0'};
	flex: 1 1 auto;

	.table {
		width: 100%;
		overflow-x: scroll;
		height: ${(props) => (props.isDraggable ? '240px' : '100%')};
		display: grid;
		grid-template-rows: 40px;
		border-spacing: 0;
		border-bottom: ${(props) =>
			props.mode === 'inner' ? 'none' : '1px solid #e3e5e5'};
		border-left: ${(props) =>
			props.mode === 'inner' && '2px solid #4ca6a8'};
		font-size: 13px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: 0.13px;
		text-align: left;
		color: #212121;
		.tr {
			display: flex;
			justify-content: space-between;
			.td,
			.th {
				flex: 1;
			}
			.table-check-box {
				flex: 0;
			}
			.th:first-child,
			.td:first-of-type {
				margin-left: ${(props) => props.mode === 'inner' && '80px'};
			}
		}

		.head {
			color: ${(props) => props.mode === 'inner' && '#0a6f71'};
			height: 40px;
			background: #f8f9fa;
			border-top: ${(props) =>
				props.mode === 'inner' ? 'none' : '1px solid #e3e5e5'};
			border-bottom: 1px solid #e3e5e5;
			font-weight: 500;
		}
		.body {
			background: ${(props) =>
				props.mode === 'inner' ? '#f8f9fa' : '#fff'};
			border-bottom: 1px solid #e3e5e5;
		}
		.odd {
			background: ${(props) => props.mode === 'readOnly' && '#f8f9fa'};
		}

		.selected {
			background: rgba(228, 243, 244, 0.7);
		}

		.th,
		.td {
			display: flex;
			margin-right: 12px;
			height: ${(props) => (props.mode === 'normal' ? '40px' : '')};
			min-height: 40px;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;
			:first-child {
				padding-left: ${(props) => props.mode === 'readOnly' && '16px'};
			}
		}
	}
`;

const TableContainer = ({
	data,
	setData,
	columns,
	tableKey,
	mode = 'normal',
	children,
}) => {
	const [skipPageReset, setSkipPageReset] = useState(false);

	const getRowId = useCallback((v) => {
		if (v.userUid) return v.userUid;
		return v.id;
	}, []);

	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
		if (mode === 'readOnly' || mode === 'inner') return;
		setSkipPageReset(true);
		setData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			}),
		);
	};

	function dateBetweenFilterFn(rows, id, filterValues) {
		let sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
		let ed = filterValues[1] ? new Date(filterValues[1]) : undefined;

		if (ed || sd) {
			return rows.filter((r) => {
				let time = new Date(r.values[id]);

				if (ed && sd) {
					return time >= sd && time <= ed;
				} else if (sd) {
					return time >= sd;
				} else if (ed) {
					return time <= ed;
				}
			});
		} else {
			return rows;
		}
	}

	const filterTypes = React.useMemo(
		() => ({
			dateBetween: dateBetweenFilterFn,
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue)
								.toLowerCase()
								.startsWith(String(filterValue).toLowerCase())
						: true;
				});
			},
		}),
		[],
	);

	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		selectedFlatRows,
		allColumns,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setAllFilters,
		getToggleHideAllColumnsProps,
		setHiddenColumns,
		setGlobalFilter,
		state: {pageIndex, selectedRowIds, pageSize, filters, expanded},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			filterTypes,
			autoResetPage: !skipPageReset,
			updateMyData,
		},
		useGlobalFilter,
		useFilters,
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		(hooks) => {
			mode === 'normal' &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'selection',
						// eslint-disable-next-line react/prop-types,react/display-name
						Header: ({getToggleAllPageRowsSelectedProps}) => (
							<TableCheckbox
								{...getToggleAllPageRowsSelectedProps()}
								tablekey={tableKey}
							/>
						),
						// eslint-disable-next-line react/prop-types,react/display-name
						Cell: ({row}) => (
							<TableCheckbox
								// eslint-disable-next-line react/prop-types,react/display-name
								{...row.getToggleRowSelectedProps()}
								tablekey={tableKey}
							/>
						),
						width: 40,
						disableChangeVisible: true,
					},
					...columns,
				]);
		},
	);
	return (
		<Container>
			{React.Children.map(children, (child) => {
				// return child.type.name === 'Table' ? (
				return (
					<NormalTable
						mode={mode}
						isDraggable={child.props?.isDraggable}
					>
						{React.cloneElement(child, {
							data,
							columns,
							tableKey,
							getTableProps,
							headerGroups,
							prepareRow,
							page,
							selectedFlatRows,
							allColumns,
							canPreviousPage,
							canNextPage,
							setGlobalFilter,
							pageOptions,
							gotoPage,
							nextPage,
							previousPage,
							setPageSize,
							setAllFilters,
							getToggleHideAllColumnsProps,
							setHiddenColumns,
							pageIndex,
							selectedRowIds,
							pageSize,
							filters,
							mode,
							expanded,
						})}
					</NormalTable>
				);
				// ) : (
				// 	<OptionContainer>
				// 		{React.cloneElement(child, {
				// 			data,
				// 			columns,
				// 			tableKey,
				// 			getTableProps,
				// 			headerGroups,
				// 			prepareRow,
				// 			page,
				// 			selectedFlatRows,
				// 			allColumns,
				// 			canPreviousPage,
				// 			canNextPage,
				// 			setGlobalFilter,
				// 			pageOptions,
				// 			gotoPage,
				// 			nextPage,
				// 			previousPage,
				// 			setPageSize,
				// 			setAllFilters,
				// 			getToggleHideAllColumnsProps,
				// 			setHiddenColumns,
				// 			pageIndex,
				// 			selectedRowIds,
				// 			pageSize,
				// 			filters,
				// 			mode,
				// 			expanded,
				// 		})}
				// 	</OptionContainer>
				// );
			})}
		</Container>
	);
};

TableContainer.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	setData: PropTypes.func,
	columns: PropTypes.array.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
	mode: PropTypes.oneOf(['normal', 'readOnly', 'inner']),
};

export default TableContainer;
