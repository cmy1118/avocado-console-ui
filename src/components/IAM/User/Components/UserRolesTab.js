import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import Table from '../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
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
import PAGINATION from '../../../../reducers/pagination';

const UserRolesTab = ({userUid, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const {userRoles} = useSelector(IAM_ROLES_GRANT_ROLE_USER.selector);
	const [includedRoles, setIncludedRoles] = useState([]);
	const [excluedeRoles, setExcluedeRoles] = useState([]);
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState(userRoles || []);

	const includedData = useMemo(() => {
		return includedRoles
			? includedRoles.map((v) => ({
					...v,
					// numberOfUsers: v.users?.length,
					createdTime: v.createdTime,
					[DRAGGABLE_KEY]: v.id,
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

	const onClickAddRolesToUser = useCallback(
		(data) => {
			console.log(data);
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction({
					roleIds: data.map((v) => v.id),
					userUid: userUid,
				}),
			);
		},
		[dispatch, userUid],
	);

	//사용자 롤추가
	const onClickDeleteRolesFromUser = useCallback(
		(data) => {
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction({
					roleId: data,
					userUid: userUid,
				}),
			);
		},
		[dispatch, userUid],
	);

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
					res.data.map((v) => arr.push(v.roleId));
					setIncludedDataIds(arr);
					getIncludedRolesData(res.data);
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
