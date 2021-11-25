import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import DropButton from '../../../Table/DropButton';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import PropTypes from 'prop-types';
import {ColDiv, RowDiv, TableHeader} from '../../../../styles/components/style';
import DragContainer from '../../../Table/DragContainer';
import TableContainer from '../../../Table/TableContainer';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import CURRENT_TARGET from '../../../../reducers/currentTarget';
import {DRAGGABLE_KEY} from '../../../../Constants/Table/keys';

const AssignRoleToUser = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {roles} = useSelector(IAM_ROLES.selector);
	const {page} = useSelector(PAGINATION.selector);

	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});

	console.log(roles);

	const excludedData = useMemo(() => {
		// return [];
		return roles
			?.filter((v) => !includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				createdTime: v.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.id,
				// numberOfUsers: v.users.length,
			}));
	}, [includedDataIds, roles]);

	const includedData = useMemo(() => {
		// return [];
		return roles
			?.filter((v) => includedDataIds.includes(v.id))
			.map((v) => ({
				...v,
				type: roleTypeConverter(v.companyId),
				[DRAGGABLE_KEY]: v.id,
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

	//Role 정보 조회
	useEffect(() => {
		if (page[tableKeys.users.add.roles.exclude]) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.users.add.roles.exclude],
				}),
			);
		}
	}, [dispatch, page]);

	return (
		<FoldableContainer>
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
							<RowDiv alignItems={'center'}>
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
							</RowDiv>
							<ColDiv>
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
		</FoldableContainer>
	);
};
AssignRoleToUser.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default AssignRoleToUser;
