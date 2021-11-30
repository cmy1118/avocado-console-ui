import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';

import TableContainer from '../../../Table/TableContainer';
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
import IAM_USER_POLICY from '../../../../reducers/api/IAM/User/Policy/policy';
import IAM_USER_TAG from '../../../../reducers/api/IAM/User/Tag/tags';

const UserSummary = ({userUid, param, setIsOpened, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
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
		console.log(groups);
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
		console.log(roles);
		return roles.map((v, i) => ({
			...v,
			permission: v.template.detail.policyType,
			policyName: v.template.templateName,
			authTarget: '사용자',
			description: `${v.template.detail.policyType} : ${v.template.detail.attributeName}`,
			roleName: v.role.name,
			grantDate: v.grantUser?.createdTag?.createdTime,
			grantUser: v.grantUser,
			id: v.role.id + '/' + i,
			[DRAGGABLE_KEY]: v.role.id + '/' + i,
		}));
	}, [roles]);

	const tagData = useMemo(() => {
		return tags.map((tag) => ({
			...tag,
			id: tag.name,
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
		isSummaryOpened &&
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid,
					range: initialPage,
				}),
			)
				.unwrap()
				.then((roles) => {
					console.log(roles);
					roles.data.forEach((role) => {
						console.log(role);
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: role.createdTag.actorTag.userUid,
							}),
						)
							.unwrap()
							.then((grantUser) => {
								dispatch(
									IAM_USER_POLICY.asyncAction.getsAction({
										userUid: role.targetId,
									}),
								)
									.unwrap()
									.then((policys) => {
										const arr = [];

										policys.forEach((policy) => {
											policy.policyTemplates.forEach(
												(template) => {
													template.details.forEach(
														(detail) => {
															arr.push({
																role:
																	policy.role,
																template: {
																	templateId:
																		template.templateId,
																	templateName:
																		template.templateName,
																	createdTag:
																		template.createdTag,
																	detail,
																},
																grantUser: {
																	...grantUser,
																	createdTag:
																		role.createdTag,
																},
															});
														},
													);
												},
											);
										});
										console.log(arr);
										setRoles(arr);
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
	userUid: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	isSummaryOpened: PropTypes.bool.isRequired,
};
export default UserSummary;
