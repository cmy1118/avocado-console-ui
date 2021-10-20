import PropTypes from 'prop-types';
import Table from '../../Table/Table';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';

const GroupSummary = ({groupId}) => {
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	const userData = useMemo(() => {
		return users
			.filter((v) => group.members.includes(v.uid))
			.map((v) => ({...v, groupsLength: v.groups.length}));
	}, [users, group]);

	const tagData = useMemo(() => {
		return group.tags.map((v) => ({
			...v,
			id: v.name,
			numberOfPermissions: v.permissions.length,
		}));
	}, [group]);

	return (
		<>
			<ul>
				<li>그룹명 : {group?.name}</li>
				<li>
					그룹 유형 :{' '}
					{
						groupTypes.find((v) => v.id === group.clientGroupTypeId)
							.name
					}
				</li>
				<li>생성 일시 : {group?.creationDate}</li>
			</ul>

			<div>사용자: {userData.length}</div>
			<Table
				data={userData}
				tableKey={tableKeys.groupUsersSummary}
				columns={getColumnsAsKey[tableKeys.groupUsersSummary]}
			/>
			<div>태그: {tagData.length}</div>
			<Table
				data={tagData}
				tableKey={tableKeys.groupTagsSummary}
				columns={getColumnsAsKey[tableKeys.groupTagsSummary]}
			/>
		</>
	);
};

GroupSummary.propTypes = {
	groupId: PropTypes.string.isRequired,
};
export default GroupSummary;
