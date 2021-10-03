import React, {useEffect, useMemo, useState} from 'react';
import {
	groupColumns,
	groupTypeColumns,
	usersColumns,
	addUsersToGroupColumns,
} from '../../utils/tableColumns';
import {
	groupReader,
	passwordExpiryTimeReader,
	statusReader,
} from '../../utils/reader';
import PropTypes from 'prop-types';
import Table from './Table';
import {useDispatch, useSelector} from 'react-redux';
import {usersSelector} from '../../reducers/users';
import {groupsSelector} from '../../reducers/groups';
import {currentTargetAction} from '../../reducers/currentTarget';

const TableContainer = ({tableKey}) => {
	const {users} = useSelector(usersSelector.all);
	const {groupTypes, groups} = useSelector(groupsSelector.all);
	const dispatch = useDispatch();

	const columns = useMemo(() => {
		switch (tableKey) {
			case 'users':
				return usersColumns;

			case 'groups':
				return groupColumns;

			case 'groupTypes':
				return groupTypeColumns;

			case 'addUsersToGroup':
				return addUsersToGroupColumns;
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

			case 'groups':
				return groups.map((v) => ({
					...v,
					numberOfUsers: v.members.length,
				}));

			case 'groupTypes':
				return groupTypes.map((v) => ({
					...v,
					numberOfGroups: groups.filter(
						(val) => val.clientGroupTypeId === v.id,
					).length,
				}));

			case 'addUsersToGroup':
				return users.map((v) => ({
					...v,
					groupsLength: v.groups.length,
				}));

			default:
				return [];
		}
	}, [tableKey, users, groupTypes, groups]);

	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		selectedRows &&
			dispatch(
				currentTargetAction.setCurrentTarget({selectedRows, tableKey}),
			);
	}, [dispatch, selectedRows, tableKey]);

	return (
		<div>
			<Table
				columns={columns}
				data={data}
				onSelectedRowsChange={setSelectedRows}
			/>
		</div>
	);
};

TableContainer.propTypes = {
	tableKey: PropTypes.string.isRequired,
};
export default TableContainer;
