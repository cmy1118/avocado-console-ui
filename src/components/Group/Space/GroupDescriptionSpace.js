import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {
	AppBarNavi,
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
import {errorIcon} from '../../../icons/icons';
import {HoverIconButton} from '../../../styles/components/icons';
import {NaviLink} from '../../../styles/components/link';

const GroupDescriptionSpace = ({groupId}) => {
	const history = useHistory();
	const {search} = useLocation();

	const {groups} = useSelector(IAM_USER_GROUP.selector);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: `/groups/${groupId}`,
				search: `tabs=${v}`,
			});
		},
		[groupId, history],
	);
	// if groupId does not exist, direct to 404 page
	useEffect(() => {
		if (groupId && !group) {
			history.push('/404');
		}
	}, [groupId, group, history]);

	return (
		<IamContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups'>사용자 그룹</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to={`/groups/${groupId}`}>{groupId}</NaviLink>
				</PathContainer>
				<HoverIconButton onClick={onClickCloseAside}>
					{errorIcon}
				</HoverIconButton>
			</AppBarNavi>

			<GroupSummary groupId={groupId} />

			<div>
				<Tab>
					<TabItem onClick={onClickChangeTab('user')}>사용자</TabItem>
					<TabItem onClick={onClickChangeTab('role')}>권한</TabItem>
					<TabItem onClick={onClickChangeTab('tag')}>태그</TabItem>
				</Tab>

				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'user' && <GroupUsersTab groupId={groupId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'role' && <GroupRolesTab groupId={groupId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'tag' && (
					<GroupOnDescPageTags groupId={groupId} />
				)}
			</div>
		</IamContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
