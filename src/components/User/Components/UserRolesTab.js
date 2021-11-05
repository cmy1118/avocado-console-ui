import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import Table from '../../Table/Table';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import TableContainer from '../../Table/TableContainer';
import DragContainer from '../../Table/DragContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const UserRolesTab = ({userId}) => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState({});
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const [includedDataIds, setIncludedDataIds] = useState(user.roles);

	const excludedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [includedDataIds, roles]);

	const includedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [includedDataIds, roles]);

	const onClickDeleteRolesFromUser = useCallback(() => {
		dispatch(
			IAM_USER.action.deleteRolesFromUser({
				uid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromUser({
				uid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, select, userId]);

	const onClickAddRolesToUser = useCallback(() => {
		dispatch(
			IAM_USER.action.addRolesToUser({
				uid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToUser({
				uid: userId,
				roles: Object.keys(
					select[tableKeys.users.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, select, userId]);

	useEffect(() => {
		setIncludedDataIds(user.roles);
	}, [user.roles]);

	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.groups.add.roles.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>
				이 사용자의 권한: {excludedData.length}{' '}
				<TransparentButton onClick={onClickDeleteRolesFromUser}>
					삭제
				</TransparentButton>
			</div>
			<TableContainer
				data={excludedData}
				tableKey={tableKeys.users.summary.tabs.roles.include}
				columns={
					tableColumns[tableKeys.users.summary.tabs.roles.include]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
			<div>
				이 사용자의 다른권한 : {includedData.length}{' '}
				<NormalButton onClick={onClickAddRolesToUser}>
					권한 추가
				</NormalButton>
			</div>
			<TableContainer
				data={includedData}
				tableKey={tableKeys.users.summary.tabs.roles.exclude}
				columns={
					tableColumns[tableKeys.users.summary.tabs.roles.exclude]
				}
			>
				<TableOptionsBar />
				<Table setSelect={setSelect} isDraggable />
			</TableContainer>
		</DragContainer>
	);
};

UserRolesTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserRolesTab;
