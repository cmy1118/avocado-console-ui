import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import {getColumnsAsKey} from '../../utils/TableColumns/index';
import IAM_USER from '../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../reducers/api/IAM/User/Group/groupType';
import Table from './Table';
import {
	numberOfGroupsConverter,
	passwordExpiryTimeConverter,
	statusConverter,
	tagConverter,
} from '../../utils/tableDataConverter';

const TableContainer = ({
	tableKey,
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
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const dispatch = useDispatch();

	const data = useMemo(() => {
		switch (tableKey) {
			case 'users':
				return users.map((v) => ({
					...v,

					tags: tagConverter(v.tags),
					groups: numberOfGroupsConverter(
						v.groups.map(
							(val) =>
								groups.find((val2) => val2.id === val).name,
						),
					),
					status: statusConverter(v.status),
					passwordExpiryTime: passwordExpiryTimeConverter(
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

	return (
		<Table
			tableKey={tableKey}
			columns={getColumnsAsKey[tableKey]}
			data={data}
			isSearchable={isSearchable}
			isSearchFilterable={isSearchFilterable}
			isRefreshable={isRefreshable}
			isPageable={isPageable}
			isNumberOfRowsAdjustable={isNumberOfRowsAdjustable}
			isColumnFilterable={isColumnFilterable}
			isSortable={isSortable}
			isSelectable={isSelectable}
			isDnDPossible={isDnDPossible}
			dndKey={dndKey}
		/>
	);
};

TableContainer.propTypes = {
	tableKey: PropTypes.string.isRequired,
	isSearchable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	isRefreshable: PropTypes.bool,
	isPageable: PropTypes.bool,
	isNumberOfRowsAdjustable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	isSortable: PropTypes.bool,
	isSelectable: PropTypes.bool,
	isDnDPossible: PropTypes.bool,
	dndKey: PropTypes.string,
};
export default TableContainer;
