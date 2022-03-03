import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Table from '../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../reducers/api/IAM/User/Role/GrantRole/user';
import {
	descriptionConverter,
	descValues,
	expiredConverter,
} from '../../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import PAM_SESSION from '../../../../reducers/api/PAM/session';
import AUTH from '../../../../reducers/api/Auth/auth';
import {account} from '../../../../utils/auth';
import {TableMode} from '../../../../Constants/Table/mode';

const roleSummary = {
	policy: '권한/정책 : ',
	user: '이 역할의 사용자 : ',
	group: '이 역할의 사용자 그룹 : ',
};

/**************************************************
 * ambacc244 - 이 역할의 권한,정책 이 역할을 가지는 사용자,그룹들을 보여줌
 **************************************************/
const RoleSummary = ({roleId, param, setIsOpened, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	//permissions: 이 역할의 권한,정책
	const [permissions, setPermissions] = useState(null);
	//user: 이 역할을 가지는 사용자
	const [user, setUser] = useState([]);
	//group: 이 역할을 가지는 그룹
	const [group, setGroup] = useState([]);
	//permissionData: 이 역할의 권한,정책(화면에 필요에 따라 수정)
	const permissionData = useMemo(() => {
		return (
			permissions?.map((v) => ({
				id: v.role.id + v.policy.templateId,
				name: descValues(v.policy.details[0].policyType),
				description: ` ${descriptionConverter(v.policy.details)}`,
				policyName: v.policy.templateName,
				roleName: v.role.name,
				grantUser: v.user,
				type: descValues(v.policy.details[0].policyType),
				createdTime: v.policy.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.role.id + v.policy.templateId,
			})) || []
		);
	}, [permissions, roleId]);
	//userData: 이 역할을 가지는 사용자(화면에 필요에 따라 수정)
	const userData = useMemo(() => {
		return (
			user?.map((v, i) => ({
				...v,
				id: v.id,
				numberOfGroups: v.groups?.length || 0,
				status: v.status.code,
				createdTime: v.createdTag.createdTime,
				passwordExpiryTime: expiredConverter(v.passwordExpiryTime),
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
				lastConsoleLogin: v.sesstion.lastConsoleLoginTime,
				[DRAGGABLE_KEY]: v.userUid,
			})) || []
		);
	}, [user]);
	//groupData: 이 역할을 가지는 그룹(화면에 필요에 따라 수정)
	const groupData = useMemo(() => {
		return (
			group?.map((v) => ({
				...v,
				groupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name ? v.parentGroup.name : '없음',
				createdTime: v.createdTag.createdTime,
				numberOfRoles: v.roles ? v.roles.length : 0,
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
				[DRAGGABLE_KEY]: v.id,
			})) || []
		);
	}, [group]);

	/**************************************************
	 * roberto6385 - 탭 변경
	 **************************************************/
	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${roleId}`,
				search: `tabs=${v}`,
			});
		},
		[setIsOpened, history, param, roleId],
	);

	/**************************************************
	 * roberto6385 - 이 역할이 가진 권힌/정책을 불러옴
	 **************************************************/
	useEffect(() => {}, []);

	/**************************************************
	 * roberto6385 - 이 역할을 가진 사용자를 불러옴
	 **************************************************/
	useEffect(() => {
		const arr = [];
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					id: roleId,
				}),
			)
				.unwrap()
				.then((users) => {
					if (!users[0]) {
						setUser(users);
						return;
					}
					dispatch(
						PAM_SESSION.asyncAction.findSessionAction({
							userUids: users,
						}),
					)
						.unwrap()
						.then((sesstions) => {
							users.map((id) => {
								dispatch(
									IAM_USER.asyncAction.findByUidAction({
										userUid: id,
									}),
								)
									.unwrap()
									.then((res) => {
										arr.push({
											...res,
											grantUser: res,
											sesstion: sesstions.data.find(
												(x) =>
													x.userUid === res.userUid,
											),
										});
										if (users.length === arr.length) {
											setUser(arr);
										}
									});
							});
						});
				});
	}, [roleId, dispatch, isSummaryOpened, setUser]);

	/**************************************************
	 * roberto6385 - 이 역할을 가진 그룹을 불러옴
	 **************************************************/
	useEffect(() => {
		const arr = [];
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.findUserGroupsById({
					id: roleId,
				}),
			)
				.unwrap()
				.then((groups) =>
					groups.map((id) => {
						dispatch(
							IAM_USER_GROUP.asyncAction.findByIdAction({
								id: id,
							}),
						)
							.unwrap()
							.then((group) => {
								dispatch(
									IAM_USER.asyncAction.findByUidAction({
										userUid:
											group.createdTag.actorTag.userUid,
									}),
								)
									.unwrap()
									.then((user) => {
										dispatch(
											IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
												{
													id: group.id,
													range: `elements=0-50`,
												},
											),
										)
											.unwrap()
											.then((roles) => {
												arr.push({
													...group,
													grantUser: user,
													roles: roles.data,
												});
												setGroup(arr);
											});
									});
							});
					}),
				);
	}, [roleId, dispatch, isSummaryOpened, setGroup]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				{roleSummary.policy}
				{permissionData?.length}
			</SummaryTableTitle>

			<Table
				mode={'readOnly'}
				data={permissionData}
				tableKey={tableKeys.roles.summary.permission}
				columns={tableColumns[tableKeys.roles.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('user')}>
				{roleSummary.user}
				{user?.length}
			</SummaryTableTitle>
			<Table
				mode={'readOnly'}
				data={userData}
				tableKey={tableKeys.roles.summary.user}
				columns={tableColumns[tableKeys.roles.summary.user]}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
			/>

			<SummaryTableTitle onClick={onClickChangeTab('group')}>
				{roleSummary.group}
				{groupData?.length}
			</SummaryTableTitle>
			<Table
				mode={'readOnly'}
				data={groupData}
				tableKey={tableKeys.roles.summary.group}
				columns={tableColumns[tableKeys.roles.summary.group]}
				isPaginable
				isSearchable
				isSearchFilterable
				isColumnFilterable
			/>
		</SummaryTablesContainer>
	);
};

RoleSummary.propTypes = {
	roleId: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default RoleSummary;
