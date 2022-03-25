import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import Table from '../../../Table/Table';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {TableTitle} from '../../../../styles/components/table';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import DragContainer from '../../../Table/DragContainer';
import {TabContentContainer} from '../../../../styles/components/iam/iamTab';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';

const GroupRolesTab = ({groupId, space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {roles} = useSelector(IAM_ROLES.selector);
	const group = useMemo(() => groups.find((v) => v.id === groupId), [
		groups,
		groupId,
	]);
	const [includedDataIds, setIncludedDataIds] = useState(group.roles);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.roles.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.summary.tabs.roles.exclude],
	);
	const [selected, setSelected] = useState({});

	const includedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
				[DRAGGABLE_KEY]: v.roleId,
			}));
	}, [roles, includedDataIds]);

	const excludedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.groups.length,
				[DRAGGABLE_KEY]: v.roleId,
			}));
	}, [roles, includedDataIds]);

	const onClickDeleteRolesFromGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(includeSelect),
			}),
		);
		dispatch(
			IAM_ROLES.action.deleteRolesFromGroup({
				id: groupId,
				roles: Object.keys(includeSelect),
			}),
		);
	}, [dispatch, groupId, includeSelect]);

	const onClickAddRolesToGroup = useCallback(() => {
		dispatch(
			IAM_USER_GROUP.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(excludeSelect),
			}),
		);
		dispatch(
			IAM_ROLES.action.addRolesToGroup({
				id: groupId,
				roles: Object.keys(excludeSelect),
			}),
		);
	}, [dispatch, excludeSelect, groupId]);

	useEffect(() => {
		setIncludedDataIds(group.roles);
	}, [group.roles]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.add.users.include]: includeSelect,
			[tableKeys.roles.add.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<TabContentContainer>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.summary.tabs.roles.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<TableTitle>
					이 그룹의 권한 : {excludedData.length}
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickDeleteRolesFromGroup}
					>
						삭제
					</TransparentButton>
				</TableTitle>
				<Table
					isDraggable
					data={excludedData}
					tableKey={tableKeys.groups.summary.tabs.roles.include}
					columns={includeColumns}
				/>
				<FoldableContainer>
					<TableFold
						title={<>이 그룹의 다른권한 : {excludedData.length}</>}
						space={'GroupRolesTab'}
						isFold={isFold}
						setIsFold={setIsFold}
					>
						<NormalButton
							margin='0px 0px 0px 5px'
							onClick={onClickAddRolesToGroup}
						>
							권한 추가
						</NormalButton>
					</TableFold>
					{isFold[space] && (
						<>
							<TableOptionText data={'roles'} />
							<Table
								isDraggable
								data={excludedData}
								tableKey={
									tableKeys.groups.summary.tabs.roles.exclude
								}
								columns={excludeColumns}
							/>
						</>
					)}
				</FoldableContainer>
			</DragContainer>{' '}
		</TabContentContainer>
	);
};

GroupRolesTab.propTypes = {
	groupId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default GroupRolesTab;
