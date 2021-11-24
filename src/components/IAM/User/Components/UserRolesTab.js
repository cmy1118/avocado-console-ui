import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import Table from '../../../Table/Table';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {TableTitle} from '../../../../styles/components/table';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import TableContainer from '../../../Table/TableContainer';
import DragContainer from '../../../Table/DragContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../reducers/api/IAM/User/Role/GrantRole/user';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import PAGINATION from '../../../../reducers/pagination';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';
import IAM_ROLES_GRANT_ROLE_GROUP from "../../../../reducers/api/IAM/User/Role/GrantRole/group";

const UserRolesTab = ({userUid, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	// const {users} = useSelector(IAM_USER.selector);
	const [user, setUser] = useState(null);

	//전체 롤 정보
	const {roles} = useSelector(IAM_ROLES.selector);

	//사용자에게  부여된 롤정보
	const {userRoles} = useSelector(IAM_ROLES_GRANT_ROLE_USER.selector);

	const [includedGroups, setIncludedGroups] = useState([]);
	const [excluedeGroups, setExcluedeGroups] = useState([]);
	const [select, setSelect] = useState({});
	// const user = useMemo(() => users.find((v) => v.userUid === userUid), [
	// 	users,
	// 	userUid,
	// ]);

	const [includedDataIds, setIncludedDataIds] = useState(
		userRoles || [],
	);

	console.log('roles?:', roles);
	console.log('userRoles?:', userRoles);
	console.log('isSummaryOpened?:', isSummaryOpened);




	const includedData = useMemo(() => {
		return userRoles
			? userRoles
				.filter((v) => includedDataIds?.includes(v.roleId))
				.map((v) => ({
					...v,
					type: roleTypeConverter(v.companyId),
					// numberOfUsers: v.users?.length,
					// name: '임시역할',
					createdTime: v.createdTag.createdTime,
					// rold_info: v.roleId,
					[DRAGGABLE_KEY]: v.roleId,
				}))
			: [];
	}, [includedDataIds, userRoles]);

	const excludedData = useMemo(() => {
		return roles
			? roles
				// .filter((n) => !userRoles?.includes(n.id))
				.filter((v) => !includedDataIds?.includes(v.id))
				.map((v) => ({
					...v,
					type: roleTypeConverter(v.companyId),
					createdTime: v.createdTag.createdTime,


					// rold_info: v.id,
					// numberOfUsers: v.users?.length,
					[DRAGGABLE_KEY]: v.id,
				}))
			: [];
	}, [includedDataIds, roles]);

	// const includedData = useMemo(() => {
	// 	return userRoles
	// 		? userRoles
	// 				.filter((v) => includedDataIds?.includes(v.roleId))
	// 				.map((v) => ({
	// 					...v,
	// 					type: roleTypeConverter(v.companyId),
	// 					// numberOfUsers: v.users?.length,
	// 					// name: '임시역할',
	// 					createdTime: v.createdTag.createdTime,
	// 					// rold_info: v.roleId,
	// 					[DRAGGABLE_KEY]: v.roleId,
	// 				}))
	// 		: [];
	// }, [includedDataIds, userRoles]);
	//
	// const excludedData = useMemo(() => {
	// 	return roles
	// 		? roles
	// 				// .filter((n) => !userRoles?.includes(n.id))
	// 				.filter((v) => !includedDataIds?.includes(v.id))
	// 				.map((v) => ({
	// 					...v,
	// 					type: roleTypeConverter(v.companyId),
	// 					createdTime: v.createdTag.createdTime,
	//
	//
	// 					// rold_info: v.id,
	// 					// numberOfUsers: v.users?.length,
	// 					[DRAGGABLE_KEY]: v.id,
	// 				}))
	// 		: [];
	// }, [includedDataIds, roles]);

	// const onClickDeleteRolesFromUser = useCallback(() => {
	// 	dispatch(
	// 		IAM_USER.action.deleteRolesFromUser({
	// 			userUid: userId,
	// 			roles: Object.keys(
	// 				select[tableKeys.users.summary.tabs.roles.include],
	// 			),
	// 		}),
	// 	);
	// 	dispatch(
	// 		IAM_ROLES.action.deleteRolesFromUser({
	// 			userUid: userId,
	// 			roles: Object.keys(
	// 				select[tableKeys.users.summary.tabs.roles.include],
	// 			),
	// 		}),
	// 	);
	// }, [dispatch, select, userId]);

	// const onClickAddRolesToUser = useCallback(() => {
	// 	dispatch(
	// 		IAM_USER.action.addRolesToUser({
	// 			userUid: userId,
	// 			roles: Object.keys(
	// 				select[tableKeys.users.summary.tabs.roles.exclude],
	// 			),
	// 		}),
	// 	);
	// 	dispatch(
	// 		IAM_ROLES.action.addRolesToUser({
	// 			userUid: userId,
	// 			roles: Object.keys(
	// 				select[tableKeys.users.summary.tabs.roles.exclude],
	// 			),
	// 		}),
	// 	);
	// }, [dispatch, select, userId]);

	//button 동작

	//사용자 롤 제거
	const onClickDeleteRolesFromUser = useCallback(
		(data) => {
			data.forEach((v) => {
				dispatch(
					IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction({
						roleId: v,
						userUid: userUid,
					}),
				);
			});
		},
		[dispatch, userUid],
	);

	//사용자 롤추가
	const onClickAddRolesToUser = useCallback(
		(data) => {
			data.forEach((v) => {
				dispatch(
					IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction({
						roleId: v,
						userUid: [userUid],
					}),
				);
			});
		},
		[dispatch, userUid],
	);

	// useEffect(() => {
	// 	if (
	// 		!isSummaryOpened &&
	// 		page[tableKeys.users.summary.tabs.roles.include] &&
	// 		user
	// 	) {
	// 		console.log('dispatch getsAction');
	// 		dispatch(
	// 			IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
	// 				userUid: userUid,
	// 				range: page[tableKeys.users.summary.tabs.roles.include],
	// 			}),
	// 		);
	// 	}
	// }, [dispatch, isSummaryOpened, page, user, userUid]);
	//
	// useEffect(() => {
	// 	if (
	// 		isFold &&
	// 		page[tableKeys.users.summary.tabs.roles.exclude] &&
	// 		user
	// 	) {
	// 		dispatch(
	// 			IAM_ROLES.asyncAction.getsAction({
	// 				range: page[tableKeys.users.summary.tabs.roles.exclude],
	// 			}),
	// 		);
	// 	}
	//
	// 	setIncludedDataIds(userRoles?.map((v) => v.roleId));
	// }, [dispatch, isFold, page, user, userRoles]);
	const getExcludedGroupData = useCallback(
		(userRoles) => {
			const arr = [];
			userRoles.forEach((userRoles) => {
				dispatch(
					IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.getsAction({
						id: userRoles.id,
						range:
						// 안펼져도 가능 하도록
							page[tableKeys.users.summary.tabs.roles.exclude] ||
							'elements=0-50',
					}),
				)
					.unwrap()
					.then((res) => {
						console.log('res:',res);
						arr.push({
							...userRoles,
							type: res.maxGrants === '1' ? 'Private' : 'Public',
						});
						if (arr.length === userRoles.length) {
							setExcluedeGroups(arr);
						}
					});
			});
		},
		[dispatch, page],
	);

	const getIncludedGroupsData = useCallback(
		(user) => {
			console.log(user.groupIds);
			const arr = [];
			user.groupIds.forEach((v) =>
				dispatch(IAM_USER_GROUP.asyncAction.findByIdAction({
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
														range:
															page[
																tableKeys.users
																	.summary
																	.tabs.groups
																	.include
																],
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
														setIncludedGroups(arr2);
													}
												});
										});
									}
								}
							});
					}),
			);
		},
		[dispatch, page],
	);


	useEffect(() => {
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.roles.include] &&
			user
		) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.users.summary.tabs.roles.include],
				}),
			);
		}
	}, [dispatch, isSummaryOpened, page, user]);

	useEffect(() => {
		if (!user && page[tableKeys.users.summary.tabs.roles.include]) {
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid: userUid,
				}),
			)
				.unwrap()
				.then((res) => {
					console.log('res:',res);
					setUser(res);
					setIncludedDataIds(res.roleId);
					getIncludedGroupsData(res);
				});
		}
	}, [user, dispatch, userUid, getIncludedGroupsData, page]);

	useEffect(() => {
		if (userRoles[0]) {
			getExcludedGroupData(userRoles);
		}
	}, [getExcludedGroupData, userRoles]);

	return (
		<TabContentContainer>
			<TableTitle>
				이 사용자의 권한: {includedData.length}{' '}
				<TransparentButton
					margin='0px 0px 0px 5px'
					// onClick={onClickDeleteRolesFromUser}
				>
					삭제
				</TransparentButton>
			</TableTitle>
			<DragContainer
				selected={select}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.users.summary.tabs.roles.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddRolesToUser}
				disjointFunction={onClickDeleteRolesFromUser}
			>
				<TableContainer
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.roles.include}
					columns={
						tableColumns[tableKeys.users.summary.tabs.roles.include]
					}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<FoldableContainer>
					<TableFold
						title={
							<>이 사용자의 다른권한 : {excludedData.length}</>
						}
						space={'UserRolesTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={onClickAddRolesToUser}
						>
							권한 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'roles'} />

							<TableContainer
								data={excludedData}
								tableKey={
									tableKeys.users.summary.tabs.roles.exclude
								}
								columns={
									tableColumns[
										tableKeys.users.summary.tabs.roles
											.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
						</>
					)}
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

UserRolesTab.propTypes = {
	userUid: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
};

export default UserRolesTab;
