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
	height: 100%;
	overflow-y: scroll;
`;

const TableContainer = ({data, columns, tableKey, children}) => {
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
		<Container>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
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
				});
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
};

export default TableContainer;
