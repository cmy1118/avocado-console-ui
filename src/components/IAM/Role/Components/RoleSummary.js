import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import PropTypes from 'prop-types';

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
	descValues,
	expiredConverter,
} from '../../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import PAM_SESSION from '../../../../reducers/api/PAM/session';
import AUTH from '../../../../reducers/api/Auth/auth';
import {account} from '../../../../utils/auth';

const RoleSummary = ({Id, param, setIsOpened, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [group, setGroup] = useState([]);
	const [user, setUser] = useState([]);
	const [permissions, setPermissions] = useState(null);
	const {companyId} = useSelector(AUTH.selector);

	const permissionData = useMemo(() => {
		if (permissions) {
			const temp = permissions?.map((v) => ({
				id: v.role.id + v.policy.templateId,
				name: descValues(v.policy.details[0].policyType),
				description: ` ${descriptionConverter(v.policy.details)}`,
				policyName: v.policy.templateName,
				roleName: v.role.name,
				grantUser: v.user,
				type: descValues(v.policy.details[0].policyType),
				createdTime: v.policy.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.role.id + v.policy.templateId,
			}));

			if (
				Id === 'KR-2020-0005:00000000002' &&
				companyId === account.KT.companyId
			) {
				return [
					...temp,
					{
						id: 'default',
						name: '접근 자원',
						description:
							'avocado-pam-server (ec2-13-124-198-15.ap-northeast-2.compute.amazonaws.com) / SSH / root\navocado-pam-connector (ec2-15-164-22-197.ap-northeast-2.compute.amazonaws.com) / SSH / root\nRabbitMQ (ec2-13-209-99-140.ap-northeast-2.compute.amazonaws.com) / SSH / root\navocado-console-ui (ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com) / SSH / root',
						type: '접근자원',
						policyName: 'resource-permission',
						createdTime: '2021-11-26T19:13:21.266+09:00',
						grantUser: '김진우(jinwoo)',
						[DRAGGABLE_KEY]: 'default',
					},
					{
						id: 'default2',
						name: '명령어',
						description:
							'제어 유형 : Black\n제어 명령어 : kill\n 위반 횟수 : 1회\n 정책 : 세션차단\n초기화 : 10초',
						type: '명령어 제어',
						policyName: 'commandControl-policy',
						createdTime: '2021-11-26T19:13:21.266+09:00',
						grantUser: '김진우(jinwoo)',
						[DRAGGABLE_KEY]: 'default2',
					},
				];
			}

			if (
				Id === 'KR-2020-0006:00000000002' &&
				companyId === account.SK.companyId
			) {
				return [
					...temp,
					{
						id: 'default',
						name: '접근 자원',
						description:
							'key-server (ec2-13-124-198-15.ap-northeast-2.compute.amazonaws.com) / SSH / root\napp-dev-server (ec2-15-164-22-197.ap-northeast-2.compute.amazonaws.com) / SSH / root\nui-server (ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com) / SSH / root\nMessage Queue (ec2-13-209-99-140.ap-northeast-2.compute.amazonaws.com) / SSH / root',
						type: '접근자원',
						policyName: 'resource-permission',
						createdTime: '2021-11-26T19:13:21.266+09:00',
						// grantUser: {value: {name: '김미희', id: 'myhee'}},
						grantUser: '김미희(myhee)',
						[DRAGGABLE_KEY]: 'default',
					},
					{
						id: 'default2',
						name: '명령어',
						description:
							'제어 유형 : Black\n제어 명령어 : kill\n 위반 횟수 : 1회\n 정책 : 세션차단\n초기화 : 10초',
						type: '명령어 제어',
						policyName: 'commandControl-policy',
						createdTime: '2021-11-26T19:13:21.266+09:00',
						grantUser: '김미희(myhee)',
						[DRAGGABLE_KEY]: 'default2',
					},
				];
			}
		} else return [];
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
	}, [permissions, Id, companyId]);

	const userData = useMemo(() => {
		// return [];
		console.log('userData:', user);
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
				numberOfRoles: v.roles ? v.roles.length : 0,
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
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
		const policiesBox = [];

		dispatch(
			IAM_ROLES.asyncAction.findByIdAction({
				id: Id,
			}),
		)
			.unwrap()
			.then((role) => {
				dispatch(
					IAM_GRANT_POLICY_BY_ROLE.asyncAction.getsAction({
						roleId: Id,
						range: `elements=0-50`,
					}),
				)
					.unwrap()
					.then((policies) => {
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
									policiesBox.push({user, role, policy});
									if (
										policiesBox.length ===
										policies.data.length
									) {
										console.log(policiesBox);
										setPermissions(policiesBox);
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
					dispatch(
						PAM_SESSION.asyncAction.findSessionAction({
							userUids: users,
						}),
					)
						.unwrap()
						.then((sesstions) => {
							console.log(sesstions);

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
											console.log(' 사용자 정보:', res);
											setUser(arr);
										}
									});
							});
						});
				});
	}, [Id, dispatch, isSummaryOpened, setUser]);

	//이 역할의 사용자 그룹.
	useEffect(() => {
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
												console.log('roles:', roles);
												arr.push({
													...group,
													grantUser: user,
													roles: roles.data,
												});
												console.log(
													' 그룹 정보:',
													group,
												);
												console.log(' arr:', arr);
												setGroup(arr);
											});
									});
							});
					}),
				);
	}, [Id, dispatch, isSummaryOpened, setGroup]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한/정책 : {permissionData?.length}
			</SummaryTableTitle>

			<Table
				mode={'readOnly'}
				data={permissionData}
				tableKey={tableKeys.roles.summary.permission}
				columns={tableColumns[tableKeys.roles.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('user')}>
				이 역할의 사용자 : {user?.length}
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
				이 역할의 사용자 그룹 : {groupData?.length}
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
	Id: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default RoleSummary;
