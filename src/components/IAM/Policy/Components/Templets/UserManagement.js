import React, {useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {TableMode} from '../../../../../Constants/Table/mode';
import checkboxColumn from '../../../../Table/tableCheckboxColumn';
import TableCheckbox from '../../../../Table/Options/TableCheckbox';
import {tableKeys} from '../../../../../Constants/Table/keys';
import CheckBox from '../../../../RecycleComponents/New/CheckBox';
import TableAllCheckbox from '../../../../Table/Options/TableAllCheckbox';

const constants = {
	main: '사용자 관리 권한',
	title: '',
	templates: {},

	tempTableData: [
		{
			id: 1,
			item: '사용자',
			fullAuth: '전체 권한',
			create: '생성/추가',
			read: '조회 ',
			update: '수정',
			delete: '삭제/제외',
			description: '1',
		},
		{
			id: 2,
			item: '사용자 태그',
			fullAuth: 'fullAuth',
			create: 'create',
			read: 'read',
			update: 'update',
			delete: 'delete',
			description: '2',
		},
		{
			id: 3,
			item: '사용자 그룹',
			fullAuth: 'fullAuth',
			create: 'create',
			read: 'read',
			update: 'update',
			delete: 'delete',
			description: '3',
		},
		{
			id: 4,
			item: '사용자 그룹 유형',
			fullAuth: 'fullAuth',
			create: 'create',
			read: 'read',
			update: 'update',
			delete: 'delete',
			description: '3',
		},
		{
			id: 5,
			item: '사용자 그룹 멤버',
			fullAuth: 'fullAuth',
			create: 'create',
			read: 'read',
			update: 'update',
			delete: 'delete',
			description: '3',
		},
	],
};

const UserManagement = () => {
	// 자식이 선택되었는 지 유무 state
	const [childCheck, setChildCheck] = useState();

	const POLICY_ADD_USER_MANAGEMEN_COLUMN = useMemo(
		() => [
			{
				accessor: 'item',
				Header: '항목',
				disableFilters: true,
				disableChangeVisible: true,
			},
			//checkboxColumn : 전체 선택 컴포넌트
			checkboxColumn({
				header: '전체권한',
				tableKey: tableKeys.policy.policies.userManagement,
				childCheck: childCheck,
			}),
			{
				accessor: 'create',
				Header: '생성/추가',
				disableFilters: true,
				disableChangeVisible: true,
				Cell: function Component(row) {
					return (
						<TableAllCheckbox
							row={row}
							tableKey={tableKeys.policy.policies.userManagement}
							setChildCheck={setChildCheck}
						/>
					);
				},
			},
			{
				accessor: 'read',
				Header: '조회',
				disableFilters: true,
				disableChangeVisible: true,
				Cell: function Component(row) {
					return (
						<TableAllCheckbox
							row={row}
							tableKey={tableKeys.policy.policies.userManagement}
							setChildCheck={setChildCheck}
						/>
					);
				},
			},
			{
				accessor: 'update',
				Header: '수정',
				disableFilters: true,
				disableChangeVisible: true,
				Cell: function Component(row) {
					return (
						<TableAllCheckbox
							row={row}
							tableKey={tableKeys.policy.policies.userManagement}
							setChildCheck={setChildCheck}
						/>
					);
				},
			},
			{
				accessor: 'delete',
				Header: '삭제/제외',
				disableFilters: true,
				disableChangeVisible: true,
				Cell: function Component(row) {
					return (
						<TableAllCheckbox
							row={row}
							tableKey={tableKeys.policy.policies.userManagement}
							setChildCheck={setChildCheck}
						/>
					);
				},
			},
		],
		[],
	);
	return (
		<div>
			<Table
				tableKey={tableKeys.policy.policies.userManagement}
				columns={POLICY_ADD_USER_MANAGEMEN_COLUMN}
				data={constants.tempTableData}
				mode={TableMode.CHECKBOX}
			/>
		</div>
	);
};

export default UserManagement;
