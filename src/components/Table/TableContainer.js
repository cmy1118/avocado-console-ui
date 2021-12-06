import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
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
import * as _ from 'lodash';

const Container = styled(ColDiv)`
	flex: 1;
	display: flex;
`;

const TableContainer = ({
	data,
	columns,
	tableKey,
	setData,
	mode = 'normal',
	children,
}) => {
	const [skipPageReset, setSkipPageReset] = useState(false);

	const getRowId = useCallback((v) => {
		if (v.userUid) return v.userUid;
		return v.id;
	}, []);

	const getColumnWidth = (data, accessor, headerText, id) => {
		const cellLength = Math.max(
			...data.map((row) => {
				let value = '';
				if (typeof accessor === 'string') {
					value = _.get(row, accessor);
				} else {
					value = accessor(row);
					if (typeof value === 'string' && value.includes('\n')) {
						let maxValue = '';
						const temp = value;
						temp.split('\n').forEach((v) => {
							if (v.length > maxValue.length) maxValue = v;
						});
						value = maxValue;
					}
					if (typeof value === 'object' && id === 'grantUser') {
						value = `${row.grantUser.name}(${row.grantUser.id})`;
					}
				}

				if (typeof value === 'number') return value.toString().length;
				if (
					isNaN(
						(value || '').length -
							Math.ceil(
								value
									?.toString()
									.split('')
									.map((char) => char)
									.filter((v) => v.match(/[a-z0-9]/i))
									.length / 2,
							),
					)
				)
					return 1;
				else {
					return (
						(value || '').length -
						Math.ceil(
							value
								?.toString()
								.split('')
								.map((char) => char)
								.filter((v) => v.match(/[a-z0-9]/i)).length / 2,
						)
					);
				}
			}),
			headerText.length,
		);

		const magicSpacing = 10;

		return cellLength * magicSpacing + 24 + 'px';
	};

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
			{/*// mode={mode}*/}
			{/*// isOptionBar={child.props.isOptionBar}*/}
			{/*// isDraggable={child.props?.isDraggable}*/}
			<Table
				data={data}
				columns={columns}
				tableKey={tableKey}
				getColumnWidth
				getTableProps
				headerGroups
				prepareRow
				page
				selectedFlatRows
				allColumns
				canPreviousPage
				canNextPage
				setGlobalFilter
				pageOptions
				gotoPage
				nextPage
				previousPage
				setPageSize
				setAllFilters
				getToggleHideAllColumnsProps
				setHiddenColumns
				pageIndex
				selectedRowIds
				pageSize
				filters
				mode
				expanded
			/>
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
