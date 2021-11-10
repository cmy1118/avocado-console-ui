import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {
	AppBarButtons,
	IamContainer,
	SubHeader,
	SubHeaderText,
	SummaryList,
} from '../../../styles/components/style';
import UserInfoTab from '../Components/UserInfoTab';
import UserGroupsTab from '../Components/UserGroupsTab';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import UserOnDescPageTags from '../Components/UserOnDescPageTags';
import UserSummary from '../Components/UserSummary';
import UserRolesTab from '../Components/UserRolesTab';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import {HoverIconButton, IconButton} from '../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../icons/icons';
import TabBar from '../../Tab/TabBar';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {FOLD_DATA} from '../../../utils/data';
import {LiText} from '../../../styles/components/text';
import {
	expiredConverter,
	statusConverter,
} from '../../../utils/tableDataConverter';
import styled from 'styled-components';
import {
	CoveredContent,
	DescriptionPageContainer,
	TabContainer,
	TabContents,
	VisibleContent,
} from '../../../styles/components/tab';

const UserDescriptionSpace = ({userId}) => {
	const history = useHistory();
	const {search} = useLocation();
	const {users} = useSelector(IAM_USER.selector);

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

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
		setIsSummaryOpened(!isSummaryOpened);
		if (isSummaryOpened) {
			history.push({
				pathname: `/users/${userId}`,
			});
		} else {
			history.push({
				pathname: `/users/${userId}`,
				search: 'tabs=user',
			});
		}
	}, [history, isSummaryOpened, setIsSummaryOpened]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);
	// if userId does not exist, direct to 404 page
	useEffect(() => {
		if (userId && !user) {
			history.push('/404');
		}
		history.push(`${userId}`);
	}, [userId, user, history]);

	return (
		<DescriptionPageContainer>
			<VisibleContent id={'iam-tab-user'}>
				<CurrentPathContainer>
					<AppBarLink to='/iam'>IAM</AppBarLink>
					<NextPath>{' > '}</NextPath>
					<AppBarLink to='/users'>사용자</AppBarLink>
					<NextPath>{' > '}</NextPath>
					<AppBarLink to={`/users/${userId}`}>
						{user?.name}
					</AppBarLink>
				</CurrentPathContainer>

				<SubHeader className={'subHeader'}>
					<SubHeaderText>
						<HoverIconButton
							color={'font'}
							size={'m'}
							margin={'0px'}
							onClick={onClickFoldSummary}
						>
							{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
						</HoverIconButton>
						요약 [ {user?.id} ]
					</SubHeaderText>

					<AppBarButtons>
						<NormalButton onClick={onClickLinkToAddUserPage}>
							사용자 생성
						</NormalButton>
						<TransparentButton margin={'0px 0px 0px 5px'}>
							삭제
						</TransparentButton>
					</AppBarButtons>
				</SubHeader>

				<SummaryList className={'summaryList'}>
					<LiText>
						사용자 : {user?.name} ({user?.id})
					</LiText>
					<LiText>
						사용자 계정 상태 : {statusConverter(user?.status)}
					</LiText>
					<LiText>
						마지막 콘솔 로그인 : {user?.lastConsoleLogin}
					</LiText>
					<LiText>생성 일시 : {user?.creationDate}</LiText>
					<LiText>
						계정 사용기간 : {expiredConverter(user?.accountExpired)}
					</LiText>
					<LiText>
						비밀번호 사용기간 :{' '}
						{expiredConverter(user?.passwordExpired)}
					</LiText>
				</SummaryList>
			</VisibleContent>

			<CoveredContent>
				<UserSummary
					Id={userId}
					param={'users'}
					setIsOpened={setIsSummaryOpened}
				/>
			</CoveredContent>

			<TabContainer
				isOpend={!isSummaryOpened}
				height={
					document.getElementsByTagName('BODY')[0]?.clientHeight -
					document
						.getElementById('iam-tab-user')
						?.getBoundingClientRect().bottom
				}
			>
				<TabBar
					Tabs={TabBarInfo}
					param={'users'}
					Id={userId}
					isOpened={isSummaryOpened}
					setIsOpened={setIsSummaryOpened}
				/>

				<TabContents>
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'user' && <UserInfoTab userId={userId} />}
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'group' && (
						<UserGroupsTab
							title
							userId={userId}
							space={'UserGroupsTab'}
							isFold={isTableFold}
							setIsFold={setIsTableFold}
						/>
					)}
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'role' && (
						<UserRolesTab
							userId={userId}
							space={'UserRolesTab'}
							isFold={isTableFold}
							setIsFold={setIsTableFold}
						/>
					)}
					{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
						'tag' && (
						<UserOnDescPageTags
							userId={userId}
							space={'UserOnDescPageTags'}
							isFold={isTableFold}
							setIsFold={setIsTableFold}
						/>
					)}
				</TabContents>
			</TabContainer>
		</DescriptionPageContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
