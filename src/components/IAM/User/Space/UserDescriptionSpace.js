import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import qs from 'qs';

import UserInfoTab from '../Components/Description/Tabs/UserInfoTab';
import UserGroupTab from '../Components/Description/Tabs/UserGroupTab';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import UserOnDescPageTags from '../Components/Description/UserOnDescPageTags';
import UserSummary from '../Components/Description/UserSummary';
import UserRoleTab from '../Components/Description/Tabs/UserRoleTab';
import {HoverIconButton} from '../../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import TabBar from '../../TabBar';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {LiText} from '../../../../styles/components/text';
import {
	expiredConverter,
	statusConverter,
} from '../../../../utils/tableDataConverter';
import {
	CoveredByTabContent,
	TabContainer,
	TabContentSpace,
} from '../../../../styles/components/iam/iamTab';
import {
	DescriptionPageContainer,
	SummaryContainer,
	SummaryList,
} from '../../../../styles/components/iam/descriptionPage';
import {
	IamContainer,
	IamContents,
	IamSection,
	IamSectionTitleBar,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {userTabs} from '../../../../utils/tabs';
import {RowDiv} from '../../../../styles/components/style';
import TempTab from '../../TempTab';

const UserDescriptionSpace = ({userUid}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const [user, setUser] = useState(null);

	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);
	const paths = useMemo(
		() => [
			{url: '/iam', label: 'IAM'},
			{url: '/users', label: '사용자'},
			{url: '/users/' + userUid, label: user?.name},
		],
		[user, userUid],
	);

	const TabBarInfo = [
		{name: '정보', href: userTabs.user},
		{name: '그룹', href: userTabs.group},
		{name: '권한', href: userTabs.role},
		{name: '태그', href: userTabs.tag},
	];

	const onClickFoldSummary = useCallback(() => {
		if (isSummaryOpened) {
			history.push({
				pathname: location.pathname,

				search: `tabs=${userTabs.user}`,
			});
		} else {
			history.push({
				pathname: location.pathname,
			});
		}
	}, [isSummaryOpened, history]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	const onClickDeleteGroup = useCallback(() => {
		dispatch(
			IAM_USER.asyncAction.deleteAction({
				userUid: userUid,
			}),
		);
	}, [dispatch, userUid]);

	useEffect(() => {
		dispatch(
			IAM_USER.asyncAction.findByUidAction({
				userUid: userUid,
			}),
		)
			.unwrap()
			.then((res) => setUser(res));
	}, [dispatch, userUid]);

	useEffect(() => {
		if (isSummaryOpened && history.location.search)
			history.push({
				pathname: `/users/${userUid}`,
			});
	}, [history, isSummaryOpened, userUid]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<TitleBar>
				<RowDiv
					alignItems={'center'}
					width={'100%'}
					justifyContent={'space-between'}
				>
					<div>{user ? user.name : ''}</div>
					<TitleBarButtons>
						<NormalButton onClick={onClickLinkToAddUserPage}>
							사용자 생성
						</NormalButton>
						<TransparentButton
							onClick={onClickDeleteGroup}
							margin={'0px 0px 0px 5px'}
						>
							삭제
						</TransparentButton>
					</TitleBarButtons>
				</RowDiv>
			</TitleBar>

			<IamContents>
				<IamSection>
					<IamSectionTitleBar>
						<TitleBarText>
							<HoverIconButton
								color={'font'}
								size={'m'}
								margin={'0px'}
								onClick={onClickFoldSummary}
							>
								{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
							</HoverIconButton>
							요약
						</TitleBarText>
						<TitleBarButtons>
							<NormalButton onClick={onClickLinkToAddUserPage}>
								사용자 생성
							</NormalButton>
							<TransparentButton
								onClick={onClickDeleteGroup}
								margin={'0px 0px 0px 5px'}
							>
								삭제
							</TransparentButton>
						</TitleBarButtons>
					</IamSectionTitleBar>

					<SummaryContainer>
						<SummaryList className={'summaryList'}>
							<LiText>
								사용자 : {user?.name} ({user?.id})
							</LiText>
							<LiText>
								사용자 계정 상태 :{' '}
								{statusConverter(user?.status.code)}
							</LiText>
							<LiText>
								마지막 콘솔 로그인 : {user?.lastConsoleLogin}
							</LiText>
							<LiText>
								생성 일시 : {user?.createdTag.createdTime}
							</LiText>
							<LiText>
								계정 사용기간 :{' '}
								{expiredConverter(user?.accountExpiryTime)}
							</LiText>
							<LiText>
								비밀번호 사용기간 :{' '}
								{expiredConverter(user?.passwordExpiryTime)}
							</LiText>
						</SummaryList>
					</SummaryContainer>

					<CoveredByTabContent isOpened={isSummaryOpened}>
						<UserSummary userUid={userUid} />
					</CoveredByTabContent>
				</IamSection>
			</IamContents>
			<IamContents>
				<IamSection
					border={'1px solid transparent'}
					background={'transparent'}
				>
					<TabContainer isOpened={!isSummaryOpened}>
						<TabBar Tabs={TabBarInfo} />
						<TabContentSpace>
							{isSummaryOpened ? (
								<TempTab data={'사용자'} />
							) : (
								<>
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === userTabs.user && (
										<UserInfoTab
											user={user}
											userUid={userUid}
										/>
									)}
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === userTabs.group && (
										<UserGroupTab
											title
											userUid={userUid}
											isSummaryOpened={isSummaryOpened}
										/>
									)}
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === userTabs.role && (
										<UserRoleTab
											userUid={userUid}
											isSummaryOpened={isSummaryOpened}
										/>
									)}
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === userTabs.tag && (
										<UserOnDescPageTags
											userUid={userUid}
											isSummaryOpened={isSummaryOpened}
										/>
									)}
								</>
							)}
						</TabContentSpace>
					</TabContainer>
				</IamSection>
			</IamContents>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userUid: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
