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
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../reducers/api/IAM/User/Role/GrantRole/group';
import {setIn} from 'formik';

const UserRolesTab = ({userUid, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const {users} = useSelector(IAM_USER.selector);
	// const [user, setUser] = useState(null);
	//전체 롤 정보
	const {roles} = useSelector(IAM_ROLES.selector);
	//사용자에게  부여된 롤정보
	const {userRoles} = useSelector(IAM_ROLES_GRANT_ROLE_USER.selector);
	const [includedRoles, setIncludedRoles] = useState([]);
	const [excluedeRoles, setExcluedeRoles] = useState([]);
	const [select, setSelect] = useState({});
	// const user = useMemo(() => users.find((v) => v.userUid === userUid), [
	// 	users,
	// 	userUid,
	// ]);
	const [includedDataIds, setIncludedDataIds] = useState(userRoles || []);

	const includedData = useMemo(() => {
		return includedRoles
			? includedRoles.map((v) => ({
					...v,
					// numberOfUsers: v.users?.length,
					createdTime: v.createdTime,
					[DRAGGABLE_KEY]: v.roleId,
			  }))
			: [];
	}, [includedRoles]);

	const excludedData = useMemo(() => {
		return excluedeRoles
			? excluedeRoles
					.filter((v) => !includedDataIds?.includes(v.id))
					.map((v) => ({
						...v,
						createdTime: v.createdTag.createdTime,
						// numberOfUsers: v.users?.length,
						[DRAGGABLE_KEY]: v.id,
					}))
			: [];
	}, [excluedeRoles, includedDataIds]);
	console.log('⭕️excludedData:', excludedData);
	console.log('⭕includedData:', includedData);

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
	const onClickAddRolesToUser = useCallback(
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
	const onClickDeleteRolesFromUser = useCallback(
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
	const getExcludedGroupData = useCallback((roles) => {
		const arr = [];
		roles.forEach((role) => {
			arr.push({
				...role,
				type: role.maxGrants === '1' ? 'Private' : 'Public',
			});
			if (arr.length === roles.length) {
				setExcluedeRoles(arr);
			}
		});
	}, []);

	const getIncludedRolesData = useCallback(
		(userRoles) => {
			const userRolesId = userRoles.map((v) => v.roleId);
			const arr = [];
			userRolesId.forEach((v) =>
				dispatch(
					IAM_ROLES.asyncAction.findByIdAction({
						id: v,
					}),
				)
					.unwrap()
					.then((role) => {
						arr.push({
							id: role.id,
							name: role.name,
							description: role.description,
							createdTime: role.createdTag.createdTime,
							type: role.maxGrants === '1' ? 'Private' : 'Public',
						});
						if (userRoles.length === arr.length) {
							setIncludedRoles(arr);
						}
					}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.roles.include]
		) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.users.summary.tabs.roles.include],
				}),
			);
		}
	}, [dispatch, isSummaryOpened, page]);

	useEffect(() => {
		const arr = [];
		if (page[tableKeys.users.summary.tabs.roles.include]) {
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid: userUid,
					range: page[tableKeys.users.summary.tabs.roles.include],
				}),
			)
				.unwrap()
				.then((res) => {
					// res : 사용자에게 부여된 role 정보
					res.map((v) => arr.push(v.roleId));
					setIncludedDataIds(arr);
					getIncludedRolesData(res);
				});
		}
	}, [dispatch, getIncludedRolesData, page, userUid]);

	useEffect(() => {
		if (roles[0]) {
			getExcludedGroupData(roles);
		}
	}, [getExcludedGroupData, roles]);
	return (
		<TabContentContainer>
			<TableTitle>
				이 사용자의 권한: {includedData.length}{' '}
				<TransparentButton
					margin='0px 0px 0px 5px'
					onClick={onClickDeleteRolesFromUser}
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
