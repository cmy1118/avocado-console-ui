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
import requiredIf from 'react-required-if';

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
	dndKey: requiredIf(PropTypes.string, (props) => props.isDnDPossible),
};
export default TableContainer;
