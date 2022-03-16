import React, {useMemo, useRef, useState} from 'react';
import Table from '../components/Table/Table';
import TableCheckBox from '../components/Table/ColumnCells/TableCheckBox';
import {DRAGGABLE_KEY} from '../Constants/Table/keys';

const TemplateExample = () => {
	const checkboxRefs = useRef([]);
	const [tableData, setTableData] = useState([
		{
			id: `TemplateExample-1`,
			[DRAGGABLE_KEY]: `TemplateExample-1`,
			'all-check': true,
			read: true,
			update: true,
			delete: true,
		},
		{
			id: `TemplateExample-2`,
			[DRAGGABLE_KEY]: `TemplateExample-2`,
			'all-check': true,
			read: true,
			update: true,
			delete: true,
		},
		{
			id: `TemplateExample-3`,
			[DRAGGABLE_KEY]: `TemplateExample-3`,
			'all-check': true,
			read: true,
			update: true,
			delete: true,
		},
		{
			id: `TemplateExample-4`,
			[DRAGGABLE_KEY]: `TemplateExample-4`,
			'all-check': true,
			read: true,
			update: true,
			delete: true,
		},
		{
			id: `TemplateExample-5`,
			[DRAGGABLE_KEY]: `TemplateExample-5`,
			'all-check': true,
			read: true,
			update: true,
			delete: true,
		},
	]);
	const [lastChecked, setLastChecked] = useState(null);

	const columns = useMemo(
		() => [
			{
				Header: '전체',
				accessor: 'all-check', //has to be changed
				Cell: function Component(cell) {
					return (
						<TableCheckBox
							cell={cell}
							setData={setTableData}
							refs={checkboxRefs}
							allCheckKey={'all-check'}
							lastChecked={lastChecked}
							setLastChecked={setLastChecked}
						/>
					);
				},
				width: 30,
			},
			{
				Header: '조회',
				accessor: 'read', //has to be changed
				Cell: function Component(cell) {
					return (
						<TableCheckBox
							cell={cell}
							setData={setTableData}
							refs={checkboxRefs}
							allCheckKey={'all-check'}
							lastChecked={lastChecked}
							setLastChecked={setLastChecked}
						/>
					);
				},
				width: 30,
			},
			{
				Header: '수정',
				accessor: 'update', //has to be changed
				Cell: function Component(cell) {
					return (
						<TableCheckBox
							cell={cell}
							setData={setTableData}
							refs={checkboxRefs}
							allCheckKey={'all-check'}
							lastChecked={lastChecked}
							setLastChecked={setLastChecked}
						/>
					);
				},
				width: 30,
			},
			{
				Header: '삭제',
				accessor: 'delete', //has to be changed
				Cell: function Component(cell) {
					return (
						<TableCheckBox
							cell={cell}
							setData={setTableData}
							refs={checkboxRefs}
							allCheckKey={'all-check'}
							lastChecked={lastChecked}
							setLastChecked={setLastChecked}
						/>
					);
				},
				width: 30,
			},
		],
		[lastChecked],
	);

	return (
		<div>
			<h3>TemplateExample</h3>
			<Table
				tableKey={'TemplateExample-key'}
				data={tableData}
				columns={columns}
				isCheckBox={false}
				setData={setTableData}
			/>
		</div>
	);
};

export default TemplateExample;
