import React, {useCallback, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {TableMode} from '../../../../../Constants/Table/mode';
import checkboxColumn from '../../../../Table/tableCheckboxColumn';
import {tableKeys} from '../../../../../Constants/Table/keys';
import TableAllCheckbox from '../../../../Table/Options/TableAllCheckbox';
import RowCheckbox from "../../../../RecycleComponents/rowCheckbox";

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

	const dataLists = [
		{id : 1, data : "create"},
		{id : 2, data : "read"},
		{id : 3, data : "update"},
		{id : 4, data : "delete"},
	]

	return (
		<div>
		 <RowCheckbox dataLists={dataLists}/>
		 <RowCheckbox dataLists={dataLists}/>
		 <RowCheckbox dataLists={dataLists}/>
		 <RowCheckbox dataLists={dataLists}/>
		</div>
	);
};

export default UserManagement;
