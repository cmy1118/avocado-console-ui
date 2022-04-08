import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import DropButton from '../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import TableOptionText from '../../../Table/Options/TableOptionText';
import FoldableContainer from '../../../Table/Options/FoldableContainer';
import {ColDiv, RowDiv, TableHeader} from '../../../../styles/components/style';
import DragContainer from '../../../Table/DragContainer';
import PAGINATION from '../../../../reducers/pagination';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';

const AssignRoleToUser = () => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.add.roles.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.users.add.roles.exclude],
	);
	const [selected, setSelected] = useState({});

	const [roles, setRoles] = useState([]);

	const includedData = useMemo(() => {
		return roles
			?.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				[DRAGGABLE_KEY]: v.id,
			}));
	}, [includedDataIds, roles]);

	const excludedData = useMemo(() => {
		// return [];
		return roles
			?.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.grantedCount,
				createdTime: v.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.id,
				// numberOfUsers: v.users.length,
			}));
	}, [includedDataIds, roles]);

	//readonly 정보 추가
	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.roles.exclude,
				data: includedData,
			}),
		);
	}, [includedData, dispatch]);

	const getUsersRoleDetailApi = useCallback((res) => {
		const arr = [];
		res.data.map((v) => arr.push(v.id));
		if (res.data.length === arr.length) {
			setRoles(res.data);
		}
	}, []);

	const getUsersRoleApi = useCallback(() => {
		if (page[tableKeys.users.add.roles.exclude]) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.users.add.roles.exclude],
				}),
			)
				.unwrap()
				.then((res) => {
					res.data.length ? getUsersRoleDetailApi(res) : setRoles([]);
				});
		}
	}, [dispatch, getUsersRoleDetailApi, page]);

	useEffect(() => {
		getUsersRoleApi();
	}, [getUsersRoleApi, page]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.add.users.include]: includeSelect,
			[tableKeys.roles.add.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<FoldableContainer title={'권한 추가'}>
			<TableOptionText data={'roles'} />
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.users.add.roles.include}
				excludedData={excludedData}
				includedData={includedData}
			>
				<RowDiv>
					<Table
						isDraggable
						data={excludedData}
						tableKey={tableKeys.users.add.roles.exclude}
						columns={excludeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
					<RowDiv alignItems={'center'}>
						<DropButton
							leftTableKey={tableKeys.users.add.roles.exclude}
							RightTableKey={tableKeys.users.add.roles.include}
							select={selected}
							dataLeft={excludedData}
							dataRight={includedData}
							rightDataIds={includedDataIds}
							setRightDataIds={setIncludedDataIds}
						/>
					</RowDiv>
					<ColDiv>
						<TableHeader>
							추가 Roles: {includedDataIds.length}건
						</TableHeader>
						<Table
							isDraggable
							data={includedData}
							tableKey={tableKeys.users.add.roles.include}
							columns={includeColumns}
						/>
					</ColDiv>
				</RowDiv>
			</DragContainer>
		</FoldableContainer>
	);
};
AssignRoleToUser.propTypes = {};

export default AssignRoleToUser;
