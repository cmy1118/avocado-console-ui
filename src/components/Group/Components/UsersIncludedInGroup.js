import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import styled from 'styled-components';
import DropButton from '../../Table/DropButton';

const _Tables = styled.div`
	display: flex;
`;
const DndKey = 'usersIncludedInGroupOnAddPage_DndKey';
const leftTableKey = 'usersIncludedInGroupOnAddPage';
const RightTableKey = 'usersExcludedFromGroupOnAddPage';

const UsersIncludedInGroup = () => {
	const {users} = useSelector(IAM_USER.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	const [select, setSelect] = useState([]);
	const [selected, setSelected] = useState([]);
	//uid -> id , id -> _id 변경

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

	return (
		<>
			<div>그룹에 사용자에 추가 </div>
			<_Tables>
				<Table
					data={dataLeft}
					tableKey='usersIncludedInGroupOnAddPage'
					columns={
						getColumnsAsKey['usersIncludedInGroupOnAddPageColumns']
					}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={DndKey}
					setSelect={setSelect}
				/>
				<DropButton
					leftTableKey={leftTableKey}
					RightTableKey={RightTableKey}
					select={select}
					rightDataIds={rightDataIds}
					setRightDataIds={setRightDataIds}
				/>
				<div>
					<div>추가 사용자: {rightDataIds.length}건</div>
					<Table
						data={dataRight}
						tableKey='usersExcludedFromGroupOnAddPage'
						columns={
							getColumnsAsKey[
								'usersExcludedFromGroupOnAddPageColumns'
							]
						}
						isPageable
						isNumberOfRowsAdjustable
						isColumnFilterable
						isSortable
						isSelectable
						isDnDPossible
						dndKey={DndKey}
						setData={setRightDataIds}
						setSelect={setSelect}
					/>
				</div>
			</_Tables>
		</>
	);
};

export default UsersIncludedInGroup;
