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
import DIALOG_BOX from '../../reducers/dialogBoxs';
import {useDispatch} from 'react-redux';
import {CheckDropDataType} from '../../utils/dropTableDataCheck';
import {
	checkArrayhasDuplicates,
	checkArrayIsUniqueHasDuplicates,
	checkArraysIsUniqueHasDuplicates,
} from '../../utils/dataFitering';

const Table = ({
	tableKey,
	data,
	api,
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

	/***************************************************************************/
	/* DndTable_update : 유형별 조건에 맞는 경고 알림추가
	/*
	/***************************************************************************/
	const onDropCheckMaxNumber = useCallback(
		(e, data, tableKey) => {
			const max = 10;
			const preDataLength = data.length;
			const dropDataLength = e.dataTransfer.getData('ids').split(',')
				.length;
			if (preDataLength + dropDataLength > max) {
				console.log('최대 10개의 사용자만 추가 가능합니다.');
				dispatch(
					DIALOG_BOX.action.openAlert({
						key: 'maxNumberOfUsers',
					}),
				);
				return false;
			} else {
				return true;
			}
		},
		[dispatch],
	);

	const onDropCheckTypeLimited = useCallback(
		(e, data, tableKey) => {
			const GROUP = 'groups';
			const ROLES = 'roles';
			const UESRS = 'users';
			const FILTER_TYPE = 'Private';
			const preDataType = data.map((v) => {
				return v.type;
			});
			const dropDataType = e.dataTransfer
				.getData('selectedType')
				.split(',');
			//  API : groups 일때 - 그룹 유형 검사 : 그룹유형별 1개의 그룹만 추가
			if (CheckDropDataType(tableKey)) {
				if (CheckDropDataType(tableKey) === GROUP) {
					const TypeLimited = dropDataType.filter((v) =>
						preDataType.includes(v),
					).length;
					if (
						TypeLimited > 1 ||
						checkArrayhasDuplicates(dropDataType)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountGroupTypes',
							}),
						);
						return false;
					}
					return true;
				} else if (CheckDropDataType(tableKey) === ROLES) {
					// API : roles 일때 - 역할 유형 검사 : Private 유형은 한사용자에게만
					if (
						checkArrayIsUniqueHasDuplicates(
							dropDataType,
							FILTER_TYPE,
						) ||
						checkArraysIsUniqueHasDuplicates(
							preDataType,
							dropDataType,
							FILTER_TYPE,
						)
					) {
						dispatch(
							DIALOG_BOX.action.openAlert({
								key: 'singleCountRolesTypes',
							}),
						);
						return false;
					} else {
						return true;
					}
				} else {
					return true;
				}
			}
		},
		[dispatch],
	);
	/***************************************************************************/

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
			const flatRows = selectedFlatRows;
			const selected = Object.keys(selectedRowIds);
			if (firstTarget.type === 'checkbox' && !firstTarget.checked) {
				firstTarget.click();
				selected.push(row.id);
				flatRows.push(row);
			}
			if (dndKey) {
				const selectedType = flatRows.map((v) => v.values.type);
				e.dataTransfer.setData('selectedType', selectedType.toString());
			}

			e.dataTransfer.setData('ids', selected.toString());
			e.dataTransfer.setData(
				'prevIds',
				data.map((v) => v.id),
			);
			e.dataTransfer.setData('tableKey', tableKey);
			e.dataTransfer.setData('dndKey', dndKey);
		},
		[data, dndKey, selectedFlatRows, selectedRowIds, tableKey],
	);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();
			if (e.dataTransfer.getData('dndKey') !== dndKey) return;
			if (setData) {
				control // data를 control하는 쪽이면? 추가 아니면 삭제
					? onDropCheckMaxNumber(e, data, tableKey) &&
					  onDropCheckTypeLimited(e, data, tableKey) &&
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
		[
			dndKey,
			setData,
			control,
			onDropCheckMaxNumber,
			data,
			tableKey,
			onDropCheckTypeLimited,
		],
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
	api: PropTypes.string,
	dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};

export default Table;
