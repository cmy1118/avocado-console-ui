import React, {useEffect, useMemo, useState} from 'react';
import {
	groupReader,
	passwordExpiryTimeReader,
	statusReader,
	tagReader,
} from '../../utils/reader';
import PropTypes from 'prop-types';
import Table from './Table';
import {useDispatch, useSelector} from 'react-redux';
import {columnsAsType} from '../../utils/TableColumns/index';
import IAM_USER from '../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../reducers/api/IAM/User/Group/groupType';
import CURRENT_TARGET from '../../reducers/currentTarget';

const TableContainer = ({tableKey}) => {
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const dispatch = useDispatch();

	const columns = useMemo(() => {
		return columnsAsType[tableKey];
	}, [tableKey]);

	const data = useMemo(() => {
		switch (tableKey) {
			case 'users':
				return users.map((v) => ({
					...v,
					tags: tagReader(v.tags),
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

			// case 'addTagsToUser':
			// 	return users.map((v) => ({
			// 		uid: v.uid,
			// 		...v.tags,
			// 	}));

			default:
				return [];
		}
	}, [tableKey, users, groups, groupTypes]);

	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		selectedRows &&
			dispatch(
				CURRENT_TARGET.action.setCurrentTarget({
					selectedRows,
					tableKey,
				}),
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
