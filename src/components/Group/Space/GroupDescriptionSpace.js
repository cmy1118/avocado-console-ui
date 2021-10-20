import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import qs from 'qs';

import {IamContainer, PathContainer} from '../../../styles/components/style';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {Tab, TabItem} from '../../../styles/components/tab';
import GroupRolesTab from '../Components/GroupRolesTab';
import GroupSummary from '../Components/GroupSummary';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

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
		[],
	);
	// if groupId does not exist, direct to 404 page
	useEffect(() => {
		if (groupId && !group) {
			history.push('/404');
		}
	}, [groupId, group]);

	return (
		<IamContainer>
			<div>
				<PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/groups'>사용자 그룹</Link>
					<div>{' > '}</div>
					<Link to={`/groups/${groupId}`}>{groupId}</Link>
				</PathContainer>
			</div>

			<_Title>
				<div>요약 [ {group?.name} ]</div>
				<div>
					<button>그룹명 편집</button>
					<button>삭제</button>
				</div>
			</_Title>

			<GroupSummary groupId={groupId} />

			<div>
				<Tab>
					<TabItem onClick={onClickChangeTab('user')}>사용자</TabItem>
					<TabItem onClick={onClickChangeTab('role')}>권한</TabItem>
					<TabItem onClick={onClickChangeTab('tag')}>태그</TabItem>
				</Tab>

				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'user' && <div>users</div>}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs ===
					'role' && <GroupRolesTab groupId={groupId} />}
				{qs.parse(search, {ignoreQueryPrefix: true}).tabs === 'tag' && (
					<div>tag</div>
				)}
			</div>
		</IamContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
