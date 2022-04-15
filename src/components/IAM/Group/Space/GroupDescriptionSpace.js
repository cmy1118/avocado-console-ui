import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';

import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import {HoverIconButton} from '../../../../styles/components/icons';
import {NormalButton, TransparentButton,} from '../../../../styles/components/buttons';
import {LiText} from '../../../../styles/components/text';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import TabBar from '../../TabBar';
import qs from 'qs';
import PropTypes from 'prop-types';

import {CoveredByTabContent, TabContainer, TabContentSpace,} from '../../../../styles/components/iam/iamTab';
import {SummaryContainer, SummaryList,} from '../../../../styles/components/iam/descriptionPage';
import {
	IamContainer,
	IamContents,
	IamSection,
	IamSectionTitleBar,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {groupTabs} from '../../../../utils/tabs';
import {RowDiv} from '../../../../styles/components/style';
import TempTab from '../../TempTab';
import GroupUserTab from '../Components/Description/Tabs/GroupUserTab';
import GroupRoleTab from '../Components/Description/Tabs/GroupRoleTab';
import GroupTagTab from '../Components/Description/Tabs/GroupTagTab';
import GroupSummary from '../Components/Description/GroupSummary';

const GroupDescriptionSpace = ({groupId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const {members} = useSelector(IAM_USER_GROUP_MEMBER.selector);
	const [isOpened, setIsOpened] = useState(true);
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
	}, [history, isSummaryOpened, location.pathname]);

	const onClickChangeGroupName = useCallback(() => {
		history.push('/groups/add');
		setIsOpened(true);
	}, [history]);

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

			<TitleBar>
				<RowDiv
					alignItems={'center'}
					width={'100%'}
					justifyContent={'space-between'}
				>
					<div>{group ? group.name : ''}</div>
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
					</IamSectionTitleBar>

					<SummaryContainer>
						<SummaryList>
							<LiText>그룹명 : {group?.name}</LiText>
							<LiText>
								그룹 유형 : {group?.userGroupType.name}
							</LiText>
							<LiText>
								생성 일시 : {group?.createdTag.createdTime}
							</LiText>
						</SummaryList>
					</SummaryContainer>

					<CoveredByTabContent isOpened={isSummaryOpened}>
						<GroupSummary groupId={groupId} />
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
								<TempTab data={'그룹'} />
							) : (
								<>
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === groupTabs.user && (
										<GroupUserTab
											groupId={groupId}
											isSummaryOpened={isSummaryOpened}
										/>
									)}
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === groupTabs.role && (
										<GroupRoleTab
											groupId={groupId}
											isSummaryOpened={isSummaryOpened}
										/>
									)}
									{qs.parse(location.search, {
										ignoreQueryPrefix: true,
									}).tabs === groupTabs.tag && (
										<GroupTagTab
											groupId={groupId}
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

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
