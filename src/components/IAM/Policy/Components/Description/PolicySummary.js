import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../../styles/components/iam/descriptionPage';
import {useHistory, useLocation} from 'react-router-dom';

const policySummary = {
	permission: '규칙/권한 : ',
	role: '이 정책과 연결된 역할 : ',
	tag: '이 정책과 연결된 태그 : ',
};

/**************************************************
 * ambacc244 - IAM policy의 상세 정보를 보여주는 컴포넌트
 **************************************************/
const PolicySummary = ({policyId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [permission, setPermission] = useState([]);
	const [policy, setPolicy] = useState([]);
	const [tag, setTag] = useState([]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: location.pathname,
				search: `tabs=${v}`,
			});
		},
		[location],
	);

	/**************************************************
	 * ambacc244 - IAM policy에 부여된 규칙/정책을 조회
	 **************************************************/
	useEffect(() => {
		const getPolicyDetail = async () => {
			// const res = await dispatch(
			// 	IAM_GRANTED_POLICY.asyncAction.getDetailsByRole({
			// 		roleId: policyId,
			// 	}),
			// );
			//
			// if (isFulfilled(res)) {
			// 	console.log(res.payload);
			// }
		};
		getPolicyDetail();
	}, [policyId]);

	/**************************************************
	 * ambacc244 - IAM policy에 연결된 role
	 **************************************************/
	useEffect(() => {
		const getRolesByPolicy = async () => {};
		getRolesByPolicy();
	}, [policyId]);

	/**************************************************
	 * ambacc244 - IAM policy에 연결된 태그
	 **************************************************/
	useEffect(() => {
		const getTagsByPolicy = async () => {};
		getTagsByPolicy();
	}, [policyId]);

	return (
		<SummaryTablesContainer>
			<SummaryTableTitle onClick={onClickChangeTab('permission')}>
				{policySummary.permission}
			</SummaryTableTitle>
			{/*<Table*/}
			{/*	readOnly*/}
			{/*	data={permission}*/}
			{/*	tableKey={tableKeys.policy.summary.permission}*/}
			{/*	columns={tableColumns[tableKeys.policy.summary.permission]}*/}
			{/*/>*/}

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				{policySummary.role}
			</SummaryTableTitle>
			{/*<Table*/}
			{/*	readOnly*/}
			{/*	data={permission}*/}
			{/*	tableKey={tableKeys.policy.summary.role}*/}
			{/*	columns={tableColumns[tableKeys.policy.summary.role]}*/}
			{/*/>*/}

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				{policySummary.tag}
			</SummaryTableTitle>
			{/*<Table*/}
			{/*	readOnly*/}
			{/*	data={permission}*/}
			{/*	tableKey={tableKeys.policy.summary.tag}*/}
			{/*	columns={tableColumns[tableKeys.policy.summary.tag]}*/}
			{/*/>*/}
		</SummaryTablesContainer>
	);
};

PolicySummary.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicySummary;
