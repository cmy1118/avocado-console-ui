/*******************************************************************
 * roberto - 자원 수집 관리 권한 템플릿
 ******************************************************************/

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
// import IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL from '../../../../../reducers/api/IAM/Policy/ActionManagement/templateDetail';
import IAM_ACTION_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/IAM/ActionManagement/actionTemplate';
import {
	actionTemplateFilter,
	getActionTemplatesFilter,
} from '../../../../../../utils/template';
import TemplateLayout from '../Outline/TemplateLayout';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import TableCheckBox from '../../../../../Table/ColumnCells/TableCheckBox';
import Table from '../../../../../Table/Table';

const constants = {
	main: '자원 수집 관리 권한 템플릿',
	title: '',
	templates: {},
	templatesId: 'KR-2020-0001:202202:0001',
	//체크박스 컬럼 정보
	column: [
		'항목',
		'전체권한',
		'추가(생성)',
		'수정',
		'삭제',
		'조회',
		'부여',
		'회수',
		'설명',
	],
	//체크박스 action event 정보
	action: ['create', 'delete', 'find', 'update', 'grant', 'revoke'],
};
/*******************************************************************
 * roberto - 자원 수집 관리 권한 템플릿
 ******************************************************************/
const ResourceCollectManagement = ({
	templateId,
	name,
	description,
	categoryType,
}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	const checkboxRefs = useRef([]);
	const [tableData, setTableData] = useState([]);
	const [lastCheckedKey, setLastCheckedKey] = useState(null);

	//테이블 컬럼 데이터
	const tableColumns = [
		{Header: '전체', accessor: 'all-check'},
		{Header: '생성', accessor: 'create'},
		{Header: '삭제', accessor: 'delete'},
		{Header: '조회', accessor: 'find'},
		{Header: '수정', accessor: 'update'},
		{Header: '부여', accessor: 'grant'},
		{Header: '회수', accessor: 'revoke'},
	];
	const columns = useMemo(() => {
		let columnsArr = [];
		tableColumns.map((v) => {
			let tempObj = {
				Header: '',
				accessor: '',
				Cell: function Component(cell) {
					return (
						<TableCheckBox
							cell={cell}
							setData={setTableData}
							refs={checkboxRefs}
							allCheckKey={'all-check'}
							lastCheckedKey={lastCheckedKey}
							setLastCheckedKey={setLastCheckedKey}
						/>
					);
				},
				width: 30,
			};
			tempObj.Header = v.Header;
			tempObj.accessor = v.accessor;
			columnsArr.push(tempObj);
		});
		return columnsArr;
	}, [lastCheckedKey, tableColumns]);

	useEffect(() => {
		const res = dispatch(
			IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findByIdAction({
				range: 'elements=0-50',
				templateId: templateId,
			}),
		)
			.unwrap()
			.then((res) => {
				const setData = actionTemplateFilter(res, constants.action);
				setTableData(setData);
				// dispatch(
				// 	IAM_ACTION_MANAGEMENT_TEMPLATE.action.getActionTemplates({
				// 		templateId: templateId,
				// 		name: res.data.name,
				// 		description: res.data.description,
				// 		data: setData,
				// 	}),
				// )
				// const filteredDataList = filterPropObj(
				// 	setData,
				// 	'resource',
				// 	'data',
				// );
				// const result = objArrUnion(
				// 	filteredDataList,
				// 	tempDataLists,
				// 	'data',
				// 	'resource',
				// 	'action',
				// );
				// setDataLists(result);
				// console.log(data);
			});
	}, [dispatch, templateId]);

	useEffect(() => {
		if (creatingPolicyMode) {
			dispatch(
				IAM_ACTION_MANAGEMENT_TEMPLATE.action.getActionTemplates({
					templateId: templateId,
					name: name,
					description: description,
					data: getActionTemplatesFilter(tableData, constants.action),
				}),
			);
		}
	}, [
		creatingPolicyMode,
		description,
		dispatch,
		name,
		tableData,
		templateId,
	]);
	console.log('tableData:', tableData);
	return (
		<div>
			<TemplateLayout
				title={name}
				description={description}
				render={() => {
					return (
						<div>
							<Table
								tableKey={'TemplateExample-key1'}
								data={tableData}
								columns={columns}
								setData={setTableData}
							/>
						</div>
					);
				}}
			/>
			<TemplateLayout
				title={'적용예정'}
				description={'적용예정'}
				render={() => {
					return <div>영애님 컴포넌트 생성시 적용예정..</div>;
				}}
			></TemplateLayout>
		</div>
	);
};
ResourceCollectManagement.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	categoryType: PropTypes.string,
};
export default ResourceCollectManagement;
