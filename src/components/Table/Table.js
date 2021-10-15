import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import * as _ from 'lodash';
import {
	useMountedLayoutEffect,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import {useDispatch, useSelector} from 'react-redux';

import TableOptionsBar from './TableOptionsBar';
import TableCheckbox from './Options/TableCheckbox';
import CURRENT_TARGET from '../../reducers/currentTarget';

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
}) => {
	const dispatch = useDispatch();

	const getRowId = useCallback((v) => {
		if (v.uid) return v.uid;
		return v.id;
	}, []);

	const {currentTarget} = useSelector(CURRENT_TARGET.selector);
	const selectedItem = currentTarget[tableKey] || [];

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
		state: {pageIndex, pageSize, selectedRowIds},
	} = useTable(
		{
			data,
			columns,
			initialState: {pageSize: 50},
			getRowId,
			selectedRowIds: {},
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
							<div>
								<TableCheckbox
									{...getToggleAllPageRowsSelectedProps()}
								/>
							</div>
						),
						// eslint-disable-next-line react/prop-types,react/display-name
						Cell: ({row}) => (
							<div>
								<TableCheckbox
									// eslint-disable-next-line react/prop-types,react/display-name
									{...row.getToggleRowSelectedProps()}
									row={row}
									tablekey={tableKey}
								/>
							</div>
						),
					},
					...columns,
				]);
		},
	);

	const onDragStart = useCallback(
		(e) => {
			e.dataTransfer.setData('id', e.target.id);
			e.dataTransfer.setData('tableKey', tableKey);
			e.dataTransfer.setData('dndKey', dndKey);
			e.target.style.opacity = '0.2';
		},
		[tableKey, dndKey],
	);

	const onDragEnd = useCallback((e) => {
		e.target.style.opacity = '';
	}, []);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();

			console.log(
				e.dataTransfer.getData('tableKey'),
				e.dataTransfer.getData('id'),
				tableKey,
			);

			if (
				e.dataTransfer.getData('tableKey') !== tableKey &&
				e.dataTransfer.getData('dndKey') === dndKey
			) {
				//TODO: add actions depends on tableKey
				switch (tableKey) {
					default:
						break;
				}
			}
		},
		[tableKey, dndKey],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	// 체크박스 변화 감지
	useMountedLayoutEffect(() => {
		// console.log('data', data);
		console.log('====================');
		console.log('선택된 아이템', selectedItem);
		// console.log('Object.keys(selectedRowIds)', Object.keys(selectedRowIds));
		// console.log(selectedItem.length === data.length);
		// console.log(Object.keys(selectedRowIds).length === data.length);

		console.log('추가 ::: ', [
			...Object.keys(selectedRowIds).filter(
				(v) => !selectedItem.includes(v),
			),
			// ...selectedItem,
		]);
		console.log(
			'삭제 ::: ',
			selectedItem.filter(
				(v) => !Object.keys(selectedRowIds).includes(v),
			),
		);

		const selected = _.uniq([
			...selectedItem,
			...Object.keys(selectedRowIds),
		]);

		console.log(selected);
		isSelectable &&
			dispatch(
				CURRENT_TARGET.action.changeSelectedRows({
					tableKey: tableKey,
					selected:
						selectedItem.length === data.length &&
						selected.length === data.length
							? []
							: selected,
				}),
			);
	}, [data, isSelectable, selectedRowIds, tableKey]);
	// componentWillUnmount

	useEffect(() => {
		return () => {
			isSelectable &&
				dispatch(
					CURRENT_TARGET.action.setSelectedRows({
						// 테이블 처음 렌더링시 selectedRowIds => {} 값으로 초기화됨
						selectedRows: selectedRowIds,
						tableKey: tableKey,
					}),
				);
		};
	}, []); // 1번만 실행되기 때문에 비워주셔야 합니다.

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
								onClick={() =>
									dispatch(
										CURRENT_TARGET.action.changeSelectedRows(
											{
												tableKey,
												selected: selectedItem.includes(
													row.original.id,
												)
													? selectedItem.filter(
															(v) =>
																v !==
																row.original.id,
													  )
													: [
															...selectedItem,
															row.original.id,
													  ],
											},
										),
									)
								}
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
								{row.cells.map((cell, i) => (
									<td key={i} {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								))}
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
	dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};

export default Table;
