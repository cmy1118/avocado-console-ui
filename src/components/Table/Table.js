import React, {useCallback, useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {_IamContainer, _PathContainer} from '../../styles/components/style';
import {usersAction, usersSelector} from '../../reducers/users';

/*react-table*/
import './styles.css';
import SettingsCheckbox from './settings/SettingsCheckbox';
import {
	useTable,
	useGlobalFilter,
	useSortBy,
	useRowSelect,
	usePagination,
} from 'react-table';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import SelectColumnDialogBox from './Form/SelectColumnDialogBox';
import TableHeader from './header/TableHeader';

const Table = ({columns, data}) => {
	const dispatch = useDispatch();
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		//hide column
		allColumns,
		getToggleHideAllColumnsProps,
		//pagination
		page, // Instead of using 'rows', we'll use page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		dataDispatch,
		tableViewProps,
		setGlobalFilter,
		state: {pageIndex, pageSize, selectedRowIds},
		...rest
	} = useTable(
		{
			columns,
			data,
			initialState: {},
			disableSortRemove: true,
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
	const onClickOpenSelectColumn = useCallback(async () => {
		dispatch(dialogBoxAction.openForm({key: 'hideColumn'}));
	}, [dispatch]);
	/********************************************************/
	//  roberto :  userTable_update
	//
	/********************************************************/
	const getSelectedRowUid = (uid) => {
		console.log('clicked uid:', uid);
		history.push(`/user/${uid}`);
	};
	/********************************************************/

	return (
		<div>
			<div>
				<div>
					<TableHeader
						columns={columns}
						data={data}
						onClickOpenSelectColumn={onClickOpenSelectColumn}
						pageSize={pageSize}
						setPageSize={setPageSize}
						gotoPage={gotoPage}
						canPreviousPage={canPreviousPage}
						previousPage={previousPage}
						nextPage={nextPage}
						canNextPage={canNextPage}
						pageCount={pageIndex}
						pageOptions={pageOptions}
						pageIndex={pageIndex}
						setGlobalFilter={setGlobalFilter}
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
													{/*{column.isSorted*/}
													{/*	? column.isSortedDesc*/}
													{/*		? ' 🔽'*/}
													{/*		: ' 🔼'*/}
													{/*	: ''}*/}
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
							{/*{rows.map((row, index) => {*/}
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
Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
};
export default Table;
