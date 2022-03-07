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
import {ColDiv} from "../../../../../styles/components/style";

const constants = {
	main: '사용자 관리 권한',
	title: '',
	templates: {},
	templatesId :'KR-2020-0001:202202:0001'
};



const UserManagement = () => {
	const dispatch = useDispatch();
	const [dataLists,setDataLists] =useState([]);

	// const dataLists = [
	// 	{id : 1, data : "create"},
	// 	{id : 2, data : "read"},
	// 	{id : 3, data : "update"},
	// 	{id : 4, data : "delete"},
	// ]

	const column =['전체권한','추가(생성)','수정','삭제','조회','부여','회수','설명']
	const tempColumn =['created','updated','deleted','read','revoked']
	const tempDataLists =[
		{ action: 'create', data: false },
		{ action: 'read', data: false },
		{ action: 'update', data: false },
		{ action: 'delete', data: false },
		{ action: 'find', data: false },
 ]

	//렌더링시 권한 템플릿 상세 정보를 조회
	useEffect(() => {
		const res = dispatch(
			IAM_POLICY_ACTION_TEMPLATE.asyncAction.findAllAction({
				range: 'elements=0-50',
				templateId : constants.templatesId
			}),
		).unwrap()
			.then(res =>{
				//모듈화 예정 ...
				let filteredDataList =[]
				const newData= res['data'].map(v=>{
					let istrue;
					 istrue = filteredDataList.filter(s=>{
						return v['resource'] === s['resource']
					})
					if(filteredDataList[0] && istrue[0]){
						const index = filteredDataList.findIndex(item => {
							return item.resource === v['resource'];
						});
						filteredDataList[index].data.push(v)
					}else{
						filteredDataList.push({resource:v.resource , data: [v]})
					}
				})
				const arr =[]
				const result = filteredDataList.map(v=>{
					const list = v['data'].map(s=>s.action)
					const duplicatedData =tempDataLists.filter(item=>
						!list.includes(item['action'])
					)
					const newData= v['data'].concat(duplicatedData)
					const newObject ={resource:v.resource , data:newData}
					arr.push(newObject)
				})
				console.log('Api-dataList:',arr)
				setDataLists(arr)


			})
	}, [dispatch]);

	return (

		<div>
			<ColDiv padding={'0px 0px 0px 25%'} width={'100%'}>
			{column}
			</ColDiv>
			{dataLists.map((item,index)=>(
				<RowCheckbox title={item.resource} dataLists={item.data} key={index}/>
			))}
		</div>
	);
};

export default UserManagement;
