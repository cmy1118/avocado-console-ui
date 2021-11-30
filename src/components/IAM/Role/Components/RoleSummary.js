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
import {
	descriptionConverter,
	expiredConverter,
} from '../../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_POLICY_TEMPLATE from '../../../../reducers/api/IAM/User/Policy/policyTemplate';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';

const RoleSummary = ({Id, param, setIsOpened, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [group, setGroup] = useState([]);
	const [user, setUser] = useState([]);
	const [permissions, setPermissions] = useState(null);
	const permissionData = useMemo(() => {
		console.log(permissions);
		return (
			permissions?.map((v) => ({
				...v,
				description: descriptionConverter(v.attributes[0].policies),
				type: v.attributes[0].policyType,
				policyName: v.name,
				grantUser: v.user,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [permissions]);

	const userData = useMemo(() => {
		// return [];
		console.log('userData:', user);
		return (
			user?.map((v, i) => ({
				...v,
				id: v.userUid,
				numberOfGroups: v.groups.length,
				status: v.status.code,
				createdTime: v.createdTag.createdTime,
				passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
				// tags: tagsConverter(v.tags),
				[DRAGGABLE_KEY]: v.userUid,
			})) || []
		);
	}, [user]);

	const groupData = useMemo(() => {
		// return [];
		return (
			group?.map((v) => ({
				...v,
				groupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name ? v.parentGroup.name : '없음',
				createdTime: v.createdTag.createdTime,
				grantDate: 'null',
				grantUser: 'null',
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
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
				if (!policies.data) {
					setPermissions([]);
					return;
				}
				policies.data.forEach((policy) => {
					dispatch(
						IAM_USER.asyncAction.findByUidAction({
							userUid: policy.createdTag.actorTag.userUid,
						}),
					)
						.unwrap()
						.then((user) => {
							dispatch(
								IAM_POLICY_TEMPLATE.asyncAction.findByIdAction({
									templateId: policy.templateId,
								}),
							)
								.unwrap()
								.then((res) => {
									arr.push({...policy, user, ...res.data});
									if (arr.length === policies.data.length) {
										console.log(arr);
										setPermissions(arr);
									}
								});
						});
				});
			});
	}, [Id, dispatch]);

	//이 역할의 사용자
	useEffect(() => {
		const arr = [];
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					id: Id,
				}),
			)
				.unwrap()
				.then((users) => {
					if (!users[0]) {
						setUser(users);
						return;
					}
					users.map((id) => {
						console.log('이 역할의 사용자 id:', id);
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: id,
							}),
						)
							.unwrap()
							.then((res) => {
								if (users.length === arr.length) {
									arr.push(res);
									console.log(' 사용자 정보:', res);
									setUser(arr);
								}
							});
					});
				});
	}, [Id, dispatch, isSummaryOpened, setUser]);

	//이 역할의 사용자 그룹.
	useEffect(() => {
		console.log('\t//이 역할의 사용자 그룹.\n');
		const arr = [];
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.findUserGroupsById({
					id: Id,
				}),
			)
				.unwrap()
				.then((groups) =>
					groups.map((id) => {
						console.log('이 역할의 그룹 id:', id);
						dispatch(
							IAM_USER_GROUP.asyncAction.findByIdAction({
								id: id,
							}),
						)
							.unwrap()
							.then((res) => {
								arr.push(res);
								console.log(' 그룹 정보:', res);
								setGroup(arr);
							});
					}),
				);
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
				이 역할의 사용자 : {user?.length}
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
