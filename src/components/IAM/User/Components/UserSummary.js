import PropTypes from 'prop-types';
import {parentGroupConverter} from '../../../../utils/tableDataConverter';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	dummyDates,
	dummyPolicyOnUser,
	dummyUsers,
} from '../../../../utils/dummyData';

import TableContainer from '../../../Table/TableContainer';
import Table from '../../../Table/Table';
import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';

const UserSummary = ({Id, param, setIsOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const user = useMemo(() => users.find((v) => v.userUid === Id), [
		users,
		Id,
	]);

	console.log(user);

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

	const groupData = useMemo(() => {
		return groups
			.filter((v) =>
				user.groupIds
					? user.groupIds.includes(v.id)
					: [].includes(v.id),
			)
			.map((v) => ({
				...v,
				userGroupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name,
				DRAGGABLE_KEY: v.id,
			}));
		// return groups
		// 	.filter((v) => user.groups.includes(v.id))
		// 	.map((v, i) => ({
		// 		...v,
		// 		clientGroupType: groupTypes.find(
		// 			(val) => val.id === v.clientGroupTypeId,
		// 		).name,
		// 		type: groupTypes.find((val) => val.id === v.clientGroupTypeId)
		// 			?.name,
		// 		numberOfRoles: v.roles.length,
		// 		parentGroup: parentGroupConverter(
		// 			groups.find((val) => val.id === v.parentId)?.name,
		// 		),
		// 		grantDate: dummyDates[i],
		// 		grantUser: dummyUsers[i],
		// 	}));
	}, [groups, user]);

	const roleData = useMemo(() => dummyPolicyOnUser, []);

	const tagData = useMemo(() => {
		return [];
		// return user.tags.map((v, i) => ({
		// 	...v,
		// 	id: v.name,
		// 	numberOfPermissions: v.permissions.length,
		// }));
	}, []);

	useEffect(() => {
		user &&
			dispatch(
				IAM_USER_GROUP.asyncAction.findAllAction({
					// ids: user.groupIds,
					range: 'elements=0-50',
				}),
			);
	}, [dispatch, user]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('group')}>
				그룹 : {groupData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={groupData}
				tableKey={tableKeys.users.summary.group}
				columns={tableColumns[tableKeys.users.summary.group]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={roleData}
				tableKey={tableKeys.users.summary.permission}
				columns={tableColumns[tableKeys.users.summary.permission]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={tagData}
				tableKey={tableKeys.users.summary.tag}
				columns={tableColumns[tableKeys.users.summary.tag]}
			>
				<Table />
			</TableContainer>
		</SummaryTablesContainer>
	);
};

UserSummary.propTypes = {
	Id: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default UserSummary;
