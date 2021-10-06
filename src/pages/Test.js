import React from 'react';
import TableTest from '../components/Test/TableTest';
import {useSelector} from 'react-redux';
import {settingSelector} from '../reducers/setting';
import DnD1Table from '../components/Table/DnD1Table/DnD1Table';

const Test = () => {
	const {data1, data2} = useSelector(settingSelector.all);
	const columns = React.useMemo(
		() => [
			{
				Header: 'id',
				accessor: 'id',
			},
			{
				Header: 'name',
				accessor: 'name',
			},
		],
		[],
	);

	// const data1 = React.useMemo(
	// 	() => [
	// 		{
	// 			id: 'id1',
	// 			name: 'name1',
	// 		},
	// 		{
	// 			id: 'id2',
	// 			name: 'name2',
	// 		},
	// 		{
	// 			id: 'id3',
	// 			name: 'name3',
	// 		},
	// 		{
	// 			id: 'id4',
	// 			name: 'name4',
	// 		},
	// 	],
	// 	[],
	// );
	//
	// const data2 = React.useMemo(
	// 	() => [
	// 		{
	// 			id: 'id5',
	// 			name: 'name5',
	// 		},
	// 		{
	// 			id: 'id6',
	// 			name: 'name6',
	// 		},
	// 		{
	// 			id: 'id7',
	// 			name: 'name7',
	// 		},
	// 		{
	// 			id: 'id8',
	// 			name: 'name8',
	// 		},
	// 	],
	// 	[],
	// );

	return (
		<div style={{display: 'flex'}}>
			<DnD1Table columns={columns} data={data1} tableKey={'table1'} />
			<DnD1Table columns={columns} data={data2} tableKey={'table2'} />
		</div>
	);
};

export default Test;
