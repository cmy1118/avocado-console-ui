import React, {memo, useEffect, useState} from 'react';
import RowCheckbox from '../../../../../RecycleComponents/rowCheckbox';
import {useDispatch} from 'react-redux';
import {ColDiv} from '../../../../../../styles/components/style';
import {filterPropObj, objArrUnion} from '../../../../../../utils/dataFitering';
import PropTypes from 'prop-types';
import UserManagement from './UserManagement';
import IAM_ACTION_MANAGEMENT_TEMPLATE from "../../../../../../reducers/api/IAM/Policy/ActionManagement/template";
import {actionTemplateFilter} from "../../../../../../utils/template";

const constants = {
	main: '사용자 관리 권한',
	title: '',
	templates: {},
	templatesId: 'KR-2020-0001:202202:0001',
	//체크박스 컬럼 정보
	column: [
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
	action: ['created', 'updated', 'deleted', 'read', 'grant', 'revoked'],
};

const PolicyManagement = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const [dataLists, setDataLists] = useState([]);
	//정책관리권한 컬럼 에대한 action 정보
	const tempDataLists = [
		{action: 'create', data: false},
		{action: 'update', data: false},
		{action: 'delete', data: false},
		{action: 'find', data: false},
		{action: 'grant', data: false},
		{action: 'revoke', data: false},
	];

	//렌더링시 체크박스 정보 조회
	useEffect(() => {
		const res = dispatch(
			IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findByIdAction({
				range: 'elements=0-50',
				templateId: templateId,
			}),
		)
			.unwrap()
			.then((res) => {
				console.log('정책관리권한 findByIdAction:', res);
				const setData =actionTemplateFilter(res)
				dispatch(
					IAM_ACTION_MANAGEMENT_TEMPLATE.action.getActionTemplates({
						templateId: templateId,
						name: res.data.name,
						description: res.data.description,
						data: setData,
					}),
				)
				const filteredDataList = filterPropObj(
					setData,
					'resource',
					'data',
				);
				const result = objArrUnion(
					filteredDataList,
					tempDataLists,
					'data',
					'resource',
					'action',
				);
				setDataLists(result);
			});
	}, [dispatch]);

	return (
		<div>
			<ColDiv padding={'0px 0px 0px 25%'} width={'100%'}>
				{constants.column}
			</ColDiv>
			{dataLists.map((item, index) => (
				<RowCheckbox
					title={item.resource}
					dataLists={item.data}
					key={index}
				/>
			))}
		</div>
	);
};
PolicyManagement.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};
export default PolicyManagement;
