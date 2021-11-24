import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../../Constants/Table/keys';
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

const UserSummary = ({userUid, param, setIsOpened}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [user, setUser] = useState(null);
	const {initialPage} = useSelector(PAGINATION.selector);
	const [groups, setGroups] = useState([]);
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
				user?.groupIds
					? user.groupIds.includes(v.id)
					: [].includes(v.id),
			)
			.map((v) => ({
				...v,
				userGroupType: v.userGroupType.name,
				parentGroup: v.parentGroup.name,
				createdTime: v.createdTag.createdTime,
			}));
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
		dispatch(
			IAM_USER.asyncAction.findByUidAction({
				userUid: userUid,
			}),
		)
			.unwrap()
			.then((res) => setUser(res));
	}, [dispatch, userUid]);

	useEffect(() => {
		if (user) {
			console.log(user.groupIds);
			const arr = [];
			user.groupIds.forEach((v) =>
				dispatch(
					IAM_USER_GROUP.asyncAction.findByIdAction({
						id: v,
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
								if (user.groupIds.length === arr.length) {
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
														numberOfRoles: !role
															? 0
															: role.length,
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
