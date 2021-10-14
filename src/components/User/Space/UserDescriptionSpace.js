import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {
	parentGroupConverter,
	statusConverter,
} from '../../../utils/tableDataConverter';
import {Tab, TabItem} from '../../../styles/components/tab';
import UserInfo from '../Components/UserInfo';
import UserGroups from '../Components/UserGroups';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserDescriptionSpace = ({userId}) => {
	const history = useHistory();
	const {search} = useLocation();
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

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: `/users/${userId}`,
				search: `tabs=${v}`,
			});
		},
		[],
	);

	// if userId does not exist, direct to 404 page
	useEffect(() => {
		if (userId && !user) {
			history.push('/404');
		}
	}, [userId, user]);

	return (
		<IamContainer>
			<div>
				<PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/users'>사용자</Link>
					<div>{' > '}</div>
					<Link to={`/users/${userId}`}>{user?.id}</Link>
				</PathContainer>
			</div>

			<div>
				<_Title>
					<div>요약 [ {user?.id} ]</div>
					<button>삭제</button>
				</_Title>

				<ul>
					<li>사용자 : {user?.name}</li>
					<li>사용자 계정 상태 : {statusConverter(user?.status)}</li>
					<li>마지막 콘솔 로그인 : {user?.lastConsoleLogin}</li>
					<li>생성 일시 : {user?.creationDate}</li>
					<li>계정 사용기간 : ??</li>
					<li>비밀번호 사용기간 :??</li>
				</ul>
			</div>

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

			<div>
				<Tab>
					<TabItem onClick={onClickChangeTab('user')}>정보</TabItem>
					<TabItem onClick={onClickChangeTab('group')}>그룹</TabItem>
					<TabItem onClick={onClickChangeTab('role')}>권한</TabItem>
					<TabItem onClick={onClickChangeTab('tag')}>태그</TabItem>
				</Tab>

				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'user' && <UserInfo userId={userId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'group' && <UserGroups userId={userId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'role' && <div>role</div>}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'tag' && (
					<div>tag</div>
				)}
			</div>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
