import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {IamContainer, PathContainer} from '../../../styles/components/style';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import Table from '../../Table/Table';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import styled from 'styled-components';
import {groupTagsSummaryColumns} from '../../../utils/TableColumns/groups';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const GroupDescriptionSpace = ({groupId}) => {
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);

	const userData = useMemo(() => {
		return users
			.filter((v) => group.members.includes(v.uid))
			.map((v) => ({...v}));
	}, [users, group]);

	const tagData = useMemo(() => {
		return group.tags.map((v) => ({
			...v,
			id: v.name,
			numberOfPermissions: v.permissions.length,
		}));
	}, [group]);

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

			<div>
				<_Title>
					<div>요약 [ {group?.name} ]</div>
					<div>
						<button>그룹명 편집</button>
						<button>삭제</button>
					</div>
				</_Title>

				<ul>
					<li>그룹명 : {group?.name}</li>
					<li>
						그룹 유형 :{' '}
						{
							groupTypes.find(
								(v) => v.id === group.clientGroupTypeId,
							).name
						}
					</li>
					<li>생성 일시 : {group?.creationDate}</li>
				</ul>
			</div>

			<div>사용자: {userData.length}</div>
			<Table
				data={userData}
				tableKey={tableKeys.groupUsersSummary}
				columns={getColumnsAsKey[tableKeys.groupUsersSummary]}
			/>
			<div>태그: {tagData.length}</div>
			<Table
				data={tagData}
				tableKey={tableKeys.groupTagsSummary}
				columns={getColumnsAsKey[tableKeys.groupTagsSummary]}
			/>
		</IamContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
