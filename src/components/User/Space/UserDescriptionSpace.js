import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {IamContainer, PathContainer} from '../../../styles/components/style';
import {Tab, TabItem} from '../../../styles/components/tab';
import UserInfo from '../Components/UserInfo';
import UserGroups from '../Components/UserGroups';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import UserTags from '../Components/UserTags';
import UserSummary from '../Components/UserSummary';
import UserRolesTab from '../Components/UserRolesTab';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserDescriptionSpace = ({userId}) => {
	const history = useHistory();
	const {search} = useLocation();
	const {users} = useSelector(IAM_USER.selector);

	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: `/users/${userId}`,
				search: `tabs=${v}`,
			});
		},
		[history, userId],
	);

	// if userId does not exist, direct to 404 page
	useEffect(() => {
		if (userId && !user) {
			history.push('/404');
		}
	}, [userId, user, history]);

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

			<_Title>
				<div>요약 [ {user?.id} ]</div>
				<button>삭제</button>
			</_Title>

			<UserSummary userId={userId} />

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
					'role' && <UserRolesTab userId={userId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'tag' && (
					<UserTags userId={userId} />
				)}
			</div>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
