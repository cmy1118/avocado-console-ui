import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {dummyPolicyOnUser} from '../../../../utils/dummyData';

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
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';

const UserSummary = ({userUid, param, setIsOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [user, setUser] = useState(null);
	const {initialPage} = useSelector(PAGINATION.selector);
	const [groups, setGroups] = useState([]);
	const [roles, setRoles] = useState([]);
	console.log(groups);

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
				[DRAGGABLE_KEY]: v.id,
			}));
	}, [groups, user]);

	const roleData = useMemo(() => {
		console.log(roles);
		return roles.map((v) => ({
			...v,
			[DRAGGABLE_KEY]: v.id,
		}));
	}, [roles]);

	const tagData = useMemo(() => {
		return [];
		// return user.tags.map((v, i) => ({
		// 	...v,
		// 	id: v.name,
		// 	numberOfPermissions: v.permissions.length,
		// }));
	}, []);

	useEffect(() => {
		dispatch(
			IAM_USER.asyncAction.findByUidAction({
				userUid: userUid,
			}),
		)
			.unwrap()
			.then((res) =>
				setUser({...res, groups: res.groups ? res.groups : []}),
			);
	}, [dispatch, userUid]);

	useEffect(() => {
		dispatch(
			IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
				userUid,
				range: initialPage,
			}),
		)
			.unwrap()
			.then((roles) => {
				console.log(roles);
				const arr = [];
				roles.data.forEach((role) => {
					dispatch(
						IAM_ROLES.asyncAction.findByIdAction({
							id: role.roleId,
						}),
					)
						.unwrap()
						.then((res) => {
							dispatch(
								IAM_USER.asyncAction.findByUidAction({
									userUid: res.createdTag.actorTag.userUid,
								}),
							)
								.unwrap()
								.then((user) => {
									arr.push({
										...res,
										grant: {
											role: role.createdTag,
											user: user.createdTag,
										},
									});
									if (arr.length === roles.data.length) {
										setRoles(arr);
									}
								});
						});
				});
			});
	}, [dispatch, initialPage, userUid]);

	useEffect(() => {
		if (user && user.groups) {
			const arr = [];
			user.groups.forEach((v) =>
				dispatch(
					IAM_USER_GROUP.asyncAction.findByIdAction({
						id: v.id,
					}),
				)
					.unwrap()
					.then((group) => {
						console.log(group);
						dispatch(
							IAM_USER.asyncAction.findByUidAction({
								userUid: group.createdTag.actorTag.userUid,
							}),
						)
							.unwrap()
							.then((grantUser) => {
								arr.push({
									...group,
									grantUser: {
										userUid: grantUser.userUid,
										id: grantUser.id,
										name: grantUser.name,
									},
								});
								if (user.groups.length === arr.length) {
									if (arr[0]) {
										const arr2 = [];
										arr.forEach((v) => {
											dispatch(
												IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction(
													{
														id: v.id,
														range: initialPage,
													},
												),
											)
												.unwrap()
												.then((role) => {
													arr2.push({
														...v,
														numberOfRoles: !role.data
															? 0
															: role.data.length,
													});
													if (
														arr.length ===
														arr2.length
													) {
														setGroups(arr2);
													}
												});
										});
									}
								}
							});
					}),
			);
		}
	}, [dispatch, initialPage, user]);

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
};
export default UserSummary;
