import PropTypes from 'prop-types';
import {
	parentGroupConverter,
	statusConverter,
} from '../../../utils/tableDataConverter';
import Table from '../../Table/Table';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';

const UserSummary = ({userId}) => {
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const groupData = useMemo(() => {
		return groups
			.filter((v) => user.groups.includes(v.id))
			.map((v) => ({
				...v,
				clientGroupType: groupTypes.find(
					(val) => val.id === v.clientGroupTypeId,
				).name,
				numberOfRoles: v.roles.length,
				parentGroup: parentGroupConverter(v.parentId),
			}));
	}, [groups]);

	const tagData = useMemo(() => {
		return user.tags.map((v) => ({
			...v,
			id: v.name,
			numberOfPermissions: v.permissions.length,
		}));
	}, [user]);

	return (
		<>
			<ul>
				<li>사용자 : {user?.name}</li>
				<li>사용자 계정 상태 : {statusConverter(user?.status)}</li>
				<li>마지막 콘솔 로그인 : {user?.lastConsoleLogin}</li>
				<li>생성 일시 : {user?.creationDate}</li>
				<li>계정 사용기간 : ??</li>
				<li>비밀번호 사용기간 :??</li>
			</ul>

			<div>그룹: {groupData.length}</div>
			<Table
				data={groupData}
				tableKey={tableKeys.userGroupsSummary}
				columns={getColumnsAsKey[tableKeys.userGroupsSummary]}
			/>

			<div>태그: {tagData.length}</div>
			<Table
				data={tagData}
				tableKey={tableKeys.userTagsSummary}
				columns={getColumnsAsKey[tableKeys.userTagsSummary]}
			/>
		</>
	);
};

UserSummary.propTypes = {
	userId: PropTypes.string.isRequired,
};
export default UserSummary;
