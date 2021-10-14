import React, {useEffect, useMemo, useState} from 'react';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import {
	groupsExcludedFromUserOnAddPageColumns,
	groupsIncludedInUserOnAddPageColumns,
} from '../../../utils/TableColumns/users';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {element} from 'prop-types';

const AddUserToGroup = () => {
	//api 에서 받은 데이터
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	//select 값
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);
	//추가 테이블 데이터
	const [dropData, setDropData] = useState([]);
	const [dropDataInfo, setDropDataInfo] = useState([]);

	useEffect(() => {
		// currentTarget.map((v) => {
		// 	const result = [...new Set([...dropData, v.selected])];
		// });

		// 	currentTarget &&
		// 		currentTarget.map((v) => {
		// 			const current = groups
		// 				.filter((s) => s.id === v.selected)
		// 			const result = dropDataInfo;
		// 			result.push(...current);
		//
		// 			setDropDataInfo(result);
		// 		});
		// }, [currentTarget]);

		//셀렉트 id
		console.log(
			'currentTarget.id',
			currentTarget['groupsIncludedInUserOnAddPage'],
		);

		//중복제거 currentTarget 값 useState 저장
		const result = [
			...new Set([
				...dropData,
				currentTarget['groupsIncludedInUserOnAddPage'],
			]),
		];
		const a = [...dropData];
		setDropData(result);

		//셀랙트 객체 전체
		// const result2 = dropData.filter((v) => {
		// 	groups.id.includes(v);
		// });

		// console.log('groups', groups);
		// const result2 = groups.filter((v) => {
		// 	result.includes(v.id);
		// });
		// console.log('result2', result2);
		//
		// console.log(':::state 상태값:::');
		// console.log('dropData', dropData);
		// console.log('dropDataInfo', dropDataInfo);
	}, [currentTarget]);

	/***************************+*****************************/
	// COLUMN_DATA
	/********************************************************/
	// console.log('dropData', dropData);
	const data = useMemo(() => {
		return groups.map((v) => ({
			...v,
			numberOfUsers: v.members.length,
		}));
		// return groups.filter(v.clientGroupTypeId !== dropData.map((v) => ({
		//
		// 	...v,
		// 	numberOfUsers: v.members.length,
		// }));
	}, [groups]);

	const data2 = useMemo(() => {
		return groups.map((v) => ({
			...v,
		}));
	}, [groups]);
	const data3 = useMemo(() => {
		let arr = [];
		dropData?.map((v) => {
			arr = [...arr, ...groups.filter((s) => s.id === v)];
			// dropData([...dropData, ...groups.filter((s) => s.id === v)]);
		});
		return arr.map((v) => ({
			...v,
		}));

		// return dropDataInfo.map((v) => ({
		// 	...v,
		// }));
	}, [dropData]);
	/********************************************************/

	return (
		<>
			<div>그룹에 사용자에 추가</div>
			<div style={{display: 'flex'}}>
				<Table
					tableKey='groupsIncludedInUserOnAddPage'
					columns={
						getColumnsAsKey['groupsIncludedInUserOnAddPageColumns']
					}
					data={data}
					isPageable={true}
					isNumberOfRowsAdjustable={true}
					isColumnFilterable={true}
					isSortable={true}
					isDnDPossible={true}
					dndKey={'dndKey1'}
				/>
				<Table
					tableKey='groupsExcludedFromUserOnAddPage'
					columns={
						getColumnsAsKey[
							'groupsExcludedFromUserOnAddPageColumns'
						]
					}
					data={data3}
					isPageable={true}
					isNumberOfRowsAdjustable={true}
					isColumnFilterable={true}
					isSortable={true}
					isDnDPossible={true}
					dndKey={'dndKey1'}
				/>
			</div>
		</>
	);
};

export default AddUserToGroup;
