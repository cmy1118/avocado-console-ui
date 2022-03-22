import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import Table from '../../../../../Table/Table';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import TemplateElement from '../../TemplateElement';
import TableTextBox from '../../../../../Table/ColumnCells/TableTextBox';
import {DRAGGABLE_KEY} from '../../../../../../Constants/Table/keys';
import TableContainer from '../../../../../Table/TableContainer';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	controlType: {
		title: '제어 유형',
		description: [
			'명령어를 제어할 유형을 설정 합니다.',
			'제어 유형에 따라 해당 명령어는 차단 또는 허용 정책이 적용됩니다.',
		],
	},
	controlCommand: {
		title: '제어 명령어',
		description: [
			'제어할 명령어를 정규식으로 기입합니다.',
			'최대 50개 까지 입력 가능합니다.',
		],
	},
};

const CommandControl = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [select, setSelect] = useState({});

	const [tableData, setTableData] = useState([
		{id: 0, [DRAGGABLE_KEY]: '0', controlCommand: 'kill'},
		{id: 1, [DRAGGABLE_KEY]: '1', controlCommand: 'command1'},
		{id: 2, [DRAGGABLE_KEY]: '2', controlCommand: 'command2'},
		{id: 3, [DRAGGABLE_KEY]: '3', controlCommand: 'command3'},
	]);

	const [controlTypeValue, controlTypeRadio, setControlTypeValue] = useRadio({
		name: 'commandControlTemplate-controlType-Radio',
		options: [
			{label: '금지(Black)', key: 'black'},
			{label: '허용(White)', key: 'white'},
		],
	});

	// 세션 타임아웃 테이블 컬럼
	const columns = useMemo(
		() => [
			{
				Header: '제어 명령어',
				accessor: 'controlCommand', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
				width: 300,
			},
		],
		[],
	);

	/**************************************************
	 * seob - 규칙 템플릿 id에 해당하는 데이터 findById
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			console.log('api 작업');
			// const res = await dispatch(
			// 	PAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findById({
			// 		// templateId,
			// 	}),
			// );
			// if (isFulfilled(res)) {
			// 	console.log(res.payload.data);
			// } else {
			// 	// 에러 핸들링
			// 	console.log(res.error);
			// }
		};
		fetchData();
	}, [dispatch]);
	return (
		<div>
			<TemplateElementContainer
				title={contents.controlType.title}
				description={contents.controlType.description}
				render={() => (
					<TemplateElement
						title={'유형 선택'}
						render={controlTypeRadio}
					/>
				)}
			/>
			<TemplateElementContainer
				title={contents.controlCommand.title}
				description={contents.controlCommand.description}
				render={() => (
					<TableContainer
						render={
							<Table
								tableKey={'session'}
								data={tableData}
								columns={columns}
								setData={setTableData}
								setSelect={setSelect}
							/>
						}
					/>
				)}
			/>
		</div>
	);
};

export default CommandControl;
