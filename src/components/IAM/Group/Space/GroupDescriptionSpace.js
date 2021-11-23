import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import GroupSummary from '../Components/GroupSummary';
import {arrowDownIcon, arrowUpIcon} from '../../../../icons/icons';
import {HoverIconButton, IconButton} from '../../../../styles/components/icons';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
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

const GroupDescriptionSpace = ({groupId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {search} = useLocation();

	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isOpened, setIsOpened] = useState(true);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	const TabBarInfo = [
		{name: '사용자', href: 'user'},
		{name: '권한', href: 'role'},
		{name: '태그', href: 'tag'},
	];

	const group = useMemo(() => groups.find((v) => v.id === groupId) || {}, [
		groups,
		groupId,
	]);

	console.log(group);

	let onClickFoldSummary;
	onClickFoldSummary = useCallback(() => {
		setIsSummaryOpened(!isSummaryOpened);
		if (isSummaryOpened) {
			history.push({
				pathname: `/groups/${groupId}`,
				search: 'tabs=user',
			});
		} else {
			history.push({
				pathname: `/groups/${groupId}`,
			});
		}
	}, [history, isSummaryOpened, groupId]);

	const onClickChangeGroupName = useCallback(() => {
		setIsOpened(true);
	}, [setIsOpened]);

	const onClickDeleteGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.asyncAction.deleteAction({
				id: groupId,
			}),
		);
	}, [dispatch, groupId]);

	// if groupId does not exist, direct to 404 page
	useEffect(() => {
		if (groupId && !group) {
			history.push('/404');
		}
		history.push(`${groupId}`);
	}, [groupId, group, history]);

	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups'>
					사용자 그룹
				</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to={`/groups/${groupId}`}>
					{group?.name}
				</CurrentPathBarLink>
			</CurrentPathBar>
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
						<LiText>그룹 유형 : {group.userGroupType.name}</LiText>
						<LiText>생성 일시 : {group?.creationDate}</LiText>
					</SummaryList>
				</div>

				<CoveredByTabContent isOpened={isSummaryOpened}>
					<GroupSummary
						Id={groupId}
						param={'groups'}
						setIsOpened={setIsSummaryOpened}
					/>
				</CoveredByTabContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar
						Tabs={TabBarInfo}
						param={'groups'}
						Id={groupId}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>
					<TabContentSpace>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && (
							<GroupUsersTab
								groupId={groupId}
								space={'GroupUsersTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && (
							<GroupRolesTab
								groupId={groupId}
								space={'GroupRolesTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'tag' && (
							<GroupOnDescPageTags
								groupId={groupId}
								space={'GroupOnDescPageTags'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
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
