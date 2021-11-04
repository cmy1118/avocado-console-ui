import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {_Tables, RowDiv, TableHeader} from '../../../styles/components/div';
import DragContainer from '../../Table/DragContainer';

const AddUserToGroup = () => {
	const dispatch = useDispatch();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState({});
	const [datas, setDatas] = useState({
		[tableKeys.users.add.groups.exclude]:
			groups
				.filter(
					(v) =>
						!groups
							.filter((v) => rightDataIds.includes(v.id))
							.map((v) => v.clientGroupTypeId)
							.includes(v.clientGroupTypeId),
				)
				.map((v) => ({
					...v,
					type: v.clientGroupTypeId,
					numberOfUsers: v.members.length,
				})) || [],
		[tableKeys.users.add.groups.include]: [],
	});

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.users.add.groups.exclude,
				data: datas[tableKeys.users.add.groups.include],
			}),
		);
	}, [datas, dispatch]);

	return (
		<DragContainer selected={select} data={datas} setData={setDatas}>
			<div>그룹에 사용자에 추가</div>
			<_Tables>
				<Table
					tableKey={tableKeys.users.add.groups.exclude}
					columns={tableColumns[tableKeys.users.add.groups.exclude]}
					data={datas[tableKeys.users.add.groups.exclude]}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					isSearchable
					dndKey={tableKeys.users.add.groups.dnd}
					setData={setRightDataIds}
					setSelect={setSelect}
				/>
				<RowDiv alignItems={'center'}>
					<DropButton
						leftTableKey={tableKeys.users.add.groups.exclude}
						RightTableKey={tableKeys.users.add.groups.include}
						select={select}
						dataLeft={datas[tableKeys.users.add.groups.exclude]}
						dataRight={datas[tableKeys.users.add.groups.include]}
						rightDataIds={rightDataIds}
						setRightDataIds={setRightDataIds}
					/>
				</RowDiv>
				<div>
					<TableHeader>
						추가 그룹: {rightDataIds.length}건
					</TableHeader>
					<Table
						tableKey={tableKeys.users.add.groups.include}
						columns={
							tableColumns[tableKeys.users.add.groups.include]
						}
						data={datas[tableKeys.users.add.groups.include]}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={tableKeys.users.add.groups.dnd}
						setData={setRightDataIds}
						setSelect={setSelect}
						control
					/>
				</div>
			</_Tables>
		</DragContainer>
	);
};

export default AddUserToGroup;
