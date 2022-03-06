import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '../../../../Table/Table';
import {TableMode} from '../../../../../Constants/Table/mode';
import checkboxColumn from '../../../../Table/tableCheckboxColumn';
import {tableKeys} from '../../../../../Constants/Table/keys';
import TableAllCheckbox from '../../../../Table/Options/TableAllCheckbox';
import RowCheckbox from "../../../../RecycleComponents/rowCheckbox";
import IAM_USER from "../../../../../reducers/api/IAM/User/User/user";
import {useDispatch} from "react-redux";
import IAM_POLICY_ACTION_TEMPLATE from "../../../../../reducers/api/IAM/Policy/ActionTemplate/actionTemplate";

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
	const dispatch = useDispatch();
	// const [dataLists,setDataLists] =useState([]);

	// const dataLists = [
	// 	{id : 1, data : "create"},
	// 	{id : 2, data : "read"},
	// 	{id : 3, data : "update"},
	// 	{id : 4, data : "delete"},
	// ]

	const dataLists =[
		{ resource:"user",data:[{action:'create',data:2},{action:'delete',data:3}]},
		{ resource:"group" ,data:[{id:'create',data:false},{id:'update',data:false},{id:'read',data:6}]},
		{ resource:"member" ,data:[{id:'create',data:4},{id:'update',data:false},{id:'read',data:6}]},
		{ resource:"group-type" ,data:[{id:'create',data:4},{id:'update',data:false},{id:'read',data:6}]},
		{ resource:"group-tag" ,data:[{id:'create',data:4},{id:'update',data:false},{id:'read',data:6}]}
	]

	//렌더링시 권한 템플릿 상세 정보를 조회
	// useEffect(() => {
	// 	const res = dispatch(
	// 		IAM_POLICY_ACTION_TEMPLATE.asyncAction.findAllAction({
	// 			range: 'elements=0-50',
	// 		}),
	// 	).unwrap()
	// 		.then(res =>{
	// 			console.log('권한 템플릿 상세 정보를 조회:',res);
	// 			setDataLists(res.data);
	//
	// 		})
	// }, [dispatch]);

	return (
		<div>
			{dataLists.map((item,index)=>(
				<RowCheckbox dataLists={item.data} key={index}/>
			))}
			{/*{this.state.contactData.map((contact, i) => {*/}
			{/*	return (<ContactInfo name={contact.name}*/}
			{/*	phone={contact.phone}*/}
			{/*	key={i}*/}
			{/*	/>);*/}
			{/*})}*/}
		 {/*<RowCheckbox dataLists={dataLists}/>*/}
		 {/*<RowCheckbox dataLists={dataLists}/>*/}
		 {/*<RowCheckbox dataLists={dataLists}/>*/}
		 {/*<RowCheckbox dataLists={dataLists}/>*/}
		</div>
	);
};

export default UserManagement;
