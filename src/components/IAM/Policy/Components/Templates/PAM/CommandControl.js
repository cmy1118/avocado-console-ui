import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import Table from '../../../../../Table/Table';
import TemplateLayout from '../Layout/TemplateLayout';
import useRadio from '../../../../../../hooks/useRadio';
import TemplateElement from '../Layout/TemplateElement';
import TableTextBox from '../../../../../Table/ColumnCells/TableTextBox';
import {DRAGGABLE_KEY} from '../../../../../../Constants/Table/keys';
import TableContainer from '../../../../../Table/TableContainer';
import Resource from './Resource/Resource';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import TableComboBox from '../../../../../Table/ColumnCells/TableComboBox';
import PAM_COMMAND_MANAGEMENT_TEMPLATE_DETAIL from '../../../../../../reducers/api/PAM/TemplateManagement/CommandTemplate/commandTemplateDetail';
import PropTypes from 'prop-types';

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

// 임시 테이블 셀 id
let ID = 4;

const CommandControl = ({templateId, name, description}) => {
	const dispatch = useDispatch();

	const [tableData, setTableData] = useState([
		{[DRAGGABLE_KEY]: '0', controlCommand: 'kill', securityLevel: 'normal'},
		{
			[DRAGGABLE_KEY]: '1',
			controlCommand: 'command1',
			securityLevel: 'level1',
		},
		{
			[DRAGGABLE_KEY]: '2',
			controlCommand: 'command2',
			securityLevel: 'normal',
		},
		{
			[DRAGGABLE_KEY]: '3',
			controlCommand: 'command3',
			securityLevel: 'normal',
		},
	]);

	const [controlTypeValue, controlTypeRadio, setControlTypeValue] = useRadio({
		name: 'commandControlTemplate-controlType-Radio',
		options: [
			{label: '금지(Black)', key: 'black'},
			{label: '허용(White)', key: 'white'},
		],
	});
	const [resourceData, setResourceData] = useState({});

	// 세션 타임아웃 테이블 컬럼
	const column = useMemo(
		() => [
			{
				Header: '제어 명령어',
				accessor: 'controlCommand', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
				width: 300,
			},
			{
				Header: '보안 등급',
				accessor: 'securityLevel', //has to be changed
				Cell: function Component(cell) {
					return (
						<TableComboBox
							cell={cell}
							options={[
								{label: '기본등급', key: 'normal'},
								{label: '1등급', key: 'level1'},
								{label: '2등급', key: 'level2'},
								{label: '3등급', key: 'level3'},
							]}
							setData={setTableData}
						/>
					);
				},
				width: 300,
			},
		],
		[],
	);

	const [select, columns] = useSelectColumn(column, tableData);

	/**************************************************
	 * seob - 테이블 데이터 추가 함수
	 ***************************************************/
	const handleAdd = useCallback(() => {
		console.log('add');
		setTableData((prev) => [
			...prev,
			{id: ID, [DRAGGABLE_KEY]: `${ID}`, controlCommand: ''},
		]);
		ID++;
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
			try {
				const res = await dispatch(
					PAM_COMMAND_MANAGEMENT_TEMPLATE_DETAIL.asyncAction.findAllAction(
						{templateId: templateId},
					),
				);
				console.log(res);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [dispatch, setControlTypeValue, templateId]);
	return (
		<div>
			<TemplateLayout
				title={contents.controlType.title}
				description={contents.controlType.description}
				render={() => (
					<TemplateElement
						title={'유형 선택'}
						render={controlTypeRadio}
					/>
				)}
			/>
			{controlTypeValue === 'white' && (
				<TemplateLayout
					title={contents.controlCommand.title}
					description={contents.controlCommand.description}
					render={() => (
						<TableContainer
							title={contents.controlCommand.title}
							onAdd={handleAdd}
							onRemove={handleRemove}
							render={
								<Table
									tableKey={'session'}
									data={tableData}
									columns={columns}
									setData={setTableData}
								/>
							}
						/>
					)}
				/>
			)}
			<Resource
				//TODO: default 데이터 있으면 넘겨주면 되는데 어떤 형식으로 올지 몰라서 command out
				// data={defaultData && defaultData.resource}
				setTemplateData={setResourceData}
			/>
		</div>
	);
};

CommandControl.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default CommandControl;
