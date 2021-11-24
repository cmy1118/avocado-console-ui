import {useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import React, {useCallback, useMemo} from 'react';
import {parentGroupConverter} from '../../../../utils/tableDataConverter';
import {
	dummyDates,
	dummyPolicyOnRole,
	dummyUsers,
} from '../../../../utils/dummyData';
import Table from '../../../Table/Table';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import PropTypes from 'prop-types';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import TableContainer from '../../../Table/TableContainer';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';

import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';

const RoleSummary = ({Id, param, setIsOpened}) => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const {users} = useSelector(IAM_USER.selector);

	const role = useMemo(() => roles.find((v) => v.id === Id), [roles]);

	const permissionData = useMemo(() => dummyPolicyOnRole, []);

	const userData = useMemo(() => {
		return users
			?.filter((v) => role.users?.includes(v.userUid))
			.map((v, i) => ({
				...v,
				numberOfGroups: v.groups.length,
				grantDate: dummyDates[i],
				grantUser: dummyUsers[i],
				[DRAGGABLE_KEY]: v.userUid,
			}));
	}, [users, role]);
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
			?.filter((v) => role.groups?.includes(v.id))
			.map((v, i) => ({
				...v,
				clientGroupType: groupTypes.find(
					(val) => val.id === v.clientGroupTypeId,
				).name,
				numberOfPermissions: v.roles.length,
				parentGroup: parentGroupConverter(
					groups.find((val) => val.id === v.parentId)?.name,
				),
				grantDate: dummyDates[dummyDates.length - i - 1],
				grantUser: dummyUsers[dummyUsers.length - i - 1],
				[DRAGGABLE_KEY]: v.id,
			}));
	}, [role, groups, groupTypes]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {permissionData.length}
			</SummaryTableTitle>

			<TableContainer
				mode={'readOnly'}
				data={permissionData}
				tableKey={tableKeys.roles.summary.permission}
				columns={tableColumns[tableKeys.roles.summary.permission]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('user')}>
				이 역할의 사용자 : {userData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={userData}
				tableKey={tableKeys.roles.summary.user}
				columns={tableColumns[tableKeys.roles.summary.user]}
			>
				<Table />
			</TableContainer>

			<SummaryTableTitle onClick={onClickChangeTab('group')}>
				이 역할의 사용자 그룹 : {groupData.length}
			</SummaryTableTitle>
			<TableContainer
				mode={'readOnly'}
				data={groupData}
				tableKey={tableKeys.roles.summary.group}
				columns={tableColumns[tableKeys.roles.summary.group]}
			>
				<Table />
			</TableContainer>
		</SummaryTablesContainer>
	);
};

RoleSummary.propTypes = {
	Id: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default RoleSummary;
