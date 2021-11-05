import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {RowDiv, TableHeader} from '../../../styles/components/div';
import DragContainer from '../../Table/DragContainer';
import TableContainer from '../../Table/TableContainer';
import TableOptionsBar from '../../Table/TableOptionsBar';

const AddUserToGroup = () => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [select, setSelect] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);

	const includedData = useMemo(
		() =>
			groups
				.filter((v) => includedDataIds.includes(v.id))
				.map((v) => ({
					...v,
					type: v.clientGroupTypeId,
					numberOfUsers: v.members.length,
				})),
		[groups, includedDataIds],
	);
	const excludedData = useMemo(
		() =>
			groups
				.filter(
					(v) =>
						!groups
							.filter((v) => includedDataIds.includes(v.id))
							.map((v) => v.clientGroupTypeId)
							.includes(v.clientGroupTypeId),
				)
				.map((v) => ({
					...v,
					type: v.clientGroupTypeId,
					numberOfUsers: v.members.length,
				})) || [],
		[groups, includedDataIds],
	);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.groups.exclude,
				data: includedData,
			}),
		);
	}, [dispatch, includedData]);

	return (
		<DragContainer
			selected={select}
			data={includedDataIds}
			setData={setIncludedDataIds}
			includedKey={tableKeys.users.add.groups.include}
			excludedData={excludedData}
			includedData={includedData}
		>
			<div>그룹에 사용자에 추가</div>
			<RowDiv>
				<TableContainer
					tableKey={tableKeys.users.add.groups.exclude}
					columns={tableColumns[tableKeys.users.add.groups.exclude]}
					data={excludedData}
				>
					<TableOptionsBar />
					<Table setSelect={setSelect} isDraggable />
				</TableContainer>
				<RowDiv alignItems={'center'}>
					<DropButton
						leftTableKey={tableKeys.users.add.groups.exclude}
						RightTableKey={tableKeys.users.add.groups.include}
						select={select}
						dataLeft={excludedData}
						dataRight={includedData}
						rightDataIds={includedDataIds}
						setRightDataIds={setIncludedDataIds}
					/>
				</RowDiv>
				<div>
					<TableHeader>
						추가 그룹: {includedDataIds.length}건
					</TableHeader>
					<TableContainer
						tableKey={tableKeys.users.add.groups.include}
						columns={
							tableColumns[tableKeys.users.add.groups.include]
						}
						data={includedData}
					>
						<Table setSelect={setSelect} isDraggable />
					</TableContainer>
				</div>
			</RowDiv>
		</DragContainer>
	);
};

export default AddUserToGroup;
