import React, {useMemo} from 'react';
import {
	groupReader,
	passwordExpiryTimeReader,
	statusReader,
} from '../../utils/reader';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {usersSelector} from '../../reducers/users';
import {groupsSelector} from '../../reducers/groups';
import Table from './Table';
import {getColumnsAsKey} from '../../utils/TableColumns';

const TableContainer = ({tableKey}) => {
	const {users, userTags} = useSelector(usersSelector.all);
	const {groupTypes, groups} = useSelector(groupsSelector.all);

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

			case 'addTagsToUser':
				return userTags.map((v) => ({
					...v,
					rolesLength: v.permissions.length,
				}));

			default:
				return [];
		}
	}, [tableKey, users, groups, groupTypes, userTags]);

	return (
		<Table
			columns={getColumnsAsKey[tableKey]}
			data={data}
			isSelectable={true}
		/>
	);
};

TableContainer.propTypes = {
	tableKey: PropTypes.string.isRequired,
};
export default TableContainer;
