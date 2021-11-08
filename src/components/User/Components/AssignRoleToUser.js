import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {TableFoldContainer} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import TableFold from '../../Table/Options/TableFold';
import PropTypes from 'prop-types';
import {ColDiv, DnDDiv, RowDiv, TableHeader} from '../../../styles/components/div';
import DragContainer from '../../Table/DragContainer';
import TableContainer from '../../Table/TableContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const AssignRoleToUser = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});

	const excludedData = useMemo(() => {
		return roles
			.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, includedDataIds]);

	const includedData = useMemo(() => {
		return roles
			.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
			}));
	}, [roles, includedDataIds]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.roles.exclude,
				data: includedData,
			}),
		);
	}, [includedData, dispatch]);

	return (
		<TableFoldContainer>
			<TableFold
				title={'권한 추가'}
				space={'AssignRoleToUser'}
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
						includedKey={tableKeys.users.add.roles.include}
						excludedData={excludedData}
						includedData={includedData}
					>
						<RowDiv>
							<TableContainer
								data={excludedData}
								tableKey={tableKeys.users.add.roles.exclude}
								columns={
									tableColumns[
										tableKeys.users.add.roles.exclude
									]
								}
							>
								<TableOptionsBar />
								<Table setSelect={setSelect} isDraggable />
							</TableContainer>
							<DnDDiv alignItems={'center'}>
								<DropButton
									leftTableKey={
										tableKeys.users.add.roles.exclude
									}
									RightTableKey={
										tableKeys.users.add.roles.include
									}
									select={select}
									dataLeft={excludedData}
									dataRight={includedData}
									rightDataIds={includedDataIds}
									setRightDataIds={setIncludedDataIds}
								/>
							</DnDDiv>
							<ColDiv width={'700px'}>
								<TableHeader>
									추가 Roles: {includedDataIds.length}건
								</TableHeader>
								<TableContainer
									data={includedData}
									tableKey={tableKeys.users.add.roles.include}
									columns={
										tableColumns[
											tableKeys.users.add.roles.include
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
AssignRoleToUser.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default AssignRoleToUser;
