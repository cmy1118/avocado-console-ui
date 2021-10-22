import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

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
	control = false,
	setSelect,
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
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setGlobalFilter,
		state: {pageIndex, pageSize, selectedRowIds},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			// selectedRowIds: {},
		},
		useGlobalFilter,
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
					},
					...columns,
				]);
		},
	);
	const onDragStart = useCallback(
		(row) => (e) => {
			console.log('onDragStart ::: ', tableKey);
			const firstTarget = e.target.firstChild.childNodes[0];
			console.log(firstTarget);
			const selected = Object.keys(selectedRowIds);
			if (firstTarget.type === 'checkbox' && !firstTarget.checked) {
				firstTarget.click();
				selected.push(row.id);
			}
			e.dataTransfer.setData('ids', selected.toString());
			e.dataTransfer.setData(
				'prevIds',
				data.map((v) => v.id),
			);
			console.log('set-data:', selected);
			e.dataTransfer.setData('tableKey', tableKey);
			e.dataTransfer.setData('dndKey', dndKey);
		},
		[data, dndKey, selectedRowIds, tableKey],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();
			if (e.dataTransfer.getData('dndKey') !== dndKey) return;

			if (setData) {
				control // data를 control하는 쪽이면? 추가 아니면 삭제
					? setData([
							...data.map((v) => v.id),
							...e.dataTransfer.getData('ids').split(','),
					  ])
					: setData(
							e.dataTransfer
								.getData('prevIds')
								.split(',')
								.filter(
									(v) =>
										!e.dataTransfer
											.getData('ids')
											.split(',')
											.includes(v),
								),
					  );
			}
		},
		[dndKey, setData, control, data],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	const selectedDropButton = useCallback(
		(selectedRowIds) => {
			const data = {};
			data[tableKey] = selectedRowIds;
			setSelect && setSelect(data);
		},
		[setSelect, tableKey],
	);

	useEffect(() => {
		console.log(selectedRowIds);
		setSelect && setSelect(Object.keys(selectedRowIds));
		selectedRowIds && selectedDropButton(selectedRowIds);
	}, [selectedRowIds, setSelect, selectedDropButton]);

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
				setGlobalFilter={setGlobalFilter}
				isSearchFilterable={isSearchFilterable}
				isRefreshable={isRefreshable}
				isPageable={isPageable}
				isNumberOfRowsAdjustable={isNumberOfRowsAdjustable}
				isColumnFilterable={isColumnFilterable}
				allColumns={allColumns}
			/>

			<table
				{...getTableProps()}
				className={tableKey}
				onDrop={onDrop}
				onDragOver={onDragOver}
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
								style={{
									background: row.isSelected
										? 'lightgray'
										: 'white',
								}}
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
								onDragStart={onDragStart(row)}
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
	setSelect: PropTypes.func,
	control: PropTypes.bool,
	dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};

export default Table;
