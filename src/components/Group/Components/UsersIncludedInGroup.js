import React, {useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
const DndKey = 'usersIncludedInGroupOnAddPage_DndKey';

const UsersIncludedInGroup = () => {
	const {users} = useSelector(IAM_USER.selector);
	const [rightDataIds, setRightDataIds] = useState([]);
	//uid -> id , id -> _id 변경
	const _users = users.map(({uid: id, id: _id, ...rest}) => ({
		id,
		_id,
		...rest,
	}));
	const dataLeft = useMemo(() => {
		const dropDataName = _users
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => v.name);
		return _users
			.filter((v) => !dropDataName.includes(v.name))
			.map((v) => ({
				...v,
			}));
	}, [_users, rightDataIds, users]);

	const dataRight = useMemo(() => {
		return _users
			.filter((v) => rightDataIds.includes(v.id))
			.map((v) => ({
				...v,
			}));
	}, [_users, rightDataIds]);

	return (
		<>
			<div>그룹에 사용자에 추가</div>
			<div style={{display: 'flex'}}>
				<Table
					tableKey='usersIncludedInGroupOnAddPage'
					columns={
						getColumnsAsKey['usersIncludedInGroupOnAddPageColumns']
					}
					data={dataLeft}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={DndKey}
				/>
				<Table
					tableKey='usersExcludedFromGroupOnAddPage'
					columns={
						getColumnsAsKey[
							'usersExcludedFromGroupOnAddPageColumns'
						]
					}
					data={dataRight}
					isPageable
					isNumberOfRowsAdjustable
					isColumnFilterable
					isSortable
					isSelectable
					isDnDPossible
					dndKey={DndKey}
					setData={setRightDataIds}
				/>
			</div>
		</>
	);
};

export default UsersIncludedInGroup;
