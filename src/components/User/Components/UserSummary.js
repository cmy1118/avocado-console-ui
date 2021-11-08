import PropTypes from 'prop-types';
import {parentGroupConverter} from '../../../utils/tableDataConverter';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import styled from 'styled-components';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {
	dummyDates,
	dummyPolicyOnUser,
	dummyUsers,
} from '../../../utils/dummyData';
import {ReadOnlyTableSpace} from '../../../styles/components/table';
import ReadOnlyTable from '../../Table/ReadOnlyTable';

const _UserSummaryContainer = styled.div`
	height: 500px;
	overflow-y: scroll;
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
	}, [groups, user, groupTypes]);

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
			{/*<AppBarContents>*/}
			{/*	<div style={{display: 'flex'}}>*/}
			{/*		<IconButton*/}
			{/*			size={'sm'}*/}
			{/*			margin={'0px 0px 0px 12px'}*/}
			{/*		>*/}
			{/*			{isOpened ? arrowDownIcon : arrowUpIcon}*/}
			{/*		</IconButton>*/}
			{/*		요약 [ {user?.id} ]*/}
			{/*	</div>*/}
			{/*	<AppBarButtons>*/}
			{/*		<TransparentButton>삭제</TransparentButton>*/}
			{/*	</AppBarButtons>*/}
			{/*</AppBarContents>*/}

			<_UserSummaryContainer>
				<ReadOnlyTableSpace>
					그룹: {groupData.length}
				</ReadOnlyTableSpace>
				<ReadOnlyTable
					data={groupData}
					tableKey={tableKeys.users.summary.group}
					columns={tableColumns[tableKeys.users.summary.group]}
				/>

				<ReadOnlyTableSpace>권한: {roleData.length}</ReadOnlyTableSpace>
				<ReadOnlyTable
					data={roleData}
					tableKey={tableKeys.users.summary.permission}
					columns={tableColumns[tableKeys.users.summary.permission]}
				/>

				<ReadOnlyTableSpace>태그: {tagData.length}</ReadOnlyTableSpace>
				<ReadOnlyTable
					data={tagData}
					tableKey={tableKeys.users.summary.tag}
					columns={tableColumns[tableKeys.users.summary.tag]}
				/>
			</_UserSummaryContainer>
		</>
	);
};

UserSummary.propTypes = {
	userId: PropTypes.string.isRequired,
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default UserSummary;
