import React, {useCallback, memo} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import SettingsCheckbox from './settings/SettingsCheckbox';
import {useTable, useSortBy, useRowSelect, usePagination} from 'react-table';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import SelectColumnDialogBox from './OpenForm/SelectColumnDialogBox';
import TableHeader from './Tableheader/TableHeader';
import {useMountedLayoutEffect} from 'react-table';
const ReadOnlyTable = ({columns, data, onSelectedRowsChange}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const INITIAL_SELECTED_ROW_IDS = {};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		//hide column
		allColumns,
		getToggleHideAllColumnsProps,
		//pagination
		page, // Instead of using 'rows', we'll use page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		//select
		selectedFlatRows,
		state: {pageIndex, pageSize, selectedRowIds},
	} = useTable(
		{
			columns,
			data,
			initialState: {pageSize: 50},
			disableSortRemove: true,
			selectedRowIds: INITIAL_SELECTED_ROW_IDS,
		},
		useSortBy,
		usePagination,
		useRowSelect,

		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: 'selection',
					// eslint-disable-next-line react/prop-types,react/display-name
					Header: ({getToggleAllRowsSelectedProps}) => (
						<SettingsCheckbox
							{...getToggleAllRowsSelectedProps()}
						/>
					),
					// eslint-disable-next-line react/prop-types,react/display-name
					Cell: ({row}) => (
						<SettingsCheckbox
							// eslint-disable-next-line react/prop-types
							{...row.getToggleRowSelectedProps()}
						/>
					),
				},
				...columns,
			]);
		},
	);

	//****************************************************************//
	// * roberto : Table_update 선택기능추가
	//
	//   checkbox event 발생시 마다 id 저장 가눙
	//
	//   * useMountedLayoutEffect 쓴이유 :
	//   useEffect 와달리 Dom 을 그리기 전에 수행하기 떄문에,
	//   useMountedLayoutEffect 함수 내부의 코드를 실행하고
	//   다른 Dom 요소들을 페인트 하기위해 사용했습니다.
	//****************************************************************//
	useMountedLayoutEffect(() => {
		const selectedIds = Object.keys(selectedRowIds);
		const selectedRowsData = selectedIds
			.map((x) => data[x])
			.filter((x) => {
				return x != null;
			});
		onSelectedRowsChange(selectedRowsData);
	}, [onSelectedRowsChange, selectedRowIds, dispatch, selectedFlatRows]);
	//****************************************************************//

	const onClickOpenSelectColumn = useCallback(async () => {
		dispatch(dialogBoxAction.openForm({key: 'hideColumn'}));
	}, [dispatch]);

	const getSelectedRowUid = (uid) => {
		history.push(`/users/${uid}`);
	};

	return (
		<div>
			<div>
				<div>
					<TableHeader
						pageSize={pageSize}
						gotoPage={gotoPage}
						canPreviousPage={canPreviousPage}
						previousPage={previousPage}
						nextPage={nextPage}
						canNextPage={canNextPage}
						pageCount={pageIndex}
						pageOptions={pageOptions}
						pageIndex={pageIndex}
						setPageSize={setPageSize}
						onClickOpenSelectColumn={onClickOpenSelectColumn}
					/>
				</div>
				<div>
					<table {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup, index) => (
								<tr
									{...headerGroup.getHeaderGroupProps()}
									key={index}
								>
									{headerGroup.headers.map(
										(column, index) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps(),
												)}
												key={index}
											>
												{column.render('Header')}
												<span>
													{column.isSortedDesc
														? ' 🔽'
														: ' 🔼'}
												</span>
											</th>
										),
									)}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row, index) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()} key={index}>
										{row.cells.map((cell, index) => (
											<td
												{...cell.getCellProps()}
												key={index}
												/********************************************************/
												//  roberto :  userTable_update
												//
												//  * column id  가 id 인곳에만 적용
												//  * row.original.uid  : uid 정보
												/********************************************************/
												onClick={() => {
													cell.column.id === 'id'
														? getSelectedRowUid(
																row.original
																	.uid,
														  )
														: '';
												}}
												/********************************************************/
											>
												{cell.render('Cell')}
											</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<SelectColumnDialogBox
				allColumns={allColumns}
				getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
			/>
		</div>
	);
};
ReadOnlyTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onSelectedRowsChange: PropTypes.func.isRequired,
};
export default memo(ReadOnlyTable);
