import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
	usePagination,
	useGlobalFilter,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

import TableOptionsBar from './TableOptionsBar';
import TableCheckbox from './Options/TableCheckbox';
import DIALOG_BOX from '../../reducers/dialogBoxs';
import {useDispatch} from 'react-redux';
import {
	dropMaxNumberOfData,
	droptypeLimited,
	isDropDataMaxNumber,
	isDropTypeLimited,
	maxNumberOfData,
} from '../../utils/dropTableDataCheck';
import {stringify} from 'qs';

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
	const dispatch = useDispatch();
	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

	const onDropCheckTableKey = useCallback((tableKey) => {
		switch (tableKey) {
			case 0:
				return '?';
			case 1:
				return '?';
			default:
				return;
		}
	}, []);

	const onDropCheckMaxNumber = useCallback(
		(e, data, tableKey) => {
			const key = isDropDataMaxNumber(tableKey);
			const preDataLength = data.length;
			const dropDataLength = e.dataTransfer.getData('ids').split(',')
				.length;
			if (preDataLength + dropDataLength > 10) {
				const key = isDropDataMaxNumber(tableKey);
				dispatch(DIALOG_BOX.action.openAlert({key: key}));
				return false;
			} else {
				return true;
			}
		},
		[dispatch],
	);

	const onDropCheckTypeLimited = useCallback((e, data, tableKey) => {
		const key = isDropTypeLimited(tableKey);
		dispatch(DIALOG_BOX.action.openAlert({key: key}));
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
		selectedFlatRows,
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
			const firstTarget = e.target.firstChild.childNodes[0];
			e.dataTransfer.setData('go', selectedFlatRows);
			const flatRows = selectedFlatRows;
			const selected = Object.keys(selectedRowIds);
			if (firstTarget.type === 'checkbox' && !firstTarget.checked) {
				firstTarget.click();
				selected.push(row.id);
				flatRows.push(row);
			}
			e.dataTransfer.setData(
				'objects',
				JSON.stringify(flatRows.toString()),
			);

			e.dataTransfer.setData('ids', selected.toString());
			e.dataTransfer.setData('flatRows', flatRows.toString());
			e.dataTransfer.setData('tableKey', tableKey);
			e.dataTransfer.setData('dndKey', dndKey);
		},
		[dndKey, selectedFlatRows, selectedRowIds, tableKey],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();

			const flatRows = e.dataTransfer.getData('flatRows').split(',');
			console.log('flatRows - drop:');

			if (e.dataTransfer.getData('dndKey') !== dndKey) return;
			if (setData) {
				//유형별 1개 추가 가능
				control // data를 control하는 쪽이면? 추가 아니면 삭제
					? // onDropCheckMaxNumber(e,tableKey) &&

					  //     onDropCheckTypeLimited(tableKey, data) &&
					  setData([
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

	const onDragOver = (e) => {
		e.preventDefault();
	};

	const selectedDropBtton = useCallback(
		(selectedRowIds) => {
			const data = {};
			data[tableKey] = selectedRowIds;
			setSelect && setSelect(data);
		},
		[setSelect, tableKey],
	);

	useEffect(() => {
		setSelect && setSelect(Object.keys(selectedRowIds));
		selectedRowIds && selectedDropBtton(selectedRowIds);
	}, [selectedRowIds, setSelect, selectedDropBtton, selectedFlatRows]);

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
