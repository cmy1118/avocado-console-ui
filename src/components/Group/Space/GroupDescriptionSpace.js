import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {
	AppBarButtons,
	AppBarContentsHeader,
	AppBarNavi,
	DetailContainer,
	PathContainer,
} from '../../../styles/components/style';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import GroupRolesTab from '../Components/GroupRolesTab';
import GroupSummary from '../Components/GroupSummary';
import GroupOnDescPageTags from '../Components/GroupOnDescPageTags';
import GroupUsersTab from '../Components/GroupUsersTab';
import {arrowDownIcon, arrowRightIcon} from '../../../icons/icons';
import {IconButton} from '../../../styles/components/icons';
import {NaviLink} from '../../../styles/components/link';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import TabBar from '../../Tab/TabBar';
import {FOLD_DATA} from '../../../utils/data';

const GroupDescriptionSpace = ({groupId}) => {
	const history = useHistory();
	const {search} = useLocation();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [isSummaryOpened, setIsSummaryOpened] = useState(true);
	const [isOpend, setIsOpend] = useState(true);
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
					<NaviLink to='/iam'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups'>사용자 그룹</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to={`/groups/${groupId}`}>{group?.name}</NaviLink>
				</PathContainer>
			</AppBarNavi>

			<AppBarContentsHeader>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<IconButton
						color={'font'}
						size={'m'}
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
					<TransparentButton margin={'0px 0px 0px 5px'}>
						삭제
					</TransparentButton>
				</AppBarButtons>
			</AppBarContentsHeader>
			{isSummaryOpened && (
				<GroupSummary
					groupId={groupId}
					isOpened={isSummaryOpened}
					setIsOpened={setIsSummaryOpened}
				/>
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
							'role' && (
							<GroupRolesTab
								groupId={groupId}
								space={'GroupRolesTab'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
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
							'tag' && (
							<GroupOnDescPageTags
								groupId={groupId}
								space={'GroupOnDescPageTags'}
								isFold={isTableFold}
								setIsFold={setIsTableFold}
							/>
						)}
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
