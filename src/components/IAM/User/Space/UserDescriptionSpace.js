import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import qs from 'qs';

import UserInfoTab from '../Components/UserInfoTab';
import UserGroupsTab from '../Components/UserGroupsTab';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import UserOnDescPageTags from '../Components/UserOnDescPageTags';
import UserSummary from '../Components/UserSummary';
import UserRolesTab from '../Components/UserRolesTab';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import {HoverIconButton} from '../../../../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import TabBar from '../../TabBar';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {FOLD_DATA} from '../../../../utils/data';
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
	SummaryList,
} from '../../../../styles/components/iam/descriptionPage';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';

const UserDescriptionSpace = ({userUid}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {search} = useLocation();
	const [user, setUser] = useState(null);

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	const TabBarInfo = [
		{name: '정보', href: 'user'},
		{name: '그룹', href: 'group'},
		{name: '권한', href: 'role'},
		{name: '태그', href: 'tag'},
	];

	const onClickFoldSummary = useCallback(() => {
		setIsSummaryOpened(!isSummaryOpened);
		if (isSummaryOpened) {
			history.push({
				pathname: `/users/${userUid}`,
				search: 'tabs=user',
			});
		} else {
			history.push({
				pathname: `/users/${userUid}`,
			});
		}
	}, [history, isSummaryOpened, userUid]);

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
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/users'>사용자</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to={`/users/${userUid}`}>
					{user?.name}
				</CurrentPathBarLink>
			</CurrentPathBar>
			<DescriptionPageContainer>
				<div>
					<TitleBar className={'subHeader'}>
						<TitleBarText>
							<HoverIconButton
								color={'font'}
								size={'m'}
								margin={'0px'}
								onClick={onClickFoldSummary}
							>
								{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
							</HoverIconButton>
							요약 [ {user?.id} ]
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
					</TitleBar>

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
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<UserSummary
						userUid={userUid}
						param={'users'}
						setIsOpened={setIsSummaryOpened}
					/>
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar
						Tabs={TabBarInfo}
						param={'users'}
						id={userUid}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>

					<TabContentSpace>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && <UserInfoTab userUid={userUid} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'group' && (
							<UserGroupsTab
								title
								userUid={userUid}
								space={'UserGroupsTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && (
							<UserRolesTab
								userUid={userUid}
								space={'UserRolesTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'tag' && (
							<UserOnDescPageTags
								userUid={userUid}
								space={'UserOnDescPageTags'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
							/>
						)}
					</TabContentSpace>
				</TabContainer>
			</DescriptionPageContainer>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userUid: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
