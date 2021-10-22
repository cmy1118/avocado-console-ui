import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {tableKeys} from '../../../utils/data';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import Table from '../../Table/Table';

const RightTableKey = tableKeys.rolesIncludedInUserOnDescPage;
const leftTableKey = tableKeys.rolesExcludedFormUserOnDescPage;

const UserRolesTab = ({userId}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState([]);

	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const [rightDataIds, setRightDataIds] = useState(user.roles);

	const dataLeft = useMemo(() => {
		return roles
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [rightDataIds, roles]);

	const dataRight = useMemo(() => {
		return roles
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [rightDataIds, roles]);

	const onClickDeleteRolesFromUser = useCallback(() => {
		dispatch(
			IAM_USER.action.deleteRolesFromUser({
				uid: userId,
				roles: Object.keys(select[RightTableKey]),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromUser({
				uid: userId,
				roles: Object.keys(select[RightTableKey]),
			}),
		);
	}, [dispatch, select, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		dispatch(
			IAM_USER.action.addRolesToUser({
				uid: userId,
				roles: Object.keys(select[leftTableKey]),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToUser({
				uid: userId,
				roles: Object.keys(select[leftTableKey]),
			}),
		);
	}, [dispatch, select, userId]);

	useEffect(() => {
		setRightDataIds(user.roles);
	}, [user.roles]);

	return (
		<>
			<div>
				이 사용자의 권한: {dataLeft.length}{' '}
				<button onClick={onClickDeleteRolesFromUser}>삭제</button>
			</div>
			<Table
				data={dataLeft}
				tableKey={tableKeys.rolesIncludedInUserOnDescPage}
				columns={
					getColumnsAsKey[tableKeys.rolesIncludedInUserOnDescPage]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={'role'}
				setSelect={setSelect}
			/>
			<div>
				이 사용자의 다른권한 : {dataRight.length}{' '}
				<button onClick={onClickAddRolesToUser}>권한 추가</button>
			</div>
			<Table
				data={dataRight}
				tableKey={tableKeys.rolesExcludedFormUserOnDescPage}
				columns={
					getColumnsAsKey[tableKeys.rolesExcludedFormUserOnDescPage]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={'role'}
				setSelect={setSelect}
			/>
		</>
	);
};

UserRolesTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserRolesTab;
