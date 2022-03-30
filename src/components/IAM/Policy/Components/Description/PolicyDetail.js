import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {useDispatch} from 'react-redux';
import {
	SummaryTablesContainer,
	SummaryTableTitle,
} from '../../../../../styles/components/iam/descriptionPage';
import {useHistory, useLocation} from 'react-router-dom';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../Constants/Table/keys';
import Table from '../../../../Table/Table';
import {tableColumns} from '../../../../../Constants/Table/columns';
import {isFulfilled} from '../../../../../utils/redux';
import IAM_GRAN_REVOKE_ROLE from '../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/grantRevokeRole';

const policyDetail = {
	permission: '규칙/권한 : ',
	role: '이 정책과 연결된 역할 : ',
	tag: '이 정책과 연결된 태그 : ',
};

/**************************************************
 * ambacc244 - api 호출 받은 role정보를 현 페이지의 테이블에 알맞게 수정
 *
 * data (array) : api로 호출 받은 role 정보
 **************************************************/
const convertRoleTableData = (data) => {
	return (data || []).map((v) => ({
		...v,
		type: v.type.name,
		maxGrants: v.maxGrants || '제한 없음',
		grantUser: {
			name: v.createdTag.userName,
			id: v.createdTag.userId,
			userUid: v.createdTag.userUid,
		},
		[DRAGGABLE_KEY]: v.id,
	}));
};

/**************************************************
 * ambacc244 - IAM policy의 상세 정보를 보여주는 컴포넌트
 **************************************************/
const PolicyDetail = ({policyId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [permissionData, setPermissionData] = useState([]);
	const [roleData, setRoleData] = useState([]);
	const [tagData, setTagData] = useState([]);

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
			const res = await dispatch(
				IAM_GRAN_REVOKE_ROLE.asyncAction.findAllRoleByPolicyId({
					policyId: policyId,
				}),
			);

			if (isFulfilled(res)) {
				const roles = convertRoleTableData(res.payload);
				setRoleData(roles);
			}
		};
		getPolicyDetail();
	}, [policyId]);

	/**************************************************
	 * ambacc244 - IAM policy에 연결된 role
	 **************************************************/
	useEffect(() => {
		const getRolesByPolicy = async () => {
			const res = await dispatch(
				IAM_GRAN_REVOKE_ROLE.asyncAction.findAllRoleByPolicyId({
					policyId: policyId,
				}),
			);

			if (isFulfilled(res)) {
				const roles = convertRoleTableData(res.payload);
				setRoleData(roles);
			}
		};
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
				{policyDetail.permission}
				{permissionData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={permissionData}
				tableKey={tableKeys.policy.summary.permission}
				columns={tableColumns[tableKeys.policy.summary.permission]}
			/>

			<SummaryTableTitle onClick={onClickChangeTab('role')}>
				{policyDetail.role} {roleData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={roleData}
				tableKey={tableKeys.policy.summary.role}
				columns={tableColumns[tableKeys.policy.summary.role]}
				isPaginable
				isSearchable
			/>

			<SummaryTableTitle onClick={onClickChangeTab('tag')}>
				{policyDetail.tag}
				{tagData.length}
			</SummaryTableTitle>
			<Table
				readOnly
				data={tagData}
				tableKey={tableKeys.policy.summary.tag}
				columns={tableColumns[tableKeys.policy.summary.tag]}
			/>
		</SummaryTablesContainer>
	);
};

PolicyDetail.propTypes = {
	policyId: PropTypes.string.isRequired,
};

export default PolicyDetail;
