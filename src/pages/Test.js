import React from 'react';
import TableTest from '../components/Test/TableTest';

const Test = () => {
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

	const data1 = React.useMemo(
		() => [
			{
				id: 'id1',
				name: 'name1',
			},
			{
				id: 'id2',
				name: 'name2',
			},
			{
				id: 'id3',
				name: 'name3',
			},
			{
				id: 'id4',
				name: 'name4',
			},
		],
		[],
	);

	const data2 = React.useMemo(
		() => [
			{
				id: 'id5',
				name: 'name5',
			},
			{
				id: 'id6',
				name: 'name6',
			},
			{
				id: 'id7',
				name: 'name7',
			},
			{
				id: 'id8',
				name: 'name8',
			},
		],
		[],
	);

	return (
		<>
			<TableTest columns={columns} data={data1} />
			<TableTest columns={columns} data={data2} />
		</>
	);
};

export default Test;
