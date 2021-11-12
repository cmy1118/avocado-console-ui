import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {
	AppBarButtons,
	SubHeader,
	SubHeaderText,
	SummaryList,
} from '../../../styles/components/style';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import GroupSummary from '../Components/GroupSummary';
import {arrowDownIcon, arrowUpIcon} from '../../../icons/icons';
import {HoverIconButton, IconButton} from '../../../styles/components/icons';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {FOLD_DATA} from '../../../utils/data';
import {LiText} from '../../../styles/components/text';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import TabBar from '../../Tab/TabBar';
import qs from 'qs';
import GroupRolesTab from '../Components/GroupRolesTab';
import GroupUsersTab from '../Components/GroupUsersTab';
import GroupOnDescPageTags from '../Components/GroupOnDescPageTags';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	CoveredContent,
	DescriptionPageContainer,
	TabContainer,
	TabContents,
	ContentsContainer,
} from '../../../styles/components/tab';

const GroupDescriptionSpace = ({groupId}) => {
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

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

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
	// if groupId does not exist, direct to 404 page
	useEffect(() => {
		if (groupId && !group) {
			history.push('/404');
		}
		history.push(`${groupId}`);
	}, [groupId, group, history]);

	return (
		<DescriptionPageContainer>
			<CurrentPathContainer>
				<AppBarLink to='/iam'>IAM</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/groups'>사용자 그룹</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to={`/groups/${groupId}`}>{group?.name}</AppBarLink>
			</CurrentPathContainer>
			<ContentsContainer>
				<div>
					<SubHeader>
						<SubHeaderText>
							<HoverIconButton
								color={'font'}
								size={'m'}
								margin={'0px'}
								onClick={onClickFoldSummary}
							>
								{isSummaryOpened ? arrowDownIcon : arrowUpIcon}
							</HoverIconButton>
							요약 [ {group?.name} ]
						</SubHeaderText>

						<AppBarButtons>
							<NormalButton onClick={onClickChangeGroupName}>
								그룹명 편집
							</NormalButton>
							<TransparentButton margin={'0px 0px 0px 5px'}>
								삭제
							</TransparentButton>
						</AppBarButtons>
					</SubHeader>

					<SummaryList>
						<LiText>그룹명 : {group?.name}</LiText>
						<LiText>
							그룹 유형 :{' '}
							{
								groupTypes.find(
									(v) => v.id === group.clientGroupTypeId,
								).name
							}
						</LiText>
						<LiText>생성 일시 : {group?.creationDate}</LiText>
					</SummaryList>
				</div>

				<CoveredContent isOpened={isSummaryOpened}>
					<GroupSummary
						Id={groupId}
						param={'groups'}
						setIsOpened={setIsSummaryOpened}
					/>
				</CoveredContent>

				<TabContainer isOpened={!isSummaryOpened}>
					<TabBar
						Tabs={TabBarInfo}
						param={'groups'}
						Id={groupId}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>
					<TabContents>
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
					</TabContents>
				</TabContainer>
			</ContentsContainer>
		</DescriptionPageContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
