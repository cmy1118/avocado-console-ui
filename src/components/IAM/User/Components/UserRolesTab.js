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

const UserRolesTab = ({userUid, space, isFold, setIsFold, isSummaryOpened}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const {users} = useSelector(IAM_USER.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const {userRoles} = useSelector(IAM_ROLES_GRANT_ROLE_USER.selector);
	const [select, setSelect] = useState({});
	const user = useMemo(() => users.find((v) => v.userUid === userUid), [
		users,
		userUid,
	]);

	const [includedDataIds, setIncludedDataIds] = useState([]);

	console.log('roles?:', roles);
	console.log('userRoles?:', userRoles);

	const includedData = useMemo(() => {
		return userRoles
			? userRoles
					.filter((v) => includedDataIds.includes(v.id))
					.map((v) => ({
						...v,
						type: roleTypeConverter(v.companyId),
						numberOfUsers: v.users?.length,
					}))
			: [];
	}, [includedDataIds, userRoles]);

	const excludedData = useMemo(() => {
		return roles
			? roles
					.filter((n) => !userRoles?.includes(n.id))
					.filter((v) => !includedDataIds.includes(v.id))
					.map((v) => ({
						...v,
						type: roleTypeConverter(v.companyId),
						numberOfUsers: v.users?.length,
					}))
			: [];
	}, [includedDataIds, roles, userRoles]);

	const onClickDeleteRolesFromUser = useCallback(() => {
		dispatch(
			IAM_USER.action.deleteRolesFromUser({
				userUid: userUid,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromUser({
				userUid: userUid,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, select, userUid]);

	const onClickAddRolesToUser = useCallback(() => {
		dispatch(
			IAM_USER.action.addRolesToUser({
				userUid: userUid,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToUser({
				userUid: userUid,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, select, userUid]);

	useEffect(() => {
		if (
			!isSummaryOpened &&
			page[tableKeys.users.summary.tabs.roles.include] &&
			user
		) {
			dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
					range: page[tableKeys.users.summary.tabs.roles.include],
				}),
			);
		}
	}, [dispatch, isSummaryOpened, page, user]);

	useEffect(() => {
		dispatch(
			IAM_ROLES.asyncAction.getsAction({
				range: page[tableKeys.users.summary.tabs.roles.exclude],
			}),
		);
		dispatch(
			IAM_ROLES_GRANT_ROLE_USER.asyncAction.getsAction({
				userUid: userUid,
				range: page[tableKeys.users.summary.tabs.roles.include],
			}),
		);
	}, [dispatch, isSummaryOpened, page, user, userUid]);

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
				includedKey={tableKeys.groups.add.roles.include}
				excludedData={excludedData}
				includedData={includedData}
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
