import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
	useMountedLayoutEffect,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import {useDispatch} from 'react-redux';
import DnD1TableHeader from './DnDTableHeader';
import SettingsCheckbox from '../settings/SettingsCheckbox';
import SETTING from '../../../reducers/setting';
import CURRENT_TARGET from '../../../reducers/currentTarget';

const DnDTable = ({
	tableKey,
	data,
	columns,
	isSearchable,
	isSearchFilterable,
	isRefreshable,
	isPageable,
	isNumberOfRowsAdjustable,
	isColumnFilterable,
	isSelectable,
	between,
}) => {
	const dispatch = useDispatch();
	const getRowId = useCallback((v) => {
		return v.id;
	}, []);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
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
								<SettingsCheckbox
									{...getToggleAllPageRowsSelectedProps()}
								/>
							</div>
						),
						// eslint-disable-next-line react/prop-types,react/display-name
						Cell: ({row}) => (
							<div>
								<SettingsCheckbox
									// eslint-disable-next-line react/prop-types,react/display-name
									{...row.getToggleRowSelectedProps()}
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
			e.dataTransfer.setData('target', tableKey);
			e.dataTransfer.setData('between', between);
			e.target.style.opacity = '0.2';
		},
		[tableKey, between],
	);

	const onDragEnd = useCallback((e) => {
		e.target.style.opacity = '';
	}, []);

	const onDrop = useCallback(
		(e) => {
			e.preventDefault();
			console.log(between);
			if (
				e.dataTransfer.getData('target') !== tableKey &&
				e.dataTransfer.getData('between') === between
			) {
				//TODO: add actions depends on tableKey
				switch (tableKey) {
					case 1234:
						break;
					default:
						//has to delete
						dispatch(
							SETTING.action.changeTable({
								start: e.dataTransfer.getData('target'),
								id: e.dataTransfer.getData('id'),
								end: tableKey,
							}),
						);
						break;
				}
			}
		},
		[tableKey, between],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	useMountedLayoutEffect(() => {
		isSelectable &&
			dispatch(
				CURRENT_TARGET.action.changeSelectedRows({
					tableKey: tableKey,
					selected: Object.keys(selectedRowIds),
				}),
			);
	}, [isSelectable, selectedRowIds, tableKey]);
	//componentWillUnmount
	useEffect(() => {
		return () => {
			isSelectable &&
				dispatch(
					CURRENT_TARGET.action.setSelectedRows({
						tableKey: tableKey,
					}),
				);
		};
	}, [isSelectable, tableKey]);

	return (
		<div>
			<DnD1TableHeader
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
				isSelectable={isSelectable}
			/>

			<table
				{...getTableProps()}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onDragEnd={onDragEnd}
			>
				<thead>
					{headerGroups.map((headerGroup, id) => (
						<tr key={id} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, id) => (
								<th
									key={id}
									{...column.getHeaderProps(
										column.getSortByToggleProps(),
									)}
								>
									{column.render('Header')}
									<span>
										{column.isSortedDesc ? ' 🔽' : ' 🔼'}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, id) => {
						prepareRow(row);
						return (
							<tr
								id={row.id}
								key={row.id}
								{...row.getRowProps()}
								draggable={true}
								onDragStart={onDragStart}
							>
								{row.cells.map((cell, id) => (
									<td key={id} {...cell.getCellProps()}>
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

DnDTable.propTypes = {
	tableKey: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	isSearchable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	isRefreshable: PropTypes.bool,
	isPageable: PropTypes.bool,
	isNumberOfRowsAdjustable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	between: PropTypes.string.isRequired,
};

export default DnDTable;
