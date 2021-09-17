import React, {useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import SettingsCheckbox from './settings/SettingsCheckbox';
import {useTable, useSortBy, useRowSelect, usePagination} from 'react-table';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import SelectColumnDialogBox from './Form/SelectColumnDialogBox';
import TableHeader from './header/TableHeader';
import {groupTypeColumns, usersColumns} from '../../utils/tableColumns';
import {groupsSelector} from '../../reducers/groups';
import {usersSelector} from '../../reducers/users';
import {
	groupReader,
	passwordExpiryTimeReader,
	statusReader,
} from '../../utils/reader';

const Table = ({tableKey}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {groupTypes, groups} = useSelector(groupsSelector.all);
	const {users} = useSelector(usersSelector.all);

	const columns = useMemo(() => {
		switch (tableKey) {
			case 'users':
				return usersColumns;

			case 'groupTypes':
				return groupTypeColumns;

			default:
				return [];
		}
	}, [tableKey]);

	const data = useMemo(() => {
		switch (tableKey) {
			case 'users':
				return users.map((v) => ({
					...v,
					groups: groupReader(
						v.groups.map(
							(val) =>
								groups.find((val2) => val2.id === val).name,
						),
					),
					status: statusReader(v.status),
					passwordExpiryTime: passwordExpiryTimeReader(
						v.passwordExpiryTime,
					),
				}));

			case 'groupTypes':
				return groupTypes.map((v) => ({
					...v,
					numberOfGroups: groups.filter(
						(val) => val.clientGroupTypeId === v.id,
					).length,
				}));

			default:
				return [];
		}
	}, [tableKey, users, groupTypes, groups]);

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
		state: {pageIndex, pageSize},
	} = useTable(
		{
			columns,
			data,
			initialState: {pageSize: 50},
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

	const getSelectedRowUid = (uid) => {
		history.push(`/user/${uid}`);
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
Table.propTypes = {
	tableKey: PropTypes.string.isRequired,
};
export default Table;
