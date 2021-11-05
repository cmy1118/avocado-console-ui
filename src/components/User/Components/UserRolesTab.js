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
import {TableFoldContainer, TableSpace} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import TableFold from '../../Table/Options/TableFold';

const UserRolesTab = ({userId, space, isFold, setIsFold}) => {
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
		setRightDataIds(user.roles);
	}, [user.roles]);

	return (
		<>
			<TableSpace>
				이 사용자의 권한: {dataLeft.length}{' '}
				<TransparentButton onClick={onClickDeleteRolesFromUser}>
					삭제
				</TransparentButton>
			</TableSpace>
			<Table
				data={dataLeft}
				tableKey={tableKeys.users.summary.tabs.roles.include}
				columns={
					tableColumns[tableKeys.users.summary.tabs.roles.include]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={tableKeys.users.summary.tabs.roles.dnd}
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<TableFoldContainer>
				<TableFold
					title={<>이 사용자의 다른권한 : {dataRight.length}</>}
					space={'UserRolesTab'}
					isFold={isFold}
					setIsFold={setIsFold}
				>
					<NormalButton onClick={onClickAddRolesToUser}>
						권한 추가
					</NormalButton>
				</TableFold>
				{isFold[space] && (
					<>
						<TableOptionText data={'roles'} />
						<Table
							data={dataRight}
							tableKey={
								tableKeys.users.summary.tabs.roles.exclude
							}
							columns={
								tableColumns[
									tableKeys.users.summary.tabs.roles.exclude
								]
							}
							isPageable
							isNumberOfRowsAdjustable
							isColumnFilterable
							isSortable
							isSelectable
							isDnDPossible
							isSearchable
							dndKey={tableKeys.users.summary.tabs.roles.dnd}
							setSelect={setSelect}
							setData={setRightDataIds}
							control
						/>
					</>
				)}
			</TableFoldContainer>
		</>
	);
};

UserRolesTab.propTypes = {
	userId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default UserRolesTab;
