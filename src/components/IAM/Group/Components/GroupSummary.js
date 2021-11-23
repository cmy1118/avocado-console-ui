import React, {useCallback, useEffect, useMemo} from 'react';
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

const GroupSummary = ({Id, param, setIsOpened}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {members} = useSelector(IAM_USER_GROUP_MEMBER.selector);
	const {page} = useSelector(PAGINATION.selector);
	const group = useMemo(() => groups.find((v) => v.id === Id), [groups, Id]);

	const userData = useMemo(() => {
		return users
			.filter((v) => v.groupIds && v.groupIds.includes(Id))
			.map((v, i) => ({
				...v,
				id: v.id,
				name: v.name,
				groupsLength: v.groupIds ? v.groupIds.length : 0,
				status: v.status.code,
				createdTime: v.createdTag.createdTime,
				grantUser: members.find((x) => x.userUid === v.userUid)
					?.grantedTag.userUid,
				[DRAGGABLE_KEY]: v.userUid,
				// groupsLength: v.groups.length,
				// grantUser: dummyUsers[i],
			}));
	}, [Id, members, users]);

	const roleData = useMemo(() => dummyPolicyOnGroup, []);

	const tagData = useMemo(() => {
		return [];

		// return group.tags.map((v, i) => ({
		// 	...v,
		// 	id: v.name,
		// 	numberOfPermissions: v.permissions.length,
		// 	creationDate: dummyDates[i],
		// }));
	}, []);

	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${Id}`,
				search: `tabs=${v}`,
			});
		},
		[setIsOpened, history, param, Id],
	);

	useEffect(() => {
		dispatch(
			IAM_USER.asyncAction.findAllAction({
				range: 'elements=0-50',
			}),
		);
		dispatch(
			IAM_USER_GROUP_MEMBER.asyncAction.findAllAction({
				groupId: Id,
				range: 'elements=0-50',
			}),
		);
	}, [Id, dispatch]);

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
	Id: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default GroupSummary;
