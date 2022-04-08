import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import TableContainer from '../../../../../Table/TableContainer';
import Table from '../../../../../Table/Table';
import TemplateLayout from '../Layout/TemplateLayout';
import {DRAGGABLE_KEY} from '../../../../../../Constants/Table/keys';
import TableTextBox from '../../../../../Table/ColumnCells/TableTextBox';
import TableComboBox from '../../../../../Table/ColumnCells/TableComboBox';
import TableCheckBox from '../../../../../Table/ColumnCells/TableCheckBox';
import useSelection from '../../../../../../hooks/table/useSelection';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	fileDirectory: {
		title: '파일/디렉토리',
		description: [
			'파일, 디렉토리에 대한 읽기 또는 쓰기를 못하도록 제한하는 정책입니다.',
			'파일에 대한 접근제어는 읽기, 쓰기 제한 가능하며, 읽기 제한은 조회가 불가능하며, 쓰기 제한은 편집 및 삭제가 불가능합니다.',
			`디렉토리에 대한 접근제어는 '읽기'만 제한하며, 제한할 경우 하위의 디렉토리 및 디렉토리 하위의 모든 파일 접근이 불가능합니다.`,
			`파일과 디렉토리는 전체이름을 기입해야 하며, 최대 20건까지 제한 가능합니다.`,
		],
	},
};

const FileAccess = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [select, selectionColumn] = useSelection();

	// 세션 타임아웃 테이블 컬럼
	const columns = useMemo(
		() => [
			selectionColumn,
			{
				Header: '구분',
				accessor: 'type',
				Cell: function Component(cell) {
					return (
						<TableComboBox
							cell={cell}
							options={[
								{label: '디렉토리', key: 'directory'},
								{label: '파일', key: 'file'},
								{label: '확장자', key: 'extension'},
							]}
							setData={setTableData}
						/>
					);
				},
				width: 200,
			},
			{
				Header: '파일/디렉토리 이름',
				accessor: 'name', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
				// width: 300,
			},
			{
				Header: '읽기 제한',
				accessor: 'read', //has to be changed
				Cell: function Component(cell) {
					return <TableCheckBox cell={cell} setData={setTableData} />;
				},
				width: 70,
			},
			{
				Header: '쓰기 제한',
				accessor: 'write', //has to be changed
				Cell: function Component(cell) {
					return <TableCheckBox cell={cell} setData={setTableData} />;
				},
				width: 70,
			},
		],
		[selectionColumn],
	);

	const [tableData, setTableData] = useState([
		{
			id: 0,
			[DRAGGABLE_KEY]: '0',
			name: 'bin',
			read: false,
			write: null,
			type: 'directory',
		},
		{
			id: 1,
			[DRAGGABLE_KEY]: '1',
			name: 'config',
			read: false,
			write: false,
			type: 'file',
		},
		{
			id: 2,
			[DRAGGABLE_KEY]: '2',
			name: 'exe',
			read: false,
			write: false,
			type: 'extension',
		},
		{
			id: 3,
			[DRAGGABLE_KEY]: '3',
			name: 'exe',
			read: false,
			write: false,
			type: 'extension',
		},
		{
			id: 4,
			[DRAGGABLE_KEY]: '4',
			name: 'exe',
			read: false,
			write: false,
			type: 'extension',
		},
		{
			id: 5,
			[DRAGGABLE_KEY]: '5',
			name: 'exe',
			read: false,
			write: false,
			type: 'extension',
		},
		{
			id: 6,
			[DRAGGABLE_KEY]: '6',
			name: 'exe',
			read: false,
			write: false,
			type: 'extension',
		},
	]);

	/**************************************************
	 * seob - 테이블 데이터 추가 함수
	 ***************************************************/
	const handleAdd = useCallback(() => {
		console.log('add');
		// setTableData((prev) => [
		// 	...prev,
		// 	{id: ID, [DRAGGABLE_KEY]: `${ID}`, controlCommand: ''},
		// ]);
		// ID++;
	}, []);

	/**************************************************
	 * seob - 테이블 데이터 삭제 함수
	 ***************************************************/
	const handleRemove = useCallback(() => {
		console.log(select);
		console.log('remove');
	}, [select]);

	/**************************************************
	 * seob - 규칙 템플릿 id에 해당하는 데이터 detail findAll
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			console.log('api 작업');
			try {
				// await api
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [dispatch]);
	return (
		<div>
			<TemplateLayout
				title={contents.fileDirectory.title}
				description={contents.fileDirectory.description}
				render={() => (
					<TableContainer
						// title={contents.fileDirectory.title}
						onAdd={handleAdd}
						onRemove={handleRemove}
						render={
							<Table
								tableKey={'file-access'}
								data={tableData}
								columns={columns}
								setData={setTableData}
							/>
						}
					/>
				)}
			/>
		</div>
	);
};

export default FileAccess;
