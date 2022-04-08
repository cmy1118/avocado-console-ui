import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import GroupSummary from '../Components/GroupSummary';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import {HoverIconButton} from '../../../../styles/components/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {FOLD_DATA} from '../../../../utils/data';
import {LiText} from '../../../../styles/components/text';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import TabBar from '../../TabBar';
import qs from 'qs';
import GroupRolesTab from '../Components/GroupRolesTab';
import GroupUsersTab from '../Components/GroupUsersTab';
import GroupOnDescPageTags from '../Components/GroupOnDescPageTags';
import PropTypes from 'prop-types';

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
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {tableKeys} from '../../../../Constants/Table/keys';
import IAM_USER_POLICY from '../../../../reducers/api/IAM/User/Policy/policy';
import {groupTabs} from '../../../../utils/tabs';

const GroupDescriptionSpace = ({groupId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const {members} = useSelector(IAM_USER_GROUP_MEMBER.selector);
	const [isOpened, setIsOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);
	const [group, setGroup] = useState(null);

	const isSummaryOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);

	const paths = useMemo(
		() => [
			{url: '/iam', label: 'IAM'},
			{url: '/groups', label: '사용자 그룹'},
			{url: '/groups/' + group?.id, label: group?.name},
		],
		[group],
	);

	const TabBarInfo = [
		{name: '사용자', href: groupTabs.user},
		{name: '권한', href: groupTabs.role},
		{name: '태그', href: groupTabs.tag},
	];

	let onClickFoldSummary;
	onClickFoldSummary = useCallback(() => {
		if (isSummaryOpened) {
			history.push({
				pathname: location.pathname,
				search: `tabs=${groupTabs.user}`,
			});
		} else {
			history.push({
				pathname: location.pathname,
			});
		}
	}, [isSummaryOpened, location]);

	const onClickChangeGroupName = useCallback(() => {
		setIsOpened(true);
	}, [setIsOpened]);

	//그룹 삭제 이벤트 핸들러 함수
	const onClickDeleteGroup = useCallback(async () => {
		try {
			await dispatch(
				IAM_USER_GROUP.asyncAction.deleteAction({
					id: groupId,
				}),
			).unwrap();
			await history.push({pathname: `/groups/`});
			alert('그룹 삭제 완료');
		} catch (a) {
			alert('그룹 삭제 오류');
			console.log(a);
		}
	}, [dispatch, groupId, history]);

	//그룹 id 조회 함수
	const findByIdApi = useCallback(async () => {
		try {
			const group = await dispatch(
				IAM_USER_GROUP.asyncAction.findByIdAction({
					id: groupId,
				}),
			).unwrap();
			console.log('findByIdApi:', group);
			await setGroup(group);
		} catch (err) {
			alert('api 호출 에러');
			console.log(err);
		}
	}, [dispatch, groupId]);

	useEffect(() => {
		//그룹 id 정보 조회
		findByIdApi();
	}, [findByIdApi]);

	useEffect(() => {
		if (isSummaryOpened && history.location.search)
			history.push({
				pathname: `/groups/${groupId}`,
			});
	}, [history, isSummaryOpened, groupId]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<DescriptionPageContainer>
				<div>
					<TitleBar>
						<TitleBarText>
							<HoverIconButton
								color={'font'}
								size={'m'}
								margin={'0px'}
								onClick={onClickFoldSummary}
							>
								{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
							</HoverIconButton>
							요약 [ {group?.name} ]
						</TitleBarText>

						<TitleBarButtons>
							<NormalButton onClick={onClickChangeGroupName}>
								그룹 생성
							</NormalButton>
							<TransparentButton
								onClick={onClickDeleteGroup}
								margin={'0px 0px 0px 5px'}
							>
								삭제
							</TransparentButton>
						</TitleBarButtons>
					</TitleBar>

					<SummaryList>
						<LiText>그룹명 : {group?.name}</LiText>
						<LiText>그룹 유형 : {group?.userGroupType.name}</LiText>
						<LiText>
							생성 일시 : {group?.createdTag.createdTime}
						</LiText>
					</SummaryList>
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<GroupSummary groupId={groupId} />
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar Tabs={TabBarInfo} />
					<TabContentSpace>
						{qs.parse(location.search, {ignoreQueryPrefix: true})
							.tabs === groupTabs.user && (
							<GroupUsersTab
								groupId={groupId}
								space={'GroupUsersTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
							/>
						)}
						{qs.parse(location.search, {ignoreQueryPrefix: true})
							.tabs === groupTabs.role && (
							<GroupRolesTab
								groupId={groupId}
								space={'GroupRolesTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
								isSummaryOpened={isSummaryOpened}
							/>
						)}
						{qs.parse(location.search, {ignoreQueryPrefix: true})
							.tabs === groupTabs.tag && (
							<GroupOnDescPageTags
								groupId={groupId}
								space={'GroupOnDescPageTags'}
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

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
