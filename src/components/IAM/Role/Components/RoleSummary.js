import {useDispatch} from 'react-redux';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import PropTypes from 'prop-types';
import TableContainer from '../../../Table/TableContainer';

import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../reducers/api/IAM/User/Role/GrantRole/user';
import IAM_GRANT_POLICY_BY_ROLE from '../../../../reducers/api/IAM/User/Policy/GrantPolicy/role';
import IAM_POLICY_TEMPLATE from '../../../../reducers/api/IAM/User/Policy/policyTemplate';
import {descriptionConverter} from '../../../../utils/tableDataConverter';

const RoleSummary = ({Id, param, setIsOpened, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [group, setGroup] = useState(null);
	const [user, setUser] = useState(null);
	const [permissions, setPermissions] = useState(null);
	const permissionData = useMemo(() => {
		// console.log(JSON.parse(permissions[0].attributes));
		return (
			permissions?.map((v) => ({
				...v,
				name: JSON.parse(v.attributes).policyType,
				description: descriptionConverter(
					JSON.parse(v.attributes).policies,
				),
				policyName: v.name,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [permissions]);

	const userData = useMemo(() => {
		return [];
		// return user?.map((v, i) => ({
		// 		...v,
		// 		status:v.status.code,
		// 		groupType: v.userGroupType.name,
		// 		createdTime:v.createdTag.createdTime,
		// 		// grantDate: v.request-time,
		// 		grantUser: 'null',
		// 		//부여 사용자
		// 		[DRAGGABLE_KEY]: v.userUid,
		// 	}));
	}, [user]);

	const groupData = useMemo(() => {
		return [];
		// return group?.map((v, i) => ({
		// 		...v,
		// 		//권한수
		// 		//numberOfPermissions: v.roles.length,
		//
		// 		groupType: v.userGroupType.name,
		//
		// 		//상위그룹 어떻게 오는지 ?
		// 		parentGroup: parentGroupConverter(v.parentGroup.name),
		// 		createdTime:v.createdTag.createdTime,
		//
		// 	    //부여 일시??
		// 		grantDate: 'null',
		// 		grantUser: 'null',
		// 		[DRAGGABLE_KEY]: v.id,
		// 	}));
	}, [group]);

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

	//권한 To 유섭님
	useEffect(() => {
		dispatch(
			IAM_GRANT_POLICY_BY_ROLE.asyncAction.getsAction({
				roleId: Id,
				range: `elements=0-50`,
			}),
		)
			.unwrap()
			.then((policies) => {
				const arr = [];
				policies.data.forEach((policy) => {
					dispatch(
						IAM_POLICY_TEMPLATE.asyncAction.findByIdAction({
							templateId: policy.templateId,
						}),
					)
						.unwrap()
						.then((res) => {
							arr.push({...policy, template: res.data});
							if (arr.length === policies.data.length) {
								console.log(arr);
								// setPermissions(arr);
							}
						});
				});
			});
	}, [Id, dispatch]);

	//이 역할의 사용자
	useEffect(() => {
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					id: Id,
				}),
			)
				.unwrap()
				.then((res) => setUser(res));
	}, [Id, dispatch, isSummaryOpened, setUser]);

	//이 역할의 사용자 그룹.
	useEffect(() => {
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.findUserGroupsById({
					id: Id,
				}),
			)
				.unwrap()
				.then((res) => setGroup(res));
	}, [Id, dispatch, isSummaryOpened, setGroup]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {permissionData?.length}
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
				이 역할의 사용자 : {userData?.length}
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
				이 역할의 사용자 그룹 : {groupData?.length}
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
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default RoleSummary;
