import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../../reducers/api/IAM/User/Role/roles';
import Table from '../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import {TableTitle} from '../../../../../styles/components/table';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import TableFold from '../../../../Table/Options/TableFold';
import DragContainer from '../../../../Table/DragContainer';
import {TabContentContainer} from '../../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../../styles/components/iam/iam';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../../reducers/api/IAM/User/Role/GrantRole/user';
import PAGINATION from '../../../../../reducers/pagination';
import * as _ from 'lodash';
import {CollapsbleContent} from '../../../../../styles/components/style';

const UserRolesTab = ({userUid, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [roles, setRoles] = useState([]);
	const {userRoles} = useSelector(IAM_ROLES_GRANT_ROLE_USER.selector);
	const [includedRoles, setIncludedRoles] = useState([]);
	const [excluedeRoles, setExcluedeRoles] = useState([]);
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState(userRoles || []);

	const includedData = useMemo(() => {
		return includedRoles
			? _.uniqBy(includedRoles.concat(excluedeRoles), 'id')
					.filter((v) => includedDataIds?.includes(v.id))
					.map((v) => ({
						...v,
						// numberOfUsers: v.users?.length,
						createdTime: v.createdTime,
						[DRAGGABLE_KEY]: v.id,
					}))
			: [];
	}, [excluedeRoles, includedDataIds, includedRoles]);
	const excludedData = useMemo(() => {
		return excluedeRoles
			? excluedeRoles
					.filter((v) => !includedDataIds?.includes(v.id))
					.map((v) => ({
						...v,
						// numberOfUsers: v.users?.length,
						createdTime: v.createdTime,
						[DRAGGABLE_KEY]: v.id,
					}))
			: [];
	}, [excluedeRoles, includedDataIds]);

	const onClickAddRolesToUser = useCallback(
		(data) => {
			data &&
				dispatch(
					IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction({
						roleIds: data,
						userUid: userUid,
					}),
				);
			// dispatch(
			// 	IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
			// 		userUid: userUid,
			// 		range: page[tableKeys.users.summary.tabs.roles.include],
			// 	}),
			// );
			setIncludedDataIds(includedDataIds.concat(data));
		},
		[dispatch, includedDataIds, userUid],
	);

	const onClickDeleteRolesFromUser = useCallback(
		(data) => {
			data &&
				dispatch(
					IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction({
						roleId: data,
						userUid: userUid,
					}),
				);

			setIncludedDataIds(
				includedDataIds.filter((v) => !data.includes(v)),
			);
		},
		[dispatch, includedDataIds, userUid],
	);

	const getExcludedRolespData = useCallback((roles) => {
		const arr = [];
		roles.forEach((role) => {
			arr.push({
				...role,
				id: role.id,
				name: role.name,
				description: role.description,
				type: role.maxGrants === '1' ? 'Private' : 'Public',
			});
			if (arr.length === roles.length) {
				setExcluedeRoles(arr);
			}
		});
	}, []);

	const getIncludedRolesData = useCallback(
		(userRoles) => {
			const arr = [];
			const userRolesId = userRoles.map((v) => v.roleId);

			userRoles.map((v) => {
				arr.push(v.roleId);
				if (userRoles.length === arr.length) {
					setIncludedDataIds(arr);
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
									numberOfUsers: role.grantedCount,
									description: role.description,
									createdTime: role.createdTag.createdTime,
									type:
										role.maxGrants === '1'
											? 'Private'
											: 'Public',
								});
								if (userRoles.length === arr.length) {
									setIncludedRoles(arr);
								}
							}),
					);
				}
			});
		},
		[dispatch],
	);

	const GetUserExcludeRolesApi = useCallback(() => {
		const arr = [];
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.roles.include]
		) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.users.summary.tabs.roles.include],
				}),
			)
				.unwrap()
				.then((res) => {
					console.log('res:', res);
					res.data.map((v) =>
						arr.push({
							id: v.id,
							name: v.name,
							description: v.description,
							numberOfUsers: v.grantedCount,
							createdTime: v.createdTag.createdTime,
							type: v.maxGrants === '1' ? 'Private' : 'Public',
						}),
					);
					if (arr.length === res.data.length) {
						setRoles(arr);
					}
				});
		}
	}, [dispatch, isSummaryOpened, page]);

	const GetUserIncludeRolesApi = useCallback(() => {
		if (page[tableKeys.users.summary.tabs.roles.include]) {
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					userUid: userUid,
					range: page[tableKeys.users.summary.tabs.roles.include],
				}),
			)
				.unwrap()
				.then((res) => {
					res.data.length
						? getIncludedRolesData(res.data)
						: setIncludedRoles([]);
				});
		}
	}, [dispatch, getIncludedRolesData, page, userUid]);

	useEffect(() => {
		GetUserExcludeRolesApi();
		GetUserIncludeRolesApi();
	}, [GetUserExcludeRolesApi, GetUserIncludeRolesApi, page]);

	useEffect(() => {
		if (roles && roles[0]) {
			getExcludedRolespData(roles);
		}
	}, [getExcludedRolespData, roles]);
	return (
		<TabContentContainer>
			<TableTitle>
				이 사용자의 권한: {includedData.length}{' '}
				<TransparentButton
					margin='0px 0px 0px 5px'
					onClick={() =>
						onClickDeleteRolesFromUser(
							select[
								tableKeys.users.summary.tabs.roles.include
							]?.map((v) => v.id),
						)
					}
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
				<Table
					setSelect={setSelect}
					isDraggable
					data={includedData}
					tableKey={tableKeys.users.summary.tabs.roles.include}
					columns={
						tableColumns[tableKeys.users.summary.tabs.roles.include]
					}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
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
							onClick={() =>
								onClickAddRolesToUser(
									select[
										tableKeys.users.summary.tabs.roles
											.exclude
									]?.map((v) => v.id),
								)
							}
						>
							권한 추가
						</NormalButton>
					</TableFold>
					<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
						<TableOptionText data={'roles'} />

						<Table
							setSelect={setSelect}
							isDraggable
							data={excludedData}
							tableKey={
								tableKeys.users.summary.tabs.roles.exclude
							}
							columns={
								tableColumns[
									tableKeys.users.summary.tabs.roles.exclude
								]
							}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
						/>
					</CollapsbleContent>
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
