import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../utils/tableDataConverter';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import Table from '../../Table/Table';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {TableFoldContainer, TableSpace} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import TableFold from '../../Table/Options/TableFold';

const GroupRolesTab = ({groupId, space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const [select, setSelect] = useState([]);

	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [rightDataIds, setRightDataIds] = useState(group.roles);

	const dataLeft = useMemo(() => {
		return roles
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, rightDataIds]);

	const dataRight = useMemo(() => {
		return roles
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
			}));
	}, [roles, rightDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.include],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(
					select[tableKeys.groups.summary.tabs.roles.exclude],
				),
			}),
		);
	}, [dispatch, groupId, select]);

	useEffect(() => {
		setRightDataIds(group.roles);
	}, [group.roles]);
	return (
		<>
			<TableSpace>
				이 그룹의 권한 : {dataLeft.length}
				<TransparentButton onClick={onClickDeleteRolesFromGroup}>
					삭제
				</TransparentButton>
			</TableSpace>
			<Table
				data={dataLeft}
				tableKey={tableKeys.groups.summary.tabs.roles.include}
				columns={
					tableColumns[tableKeys.groups.summary.tabs.roles.include]
				}
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isDnDPossible
				isSearchable
				dndKey={tableKeys.groups.summary.tabs.roles.dnd}
				setSelect={setSelect}
				setData={setRightDataIds}
			/>
			<TableFoldContainer>
				<TableFold
					title={<>이 그룹의 다른권한 : {dataRight.length}</>}
					space={'GroupRolesTab'}
					isFold={isFold}
					setIsFold={setIsFold}
				>
					<NormalButton onClick={onClickAddRolesToGroup}>
						권한 추가
					</NormalButton>
				</TableFold>
				{isFold[space] && (
					<>
						<TableOptionText data={'roles'} />
						<Table
							data={dataRight}
							tableKey={
								tableKeys.groups.summary.tabs.roles.exclude
							}
							columns={
								tableColumns[
									tableKeys.groups.summary.tabs.roles.exclude
								]
							}
							isPageable
							isNumberOfRowsAdjustable
							isColumnFilterable
							isSortable
							isSelectable
							isDnDPossible
							isSearchable
							dndKey={tableKeys.groups.summary.tabs.roles.dnd}
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

GroupRolesTab.propTypes = {
	groupId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default GroupRolesTab;
