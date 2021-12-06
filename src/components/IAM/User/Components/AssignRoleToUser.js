import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_ROLES from '../../../../reducers/api/IAM/User/Role/roles';
import {roleTypeConverter} from '../../../../utils/tableDataConverter';
import DropButton from '../../../Table/DropButton';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableFold from '../../../Table/Options/TableFold';
import PropTypes from 'prop-types';
import {
	ColDiv,
	CollapsbleContent,
	RowDiv,
	TableHeader,
} from '../../../../styles/components/style';
import DragContainer from '../../../Table/DragContainer';
import {FoldableContainer} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';
import CURRENT_TARGET from '../../../../reducers/currentTarget';

const AssignRoleToUser = ({space, isFold, setIsFold}) => {
	const dispatch = useDispatch();
	const {page} = useSelector(PAGINATION.selector);

	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [select, setSelect] = useState({});
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

	//Role 정보 조회
	useEffect(() => {
		const arr = [];
		if (page[tableKeys.users.add.roles.exclude]) {
			dispatch(
				IAM_ROLES.asyncAction.getsAction({
					range: page[tableKeys.users.add.roles.exclude],
				}),
			)
				.unwrap()
				.then((res) => {
					// res : 사용자에게 부여된 role 정보
					res.data.map((v) => arr.push(v.id));
					console.log('res', res);
					setRoles(res.data);
				});
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

			<CollapsbleContent height={isFold[space] ? '374px' : '0px'}>
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
						<Table
							setSelect={setSelect}
							isDraggable
							data={excludedData}
							tableKey={tableKeys.users.add.roles.exclude}
							columns={
								tableColumns[tableKeys.users.add.roles.exclude]
							}
							isPaginable
							isSearchable
							isSearchFilterable
							isColumnFilterable
						/>
						<RowDiv alignItems={'center'}>
							<DropButton
								leftTableKey={tableKeys.users.add.roles.exclude}
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
							<Table
								setSelect={setSelect}
								isDraggable
								data={includedData}
								tableKey={tableKeys.users.add.roles.include}
								columns={
									tableColumns[
										tableKeys.users.add.roles.include
									]
								}
							/>
						</ColDiv>
					</RowDiv>
				</DragContainer>
			</CollapsbleContent>
		</FoldableContainer>
	);
};
AssignRoleToUser.propTypes = {
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};

export default AssignRoleToUser;
