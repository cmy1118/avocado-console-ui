import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import React, {useMemo} from 'react';
import {parentGroupConverter} from '../../../utils/tableDataConverter';
import {
	dummyDates,
	dummyPolicyOnRole,
	dummyUsers,
} from '../../../utils/dummyData';
import {AppBarButtons, AppBarContents} from '../../../styles/components/style';
import {TransparentButton} from '../../../styles/components/buttons';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import PropTypes from 'prop-types';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import TableContainer from '../../Table/TableContainer';
import {LiText} from '../../../styles/components/text';

const RoleSummary = ({roleId}) => {
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const {users} = useSelector(IAM_USER.selector);

	const role = useMemo(() => roles.find((v) => v.id === roleId), [roles]);

	const permissionData = useMemo(() => dummyPolicyOnRole, []);

	const userData = useMemo(() => {
		return users
			.filter((v) => role.users.includes(v.uid))
			.map((v, i) => ({
				...v,
				numberOfGroups: v.groups.length,
				grantDate: dummyDates[i],
				grantUser: dummyUsers[i],
			}));
	}, [users, role]);

	const groupData = useMemo(() => {
		return groups
			.filter((v) => role.groups.includes(v.id))
			.map((v, i) => ({
				...v,
				clientGroupType: groupTypes.find(
					(val) => val.id === v.clientGroupTypeId,
				).name,
				numberOfPermissions: v.roles.length,
				parentGroup: parentGroupConverter(
					groups.find((val) => val.id === v.parentId)?.name,
				),
				grantDate: dummyDates[dummyDates.length - i - 1],
				grantUser: dummyUsers[dummyUsers.length - i - 1],
			}));
	}, [role, groups, groupTypes]);

	return (
		<>
			<ul>
				<LiText>역할 이름 : {role?.name}</LiText>
				<LiText>역할 유형 : {role?.type}</LiText>
				<LiText>역할 설명 : {role?.description}</LiText>
				<LiText>생성 일시 : {role?.creationDate}</LiText>
				<LiText>마지막 작업 일시 : 2021.09.21. 16:05:18 </LiText>
				<LiText>마지막 활동 : 사용자 접근정책 변경</LiText>
				<LiText>마지막 활동 사용자 : 김영우 (kyoung634)</LiText>
			</ul>

			<div>권한: {permissionData.length}</div>
			<TableContainer
				data={permissionData}
				tableKey={tableKeys.roles.summary.permission}
				columns={tableColumns[tableKeys.roles.summary.permission]}
			>
				<Table />
			</TableContainer>

			<div>이 역할의 사용자: {userData.length}</div>
			<TableContainer
				data={userData}
				tableKey={tableKeys.roles.summary.user}
				columns={tableColumns[tableKeys.roles.summary.user]}
			>
				<Table />
			</TableContainer>

			<div>이 역할의 사용자 그룹: {groupData.length}</div>
			<TableContainer
				data={groupData}
				tableKey={tableKeys.roles.summary.group}
				columns={tableColumns[tableKeys.roles.summary.group]}
			>
				<Table />
			</TableContainer>
		</>
	);
};

RoleSummary.propTypes = {
	roleId: PropTypes.string.isRequired,
};
export default RoleSummary;
