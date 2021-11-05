import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../utils/tableDataConverter';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {_Tables, RowDiv, TableHeader} from '../../../styles/components/div';
import {TableFoldContainer} from '../../../styles/components/table';
import TableOptionText from '../../Table/Options/TableOptionText';
import TableFold from '../../Table/Options/TableFold';
import PropTypes from 'prop-types';

const AssignRoleToUser = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);

	const dataLeft = useMemo(() => {
		return roles
			.filter((v) => !rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				numberOfUsers: v.users.length,
			}));
	}, [roles, rightDataIds]);

	const dataRight = useMemo(() => {
		return roles
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
			}));
	}, [roles, rightDataIds]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.roles.exclude,
				data: dataRight,
			}),
		);
	}, [dataRight, dispatch]);

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
					<_Tables>
						<Table
							data={dataLeft}
							tableKey={tableKeys.users.add.roles.exclude}
							columns={
								tableColumns[tableKeys.users.add.roles.exclude]
							}
							isPageable
							isNumberOfRowsAdjustable
							isColumnFilterable
							isSortable
							isSelectable
							isDnDPossible
							isSearchable
							dndKey={tableKeys.users.add.roles.dnd}
							setSelect={setSelect}
							setData={setRightDataIds}
						/>
						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={tableKeys.users.add.roles.exclude}
								RightTableKey={
									tableKeys.users.add.roles.include
								}
								select={select}
								dataLeft={dataLeft}
								dataRight={dataRight}
								rightDataIds={rightDataIds}
								setRightDataIds={setRightDataIds}
							/>
						</RowDiv>
						<div>
							<TableHeader>
								추가 Roles: {rightDataIds.length}건
							</TableHeader>
							<Table
								data={dataRight}
								tableKey={tableKeys.users.add.roles.include}
								columns={
									tableColumns[
										tableKeys.users.add.roles.include
									]
								}
								isSortable
								isSelectable
								isDnDPossible
								dndKey={tableKeys.users.add.roles.dnd}
								setData={setRightDataIds}
								setSelect={setSelect}
								control
							/>
						</div>
					</_Tables>
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
