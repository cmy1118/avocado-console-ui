import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import DropButton from '../../Table/DropButton';
import {ColDiv, RowDiv, TableHeader} from '../../../styles/components/div';
import {TableFoldContainer} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import PropTypes from 'prop-types';
import TableFold from '../../Table/Options/TableFold';
import DragContainer from '../../Table/DragContainer';
import TableContainer from '../../Table/TableContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const AssignRoleToGroup = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});
	const excludedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				numberOfUsers: v.users.length,
			}));
	}, [roles, includedDataIds]);

	const includedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({...v, type: roleTypeConverter(v.companyId)}));
	}, [roles, includedDataIds]);

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
				data: includedData,
			}),
		);
	}, [includedData, dispatch]);

	return (
		<TableFoldContainer>
			<TableFold
				title={'권한 추가'}
				space={'AssignRoleToGroup'}
				isFold={isFold}
				setIsFold={setIsFold}
			/>
			{isFold[space] && (
				<>
					<TableOptionText data={'roles'} />
					<DragContainer
						selected={select}
						data={includedDataIds}
						setData={setIncludedDataIds}
						includedKey={tableKeys.groups.add.roles.include}
						excludedData={excludedData}
						includedData={includedData}
					>
						<RowDiv>
							<TableContainer
								width={'700px'}
								height={'300px'}
								data={excludedData}
								tableKey={tableKeys.groups.add.roles.exclude}
								columns={
									tableColumns[
										tableKeys.groups.add.roles.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
							<RowDiv alignItems={'center'}>
								<DropButton
									leftTableKey={
										tableKeys.groups.add.roles.exclude
									}
									RightTableKey={
										tableKeys.groups.add.roles.include
									}
									select={select}
									dataRight={includedData}
									rightDataIds={includedDataIds}
									setRightDataIds={setIncludedDataIds}
								/>
							</RowDiv>
							<ColDiv>
								<TableHeader>
									추가 Roles: {includedDataIds.length}건
								</TableHeader>
								<TableContainer
									width={'400px'}
									height={'300px'}
									data={includedData}
									tableKey={
										tableKeys.groups.add.roles.include
									}
									columns={
										tableColumns[
											tableKeys.groups.add.roles.include
										]
									}
								>
									<Table setSelect={setSelect} isDraggable />
								</TableContainer>
							</ColDiv>
						</RowDiv>
					</DragContainer>
				</>
			)}
		</TableFoldContainer>
	);
};
AssignRoleToGroup.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default AssignRoleToGroup;
