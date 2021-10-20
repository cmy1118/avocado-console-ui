import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {usePagination, useRowSelect, useSortBy, useTable} from 'react-table';

import TableOptionsBar from './TableOptionsBar';
import TableCheckbox from './Options/TableCheckbox';

const Table = ({
	tableKey,
	data,
	columns,
	isSearchable = false,
	isSearchFilterable = false,
	isRefreshable = false,
	isPageable = false,
	isNumberOfRowsAdjustable = false,
	isColumnFilterable = false,
	isSortable = false,
	isSelectable = false,
	isDnDPossible = false,
	dndKey,
	setData,
	setSelected,
}) => {
	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		allColumns,
		page, // Instead of using 'rows', we'll use page,
		rows,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: {pageIndex, pageSize, selectedRowIds},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			// selectedRowIds: {},
		},
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			isSelectable &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'selection',
						// eslint-disable-next-line react/prop-types,react/display-name
						Header: ({getToggleAllPageRowsSelectedProps}) => (
							<TableCheckbox
								{...getToggleAllPageRowsSelectedProps()}
								rows={rows}
								tablekey={tableKey}
							/>
						),
						// eslint-disable-next-line react/prop-types,react/display-name
						Cell: ({row}) => (
							<TableCheckbox
								// eslint-disable-next-line react/prop-types,react/display-name
								{...row.getToggleRowSelectedProps()}
								row={row}
								rows={rows}
								tablekey={tableKey}
							/>
						),
					},
					...columns,
				]);
		},
	);

	const onDragStart = useCallback(
		(e) => {
			if (e.target.firstChild.childNodes[0].type === 'checkbox') {
				e.target.firstChild.childNodes[0].checked = true;
			}
			e.dataTransfer.setData(
				'ids',
				rows.filter((v) => v.isSelected).map((x) => x.id),
			);
			e.dataTransfer.setData('tableKey', tableKey);
			e.dataTransfer.setData('dndKey', dndKey);
			e.target.style.opacity = '0.2';
		},
		[rows, tableKey, dndKey],
	);

	console.log(rows.filter((v) => v.isSelected).map((x) => x.id));

	const onDragEnd = useCallback(
		(e) => {
			// if (e.target.firstChild.childNodes[0].type === 'checkbox') {
			// 	e.target.firstChild.childNodes[0].checked = false;
			// }
			console.log(e.dataTransfer.getData('ids'));

			setData &&
				setData(
					data
						.filter(
							(v) =>
								!e.dataTransfer
									.getData('ids')
									.split(',')
									.includes(v.id),
						)
						.map((x) => x.id),
				);
			e.target.style.opacity = '';
		},
		[data, setData],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();

			console.log({
				tableKey: e.dataTransfer.getData('tableKey'),
				dndKey: e.dataTransfer.getData('dndKey'),
				DropId: e.dataTransfer.getData('ids'),
			});

			setData &&
				setData([
					...data.map((v) => v.id),
					...e.dataTransfer.getData('ids').split(','),
				]);
		},
		[data, setData],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	useEffect(() => {
		console.log(selectedRowIds);
		setSelected && setSelected(selectedRowIds);
	}, [selectedRowIds, setSelected]);

	return (
		<div>
			<TableOptionsBar
				tableKey={tableKey}
				gotoPage={gotoPage}
				canPreviousPage={canPreviousPage}
				previousPage={previousPage}
				nextPage={nextPage}
				canNextPage={canNextPage}
				pageOptions={pageOptions}
				pageIndex={pageIndex}
				pageSize={pageSize}
				setPageSize={setPageSize}
				isSearchable={isSearchable}
				isSearchFilterable={isSearchFilterable}
				isRefreshable={isRefreshable}
				isPageable={isPageable}
				isNumberOfRowsAdjustable={isNumberOfRowsAdjustable}
				isColumnFilterable={isColumnFilterable}
				allColumns={allColumns}
			/>

			<table
				{...getTableProps()}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onDragEnd={onDragEnd}
			>
				<thead>
					{headerGroups.map((headerGroup, i) => (
						<tr key={i} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, i) => (
								<th key={i}>
									{column.render('Header')}
									{isSortable &&
										!(i === 0 && isSelectable) && (
											<span
												{...column.getHeaderProps(
													column.getSortByToggleProps(),
												)}
											>
												{column.isSortedDesc ===
													'ture' ||
												column.isSortedDesc ===
													undefined
													? ' 🔽'
													: ' 🔼'}
											</span>
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr
								draggable={isDnDPossible ? 'true' : 'false'}
								id={
									row.original.uid
										? row.original.uid
										: row.original.id
								}
								key={
									row.original.uid
										? row.original.uid
										: row.original.id
								}
								{...row.getRowProps()}
								onDragStart={onDragStart}
							>
								{row.cells.map((cell, i) => {
									return (
										<td key={i} {...cell.getCellProps}>
											{cell.render('Cell', {setData})}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

Table.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	isSearchable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	isRefreshable: PropTypes.bool,
	isPageable: PropTypes.bool,
	isNumberOfRowsAdjustable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	isSortable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	isDnDPossible: PropTypes.bool,
	setData: PropTypes.func,
	setSelected: PropTypes.func,
	selected: PropTypes.string,
	dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};

export default Table;
