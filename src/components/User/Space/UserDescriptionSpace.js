import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {
	AppBarNavi,
	IamContainer,
	PathContainer,
} from '../../../styles/components/style';
import {Tab, TabItem} from '../../../styles/components/tab';
import UserInfoTab from '../Components/UserInfoTab';
import UserGroupsTab from '../Components/UserGroupsTab';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import UserOnDescPageTags from '../Components/UserOnDescPageTags';
import UserSummary from '../Components/UserSummary';
import UserRolesTab from '../Components/UserRolesTab';
import {NaviLink} from '../../../styles/components/link';
import {HoverIconButton} from '../../../styles/components/icons';
import {onClickCloseAside} from '../../Aside/Aside';
import {errorIcon} from '../../../icons/icons';

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
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/users'>사용자</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to={`/users/${userId}`}>{user?.id}</NaviLink>
				</PathContainer>
				{/*<HoverIconButton onClick={onClickCloseAside}>*/}
				{/*	{errorIcon}*/}
				{/*</HoverIconButton>*/}
			</AppBarNavi>

			<UserSummary userId={userId} />

			<div>
				<Tab>
					<TabItem onClick={onClickChangeTab('user')}>정보</TabItem>
					<TabItem onClick={onClickChangeTab('group')}>그룹</TabItem>
					<TabItem onClick={onClickChangeTab('role')}>권한</TabItem>
					<TabItem onClick={onClickChangeTab('tag')}>태그</TabItem>
				</Tab>

				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'user' && <UserInfoTab userId={userId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'group' && <UserGroupsTab userId={userId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'role' && <UserRolesTab userId={userId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'tag' && (
					<UserOnDescPageTags userId={userId} />
				)}
			</div>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
