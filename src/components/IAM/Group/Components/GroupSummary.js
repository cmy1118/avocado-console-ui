import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import PAGINATION from '../../../../reducers/pagination';
import IAM_USER_GROUP_MEMBER from '../../../../reducers/api/IAM/User/Group/groupMember';

const GroupSummary = ({groupId, param, setIsOpened, isSummaryOpened}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [groupUserMembers, setGroupUserMembers] = useState([]);

	//console.log(groupUserMembers);

	const userData = useMemo(() => {
		return groupUserMembers.map((v) => ({
			...v,
			id: v.id,
			name: v.name,
			groupsLength: v.groups ? v.groups.length : 0,
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
		isSummaryOpened &&
			dispatch(
				IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
					groupId: groupId,
					range: 'elements=0-50', // todo : 상세 페이지는 페이지네이션이 없음 => how?
				}),
			)
				.unwrap()
				.then((member) => {
					//	console.log(member.data);
					return member.data.map((x) => x.userUid);
				})
				.then((uids) => {
					const arr = [];
					//	console.log(uids);
					if (!uids) return;
					uids.forEach((uid) => {
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: uid,
							}),
						)
							.unwrap()
							.then((data) => {
								console.log(data);
								arr.push(data);
								if (arr.length === uids.length)
									setGroupUserMembers(arr);
							});
					});
				});
	}, [dispatch, groupId, isSummaryOpened]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('user')}>
				사용자 : {userData.length}
			</SummaryTableTitle>

			<Table
				readOnly
				data={userData}
				tableKey={tableKeys.groups.summary.user}
				columns={tableColumns[tableKeys.groups.summary.user]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={roleData}
				tableKey={tableKeys.groups.summary.permission}
				columns={tableColumns[tableKeys.groups.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={tagData}
				tableKey={tableKeys.groups.summary.tag}
				columns={tableColumns[tableKeys.groups.summary.tag]}
			/>
		</SummaryTablesContainer>
	);
};

GroupSummary.propTypes = {
	groupId: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default GroupSummary;
