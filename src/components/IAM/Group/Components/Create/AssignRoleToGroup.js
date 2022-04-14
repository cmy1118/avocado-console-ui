import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import {totalNumberConverter} from '../../../../../utils/tableDataConverter';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../../../reducers/currentTarget';
import DropButton from '../../../../Table/DropButton';
import {
	ColDiv,
	RowDiv,
	TableHeader,
} from '../../../../../styles/components/style';
import TableOptionText from '../../../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import FoldableContainer from '../../../../Table/Options/FoldableContainer';
import DragContainer from '../../../../Table/DragContainer';
import useSelectColumn from '../../../../../hooks/table/useSelectColumn';
import PAGINATION from '../../../../../reducers/pagination';
import IAM_ROLES from '../../../../../reducers/api/IAM/User/Role/roles';
import {IamSectionContents} from '../../../../../styles/components/iam/addPage';

const AssignRoleToGroup = ({setValue}) => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const {page} = useSelector(PAGINATION.selector);

	const [includedDataIds, setIncludedDataIds] = useState([]);

	const [selected, setSelected] = useState({});

	const iamExcludedData = useMemo(() => {
		return (
			roles
				.filter((v) => !includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					roleType: 'IAM',
					createdTime: v.createdTag.createdTime,
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [roles, includedDataIds]);

	const iamIncludedData = useMemo(() => {
		return (
			roles
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					roleType: 'IAM',
					[DRAGGABLE_KEY]: v.id,
				})) || []
		);
	}, [roles, includedDataIds]);

	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.add.roles.exclude],
		iamExcludedData,
	);
	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.groups.add.roles.include],
		iamIncludedData,
	);

	// const onClickDeleteRolesFromGroup = useCallback(() => {
	// 	alert('에러 있어서 막아놨습니다.');
	// 	// setIncludedDataIds(
	// 	// 	includedDataIds.filter((v) => !selectedIncludedRoles.includes(v)),
	// 	// );
	// }, []);
	//
	// const onClickAddRolesToGroup = useCallback(() => {
	// 	alert('에러 있어서 막아놨습니다.');
	// 	// setIncludedDataIds([...includedDataIds, ...selectedExcludedRoles]);
	// }, []);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.roles.include,
				data: iamIncludedData,
			}),
		);
	}, [iamIncludedData, dispatch]);

	useEffect(() => {
		page[tableKeys.groups.add.roles.exclude] &&
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.groups.add.roles.exclude],
				}),
			)
				.unwrap()
				.then((res) => {
					dispatch(
						PAGINATION.action.setTotal({
							tableKey: tableKeys.groups.add.roles.exclude,
							element: totalNumberConverter(
								res.headers['content-range'],
							),
						}),
					);
				});
	}, [dispatch, page]);

	useEffect(() => {
		setValue(includedDataIds);
	}, [includedDataIds, setValue]);

	useEffect(() => {
		setSelected({
			[tableKeys.groups.add.roles.exclude]: excludeSelect,
			[tableKeys.groups.add.roles.include]: includeSelect,
		});
	}, [excludeSelect, includeSelect]);

	return (
		<FoldableContainer title={'권한 추가'} bottomMargin={true}>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.groups.add.roles.include}
				excludedData={iamExcludedData}
				includedData={iamIncludedData}
			>
				<IamSectionContents>
					<TableOptionText data={'roles'} />
					<RowDiv>
						<Table
							isDraggable
							data={iamExcludedData}
							tableKey={tableKeys.groups.add.roles.exclude}
							columns={excludeColumns}
							isPaginable
							isSearchable
							// isSearchFilterable
							// isColumnFilterable
						/>
						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={
									tableKeys.groups.add.roles.exclude
								}
								RightTableKey={
									tableKeys.groups.add.roles.include
								}
								select={selected}
								dataRight={iamIncludedData}
								dataLeft={iamExcludedData}
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
								data={iamIncludedData}
								tableKey={tableKeys.groups.add.roles.include}
								columns={includeColumns}
							/>
						</ColDiv>
					</RowDiv>{' '}
				</IamSectionContents>
			</DragContainer>
		</FoldableContainer>
	);
};
AssignRoleToGroup.propTypes = {
	setValue: PropTypes.func,
};
export default AssignRoleToGroup;
