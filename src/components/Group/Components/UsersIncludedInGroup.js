import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import DropButton from '../../Table/DropButton';
import {tableKeys} from '../../../Constants/Table/keys';
import {tableColumns} from '../../../Constants/Table/columns';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {_Tables, RowDiv, TableHeader} from '../../../styles/components/div';
import {TableSpace} from "../../../styles/components/table";
import TableOptionText from "../../Table/Options/TableOptionText";

const UsersIncludedInGroup = () => {
	const dispatch = useDispatch();
	const {users} = useSelector(IAM_USER.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);

	const dataLeft = useMemo(() => {
		const dropDataName = users
			.map(({uid: id, id: _id, ...rest}) => ({
				id,
				_id,
				...rest,
			}))
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => v.name);
		return users
			.filter((v) => !dropDataName.includes(v.name))
			.map((v) => ({
				...v,
				numberOfGroups: v.groups.length,
			}));
	}, [users, rightDataIds]);

	const dataRight = useMemo(() => {
		return users
			.map(({uid: id, id: _id, ...rest}) => ({
				id,
				_id,
				...rest,
			}))
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
			}));
	}, [users, rightDataIds]);

	useEffect(() => {
		dispatch(
			CURRENT_TARGET.action.addReadOnlyData({
				title: tableKeys.groups.add.roles.include,
				data: dataRight,
			}),
		);
	}, [dataRight, dispatch]);

	return (
		<>
			<TableSpace>그룹에 사용자에 추가 </TableSpace>
			<TableOptionText data={'groups'}/>
			<_Tables>
				<Table
					data={dataLeft}
					tableKey={tableKeys.groups.add.users.exclude}
					columns={tableColumns[tableKeys.groups.add.users.exclude]}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					isSearchable
					dndKey={tableKeys.groups.add.users.dnd}
					setSelect={setSelect}
					setData={setRightDataIds}
				/>
				<RowDiv alignItems={'center'}>
					<DropButton
						leftTableKey={tableKeys.groups.add.users.exclude}
						RightTableKey={tableKeys.groups.add.users.include}
						select={select}
						dataLeft={dataLeft}
						dataRight={dataRight}
						rightDataIds={rightDataIds}
						setRightDataIds={setRightDataIds}
					/>
				</RowDiv>
				<div>
					<TableHeader>
						추가 사용자: {rightDataIds.length}건
					</TableHeader>
					<Table
						data={dataRight}
						tableKey={tableKeys.groups.add.users.include}
						columns={
							tableColumns[tableKeys.groups.add.users.include]
						}
						isSortable
						isSelectable
						isDnDPossible
						dndKey={tableKeys.groups.add.users.dnd}
						setData={setRightDataIds}
						setSelect={setSelect}
						control
					/>
				</div>
			</_Tables>
		</>
	);
};

export default UsersIncludedInGroup;
