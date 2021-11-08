import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import TableCheckbox from './Options/TableCheckbox';
import {ColDiv} from '../../styles/components/div';
import styled from 'styled-components';

const Container = styled(ColDiv)`
	// flex: 1;
	height: 100%;
	width: ${(props) => props.width};
`;

const NormalTable = styled.div`
	margin: 0px 16px;
	box-sizing: border-box;
	display: flex;
	// height: 100%;

	.table {
		// flex: 1;
		width: 100%;
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		border-spacing: 0;
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
			position: absolute;
			height: 40px;
			z-index: 1;
			background: #f8f9fa;
			border-top: 1px solid #e3e5e5;
			border-bottom: 1px solid #e3e5e5;
		}
		.body {
			position: relative;
			border-bottom: 1px solid #e3e5e5;
			background: #fff;
			width: 100%;
		}

		.selected {
			background: rgba(228, 243, 244, 0.7);
		}

		.tr {
			display: flex;
			width: 100%;
		}

		.th,
		.td {
			height: ${(props) => (props.mode === 'normal' ? '40px' : '')};
			min-height: 40px;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;
			:first-child {
				padding-left: 16px;
			}
		}
	}
`;

const TableContainer = ({data, columns, tableKey, mode, width, children}) => {
	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

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
		state: {pageIndex, selectedRowIds, pageSize, filters},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			filterTypes,
		},
		useGlobalFilter,
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
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
		<Container width={width}>
			{React.Children.map(children, (child) => {
				return (
					<NormalTable mode={mode}>
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
						})}
					</NormalTable>
				);
			})}
		</Container>
	);
};

TableContainer.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
	mode: PropTypes.oneOf(['normal', 'readOnly']),
	width: PropTypes.string,
};

export default TableContainer;
