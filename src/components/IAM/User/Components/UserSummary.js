import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import Table from '../../../Table/Table';
import {useHistory} from 'react-router-dom';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../styles/components/iam/descriptionPage';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import PAGINATION from '../../../../reducers/pagination';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../reducers/api/IAM/User/Role/GrantRole/user';
import IAM_USER_TAG from '../../../../reducers/api/IAM/User/Tag/tags';
import {
	descriptionConverter,
	descValues,
} from '../../../../utils/tableDataConverter';
import IAM_GRANT_POLICY_BY_ROLE from '../../../../reducers/api/IAM/User/Policy/GrantPolicy/role';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import * as _ from 'lodash';
import AUTH from '../../../../reducers/api/Auth/auth';
import {account} from '../../../../utils/auth';

const UserSummary = ({userUid, param, setIsOpened, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {companyId} = useSelector(AUTH.selector);

	const [user, setUser] = useState(null);
	const {initialPage} = useSelector(PAGINATION.selector);
	const [groups, setGroups] = useState([]);
	const [roles, setRoles] = useState([]);
	const [tags, setTags] = useState([]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${userUid}`,
				search: `tabs=${v}`,
			});
		},
		[setIsOpened, history, param, userUid],
	);

	const groupData = useMemo(() => {
		return groups
			.filter((v) =>
				user?.groups
					? user.groups.map((x) => x.id).includes(v.id)
					: [].includes(v.id),
			)
			.map((v) => ({
				...v,
				userGroupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name ? v.parentGroup.name : '없음',
				createdTime: v.createdTag.createdTime,
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
				numberOfRoles: v.roles ? v.roles.length : 0,

				[DRAGGABLE_KEY]: v.id,
			}));
	}, [groups, user]);

	const roleData = useMemo(() => {
		console.log('ROELE', roles);

		const temp = roles
			.filter((v) => v.policy)
			.map((v, i) => ({
				...v,
				permission: descValues(v.policy?.details[0].policyType),
				policyName: v.policy?.templateName,
				authTarget: '사용자',
				description: `${descriptionConverter(v.policy?.details)}`,
				roleName: v.role.name,
				grantDate: v.grantUser?.createdTag?.createdTime,
				grantUser: v.grantUser,
				id: v.role.id + '/' + i,
				[DRAGGABLE_KEY]: v.role.id + '/' + i,
			}));

		if (
			companyId === account.KT.companyId &&
			roles.filter((v) => v.role.name === 'resource-policy').length > 0
		) {
			return [
				...temp,
				{
					id: 'default',
					permission: '접근 자원',
					description:
						'avocado-pam-server (ec2-13-124-198-15.ap-northeast-2.compute.amazonaws.com) / SSH / root\navocado-pam-connector (ec2-15-164-22-197.ap-northeast-2.compute.amazonaws.com) / SSH / root\nRabbitMQ (ec2-13-209-99-140.ap-northeast-2.compute.amazonaws.com) / SSH / root\navocado-console-ui (ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com) / SSH / root',
					type: '접근자원',
					roleName: 'resource-policy',
					policyName: 'resource-permission',
					authTarget: '사용자',
					grantDate: '2021-11-26T19:13:21.266+09:00',
					// grantUser: {value: {name: '김진우', id: 'jinwoo'}},
					grantUser: '김진우(jinwoo)',
					[DRAGGABLE_KEY]: 'default',
				},
				{
					id: 'default2',
					permission: '명령어',
					description:
						'제어 유형 : Black\n제어 명령어 : kill\n 위반 횟수 : 1회\n 정책 : 세션차단\n초기화 : 10초',
					type: '명령어 제어',
					roleName: 'resource-policy',
					policyName: 'commandControl-policy',
					authTarget: '사용자',
					grantDate: '2021-11-26T19:13:21.266+09:00',
					grantUser: '김진우(jinwoo)',
					[DRAGGABLE_KEY]: 'default2',
				},
			];
		}

		if (
			companyId === account.SK.companyId &&
			roles.filter((v) => v.role.name === 'resource-policy').length > 0
		) {
			return [
				...temp,
				{
					id: 'default',
					permission: '접근 자원',
					description:
						'key-server (ec2-13-124-198-15.ap-northeast-2.compute.amazonaws.com) / SSH / root\napp-dev-server (ec2-15-164-22-197.ap-northeast-2.compute.amazonaws.com) / SSH / root\nui-server (ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com) / SSH / root\nMessage Queue (ec2-13-209-99-140.ap-northeast-2.compute.amazonaws.com) / SSH / root',
					type: '접근자원',
					roleName: 'resource-policy',
					policyName: 'resource-permission',
					authTarget: '사용자',
					grantDate: '2021-11-26T19:13:21.266+09:00',

					grantUser: '김미희(myhee)',
					[DRAGGABLE_KEY]: 'default',
				},
				{
					id: 'default2',
					permission: '명령어',
					description:
						'제어 유형 : Black\n제어 명령어 : kill\n 위반 횟수 : 1회\n 정책 : 세션차단\n초기화 : 10초',
					type: '명령어 제어',
					roleName: 'resource-policy',
					policyName: 'commandControl-policy',
					authTarget: '사용자',
					grantDate: '2021-11-26T19:13:21.266+09:00',
					grantUser: '김미희(myhee)',
					[DRAGGABLE_KEY]: 'default2',
				},
			];
		}
		return temp;
	}, [roles, companyId]);

	const tagData = useMemo(() => {
		return tags.map((tag) => ({
			...tag,
			id: tag.name,
			numberOfPermissions: 0,
			[DRAGGABLE_KEY]: tag.name,
		}));
	}, [tags]);

	useEffect(() => {
		isSummaryOpened &&
			dispatch(
				IAM_USER.asyncAction.findByUidAction({
					userUid: userUid,
				}),
			)
				.unwrap()
				.then((res) => setUser({...res}));
	}, [dispatch, isSummaryOpened, userUid]);

	useEffect(() => {
		const templatesArr = [];
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid,
					range: initialPage,
				}),
			)
				.unwrap()
				.then((roles) => {
					if (!roles.data[0]) setRoles([]);
					roles.data.forEach((role) => {
						console.log(role);
						dispatch(
							IAM_ROLES.asyncAction.findByIdAction({
								id: role.roleId,
							}),
						)
							.unwrap()
							.then((detailRole) => {
								console.log(detailRole);
								dispatch(
									IAM_USER.asyncAction.findByUidAction({
										userUid:
											detailRole.createdTag.actorTag
												.userUid,
									}),
								)
									.unwrap()
									.then((grantUser) => {
										dispatch(
											IAM_GRANT_POLICY_BY_ROLE.asyncAction.getsAction(
												{
													roleId: detailRole.id,
													range: `elements=0-50`,
												},
											),
										)
											.unwrap()
											.then((policies) => {
												console.log(
													'policies ::',
													policies,
												);
												const arr = [];
												if (!policies.data) {
													arr.push({
														role: detailRole,
														grantUser: {
															...grantUser,
															createdTag:
																role.createdTag,
														},
													});
												} else {
													policies.data.forEach(
														(policy) => {
															console.log(policy);
															arr.push({
																role: detailRole,
																policy: policy,
																grantUser: {
																	...grantUser,
																	createdTag:
																		role.createdTag,
																},
															});
														},
													);
												}
												templatesArr.push(arr);
												if (
													templatesArr.length ===
													roles.data.length
												) {
													console.log(templatesArr);
													setRoles(
														_.flatten(templatesArr),
													);
												}
											});
									});
							});
					});
				});
	}, [dispatch, initialPage, isSummaryOpened, userUid]);

	useEffect(() => {
		console.log(user);
		if (user && user.groups) {
			const arr = [];
			dispatch(
				IAM_USER.asyncAction.getUserGroupsAction({
					userUid: user.userUid,
					range: `elements=0-50`,
				}),
			)
				.unwrap()
				.then((groups) => {
					groups.data.forEach((group) => {
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: group.createdTag.actorTag.userUid,
							}),
						)
							.unwrap()
							.then((grantUser) => {
								dispatch(
									IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
										{
											id: group.id,
											range: `elements=0-1`,
										},
									),
								)
									.unwrap()
									.then((roles) => {
										arr.push({
											...group,
											roles: roles.data,
											grantUser,
										});
										if (arr.length === groups.data.length) {
											setGroups(arr);
										}
									});
							});
					});
				});
		}
	}, [dispatch, initialPage, user]);

	useEffect(() => {
		if (user && user.tags) {
			dispatch(
				IAM_USER_TAG.asyncAction.getsAction({
					userUid: user.userUid,
					range: `elements=0-10`,
				}),
			)
				.unwrap()
				.then((tag) => {
					setTags(tag.data);
				});
		}
	}, [dispatch, user]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('group')}>
				그룹 : {groupData.length}
			</SummaryTableTitle>
			<Table
				mode={'readOnly'}
				data={groupData}
				tableKey={tableKeys.users.summary.group}
				columns={tableColumns[tableKeys.users.summary.group]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				권한 : {roleData.length}
			</SummaryTableTitle>
			<Table
				mode={'readOnly'}
				data={roleData}
				tableKey={tableKeys.users.summary.permission}
				columns={tableColumns[tableKeys.users.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				태그 : {tagData.length}
			</SummaryTableTitle>
			<Table
				mode={'readOnly'}
				data={tagData}
				tableKey={tableKeys.users.summary.tag}
				columns={tableColumns[tableKeys.users.summary.tag]}
			/>
		</SummaryTablesContainer>
	);
};

UserSummary.propTypes = {
	userUid: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default UserSummary;
