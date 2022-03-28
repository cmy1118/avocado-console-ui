import React, {useEffect, useState} from 'react';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';
import Dormant from './UserAccountProcessTemplate/Dormant';
import AccountActivePeriod from './UserAccountProcessTemplate/AccountActivePeriod';
import ModifyingGroup from './UserAccountProcessTemplate/ModifyingGroup';
import Resignation from './UserAccountProcessTemplate/Resignation';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplate';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import {policyTypes} from '../../../../../../utils/data';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplateDetail';

/**************************************************
 * ambacc244 - 사용자 계정 처리 컴포넌트
 **************************************************/
const UserAccountProcessTemplate = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);
	const [LoginFailureData, setLoginFailureData] = useState({});
	const [DormantData, setDormantData] = useState({});
	const [AccountActivePeriodData, setAccountActivePeriodData] = useState({});
	const [ModifyingGroupData, setModifyingGroupData] = useState({});
	const [ResignationData, setResignationData] = useState({});

	/**************************************************
	 * ambacc244 - 정책 생성 액션 요청으로 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
		if (creatingPolicyMode) {
			dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.action.gatherRulteTemplate({
					name: name,
					description: description,
					details: [
						LoginFailureData,
						DormantData,
						AccountActivePeriodData,
						ModifyingGroupData,
						ResignationData,
					],
				}),
			);
		}
	}, [
		AccountActivePeriodData,
		DormantData,
		LoginFailureData,
		ModifyingGroupData,
		ResignationData,
		creatingPolicyMode,
		description,
		dispatch,
		name,
		templateId,
	]);

	/**************************************************
	 * ambacc244 - 사용자 계정 처리 템플릿의 default 정보 불러오기
	 **************************************************/
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(
					IAM_RULE_TEMPLATE_DETAIL.asyncAction.findAll({
						id: templateId,
					}),
				);

				let defaultData = {};

				res.payload.data.map((v) => {
					defaultData[v.attribute.ruleType] = v;
				});

				setDefaultData(defaultData);
			} catch (err) {
				console.log('error => ', err);
			}
		};
		fetchData();
	}, [dispatch, templateId]);

	return (
		<div>
			<LoginFailure
				data={defaultData && defaultData.sign_in_fail_blocking}
				setTemplateData={setLoginFailureData}
			/>
			<Dormant
				data={defaultData && defaultData.dormant_blocking}
				setTemplateData={setDormantData}
			/>
			<AccountActivePeriod
				data={defaultData && defaultData.account_expired}
				setTemplateData={setAccountActivePeriodData}
			/>

			<ModifyingGroup
				data={defaultData && defaultData.group_modifying}
				setTemplateData={setModifyingGroupData}
			/>
			<Resignation
				data={defaultData && defaultData.resigned}
				setTemplateData={setResignationData}
			/>
		</div>
	);
};

UserAccountProcessTemplate.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default UserAccountProcessTemplate;
