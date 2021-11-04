import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
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
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {Tab, TabItem} from '../../../styles/components/tab';
import GroupRolesTab from '../Components/GroupRolesTab';
import GroupSummary from '../Components/GroupSummary';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;
import GroupOnDescPageTags from '../Components/GroupOnDescPageTags';
import GroupUsersTab from '../Components/GroupUsersTab';
import {onClickCloseAside} from '../../Aside/Aside';
import {arrowDownIcon, arrowRightIcon, arrowUpIcon, errorIcon} from '../../../icons/icons';
import {HoverIconButton, IconButton} from '../../../styles/components/icons';
import {NaviLink} from '../../../styles/components/link';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import TabBar from '../../Tab/TabBar';

const GroupDescriptionSpace = ({groupId}) => {
	const history = useHistory();
	const {search} = useLocation();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isOpend, setIsOpend] = useState(true);

	const TabBarInfo = [
		{name: '사용자', href: 'user'},
		{name: '권한', href: 'role'},
		{name: '태그', href: 'tag'},
	];

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	// const onClickChangeTab = useCallback(
	// 	(v) => () => {
	// 		history.push({
	// 			pathname: `/groups/${groupId}`,
	// 			search: `tabs=${v}`,
	// 		});
	// 	},
	// 	[groupId, history],
	// );
	const onClickFoldSummary = useCallback(() => {
		setIsSummaryOpened(!isSummaryOpened);
	}, [isSummaryOpened]);
	// if groupId does not exist, direct to 404 page
	useEffect(() => {
		if (groupId && !group) {
			history.push('/404');
		}
	}, [groupId, group, history]);

	return (
		<DetailContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups'>사용자 그룹</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to={`/groups/${groupId}`}>{group?.name}</NaviLink>
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
						{isSummaryOpened ? arrowDownIcon : arrowRightIcon}
					</IconButton>
					요약 [ {group?.name} ]
				</div>
				<AppBarButtons>
					<NormalButton onClick={() => setIsOpend(true)}>
						그룹명 편집
					</NormalButton>
					<TransparentButton>삭제</TransparentButton>
				</AppBarButtons>
			</AppBarContents>
			{isSummaryOpened ? (
				<GroupSummary
					groupId={groupId}
					isOpened={isSummaryOpened}
					setIsOpened={setIsSummaryOpened}
				/>
			) : (
				''
			)}

			<div>
				<div className={isSummaryOpened ? 'tabBar fix' : 'tabBar'}>
					<TabBar
						Tabs={TabBarInfo}
						param={'groups'}
						Id={groupId}
						isOpened={isSummaryOpened}
						setIsOpened={setIsSummaryOpened}
					/>
				</div>
				{!isSummaryOpened && (
					<div style={{padding: '10px 16px'}}>
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'user' && <GroupUsersTab groupId={groupId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'role' && <GroupRolesTab groupId={groupId} />}
						{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
							'tag' && <GroupOnDescPageTags groupId={groupId} />}
					</div>
				)}
			</div>
		</DetailContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
