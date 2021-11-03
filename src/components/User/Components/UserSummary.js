import PropTypes from 'prop-types';
import {
	parentGroupConverter,
	expiredConverter,
	statusConverter,
} from '../../../utils/tableDataConverter';
import Table from '../../Table/Table';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import styled from 'styled-components';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {TransparentButton} from '../../../styles/components/buttons';
import {AppBarButtons, AppBarContents} from '../../../styles/components/style';
import {
	dummyDates,
	dummyPolicyOnUser,
	dummyUsers,
} from '../../../utils/dummyData';
import ReadOnlyTable from '../../Table/ReadOnlyTable';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

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
			.map((v, i) => ({
				...v,
				clientGroupType: groupTypes.find(
					(val) => val.id === v.clientGroupTypeId,
				).name,
				type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
					?.name,
				numberOfRoles: v.roles.length,
				parentGroup: parentGroupConverter(
					groups.find((val) => val.id === v.parentId)?.name,
				),
				grantDate: dummyDates[i],
				grantUser: dummyUsers[i],
			}));
	}, [groups, groupTypes]);

	const roleData = useMemo(() => dummyPolicyOnUser, []);

	const tagData = useMemo(() => {
		return user.tags.map((v, i) => ({
			...v,
			id: v.name,
			numberOfPermissions: v.permissions.length,
		}));
	}, [user]);

	return (
		<>
			<AppBarContents>
				<div>요약 [ {user?.id} ]</div>
				<AppBarButtons>
					<TransparentButton>삭제</TransparentButton>
				</AppBarButtons>
			</AppBarContents>

			<ul>
				<li>사용자 : {user?.name}</li>
				<li>사용자 계정 상태 : {statusConverter(user?.status)}</li>
				<li>마지막 콘솔 로그인 : {user?.lastConsoleLogin}</li>
				<li>생성 일시 : {user?.creationDate}</li>
				<li>
					계정 사용기간 : {expiredConverter(user?.accountExpired)}
				</li>
				<li>
					비밀번호 사용기간 :{' '}
					{expiredConverter(user?.passwordExpired)}
				</li>
			</ul>

			<div>그룹: {groupData.length}</div>
			<ReadOnlyTable
				data={groupData}
				tableKey={tableKeys.users.summary.group}
				columns={tableColumns[tableKeys.users.summary.group]}
			/>

			<div>권한: {roleData.length}</div>
			<ReadOnlyTable
				data={roleData}
				tableKey={tableKeys.users.summary.permission}
				columns={tableColumns[tableKeys.users.summary.permission]}
			/>

			<div>태그: {tagData.length}</div>
			<ReadOnlyTable
				data={tagData}
				tableKey={tableKeys.users.summary.tag}
				columns={tableColumns[tableKeys.users.summary.tag]}
			/>
		</>
	);
};

UserSummary.propTypes = {
	userId: PropTypes.string.isRequired,
};
export default UserSummary;
