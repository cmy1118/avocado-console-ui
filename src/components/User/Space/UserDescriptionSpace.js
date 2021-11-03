import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {
	AppBarButtons,
	AppBarContents,
	AppBarNavi,
	DetailContainer,
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
import {HoverIconButton, IconButton} from '../../../styles/components/icons';
import {onClickCloseAside} from '../../Aside/Aside';
import {arrowDownIcon, arrowUpIcon, errorIcon} from '../../../icons/icons';
import TabBar from '../../Tab/TabBar';
import {TransparentButton} from '../../../styles/components/buttons';

const UserDescriptionSpace = ({userId}) => {
	const history = useHistory();
	const {search} = useLocation();
	const {users} = useSelector(IAM_USER.selector);
	const [isSumarryOpend, setIsSumarryOpend] = useState(true);

	const TabBarInfo = [
		{name: '정보', href: 'user'},
		{name: '그룹', href: 'group'},
		{name: '권한', href: 'role'},
		{name: '태그', href: 'tag'},
	];

	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);
	const onClickFoldSummary = useCallback(() => {
		setIsSumarryOpend(!isSumarryOpend);
	}, [isSumarryOpend]);
	// if userId does not exist, direct to 404 page
	useEffect(() => {
		if (userId && !user) {
			history.push('/404');
		}
	}, [userId, user, history]);
	return (
		<DetailContainer>
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

			<AppBarContents>
				<div style={{display: 'flex'}}>
					<IconButton
						size={'sm'}
						margin={'0px'}
						onClick={onClickFoldSummary}
					>
						{isSumarryOpend ? arrowDownIcon : arrowUpIcon}
					</IconButton>
					요약 [ {user?.id} ]
				</div>
				<AppBarButtons>
					<TransparentButton>삭제</TransparentButton>
				</AppBarButtons>
			</AppBarContents>

			{/*:TODO tab click 시 use summary 닫음 처리  */}
			{isSumarryOpend ? (
				<UserSummary
					userId={userId}
					isOpened={isSumarryOpend}
					setIsOpened={setIsSumarryOpend}
				/>
			) : (
				''
			)}

			<div>
				<div className={isSumarryOpend ? 'tabBar fix' : 'tabBar'}>
					<TabBar
						Tabs={TabBarInfo}
						param={'users'}
						Id={userId}
						isOpened={isSumarryOpend}
						setIsOpened={setIsSumarryOpend}
					/>
				</div>
				{!isSumarryOpend && (
					<div style={{padding: '10px 16px'}}>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && <UserInfoTab userId={userId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'group' && <UserGroupsTab userId={userId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && <UserRolesTab userId={userId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'tag' && <UserOnDescPageTags userId={userId} />}
					</div>
				)}
			</div>
		</DetailContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
