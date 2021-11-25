import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {dummyPolicyOnGroup} from '../../../../utils/dummyData';
import TableContainer from '../../../Table/TableContainer';
import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import PAGINATION from '../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';

const GroupSummary = ({groupId, param, setIsOpened}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [groupUserMembers, setGroupUserMembers] = useState([]);

	console.log(groupUserMembers);

	const userData = useMemo(() => {
		return groupUserMembers.map((v) => ({
			...v,
			id: v.id,
			name: v.name,
			groupsLength: v.groupIds ? v.groupIds.length : 0,
			status: v.status.code,
			createdTime: v.createdTag.createdTime,
			// grantUser: groupUserMembers.find((x) => x.userUid === v.userUid)
			// 	?.grantedTag.userUid,
			[DRAGGABLE_KEY]: v.userUid,
		}));
	}, [groupUserMembers]);

	const roleData = useMemo(() => [], []);

	const tagData = useMemo(() => {
		return [];

		// return group.tags.map((v, i) => ({
		// 	...v,
		// 	id: v.name,
		// 	numberOfPermissions: v.permissions.length,
		// 	createdTime: dummyDates[i],
		// }));
	}, []);

	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${groupId}`,
				search: `tabs=${v}`,
			});
		},
		[setIsOpened, history, param, groupId],
	);

	useEffect(() => {
		dispatch(
			IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
				groupId: groupId,
				range: 'elements=0-50', // todo : 상세 페이지는 페이지네이션이 없음 => how?
			}),
		)
			.unwrap()
			.then((v) => v.map((x) => x.userUid))
			.then(async (uids) => {
				const arr = [];
				for await (let value of uids) {
					dispatch(
						IAM_USER.asyncAction.findByUidAction({
							userUid: value,
						}),
					)
						.unwrap()
						.then((data) => {
							console.log(data);
							arr.push(data);
							if (arr.length === uids.length)
								setGroupUserMembers(arr);
						});
				}
			});
	}, [dispatch, groupId]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('user')}>
				사용자 : {userData.length}
			</SummaryTableTitle>

			<TableContainer
				mode={'readOnly'}
				data={userData}
				tableKey={tableKeys.groups.summary.user}
				columns={tableColumns[tableKeys.groups.summary.user]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={roleData}
				tableKey={tableKeys.groups.summary.permission}
				columns={tableColumns[tableKeys.groups.summary.permission]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={tagData}
				tableKey={tableKeys.groups.summary.tag}
				columns={tableColumns[tableKeys.groups.summary.tag]}
			>
				<Table />
			</TableContainer>
		</SummaryTablesContainer>
	);
};

GroupSummary.propTypes = {
	groupId: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default GroupSummary;
