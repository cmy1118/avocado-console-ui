import React, {useEffect, useState} from 'react';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';
import Dormant from './UserAccountProcessTemplate/Dormant';
import AccountActivePeriod from './UserAccountProcessTemplate/AccountActivePeriod';
import ModifyingGroup from './UserAccountProcessTemplate/ModifyingGroup';
import Resignation from './UserAccountProcessTemplate/Resignation';

import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/RuleManagement/templateDetail';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/RuleManagement/template';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {policyTypes} from '../../../../../../utils/data';

/**************************************************
 * ambacc244 - 사용자 계정 처리 컴포넌트
 **************************************************/
const UserAccountProcessTemplate = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicy} = useSelector(
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
		if (creatingPolicy) {
			dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.action.gatherTemplate({
					id: templateId,
					data: {
						name: name,
						resource: policyTypes.iam,
						description: description,
						attributes: [
							JSON.stringify(LoginFailureData),
							JSON.stringify(DormantData),
							JSON.stringify(AccountActivePeriodData),
							JSON.stringify(ModifyingGroupData),
							JSON.stringify(ResignationData),
						],
					},
				}),
			);
		}
	}, [
		AccountActivePeriodData,
		DormantData,
		LoginFailureData,
		ModifyingGroupData,
		ResignationData,
		creatingPolicy,
		description,
		dispatch,
		name,
		templateId,
	]);

	/**************************************************
	 * ambacc244 - 사용자 계정 처리 템플릿의 default 정보 불러오기
	 **************************************************/
	useEffect(() => {
		dispatch(
			IAM_RULE_TEMPLATE_DETAIL.asyncAction.findAllRuleTemplateDetailAction(
				{
					id: templateId,
				},
			),
		)
			.unwrap()
			.then((data) => {
				let defaultData = {};

				data.map((v) => {
					defaultData[v.ruleType] = v.attribute;
				});

				setDefaultData(defaultData);
			});
	}, [dispatch, templateId]);

	return (
		<div>
			<LoginFailure
				data={defaultData && defaultData.SignInFailBlocking}
				setTemplateData={setLoginFailureData}
			/>
			<Dormant
				data={defaultData && defaultData.DormantBlocking}
				setTemplateData={setDormantData}
			/>
			<AccountActivePeriod
				data={defaultData && defaultData.AccountExpired}
				setTemplateData={setAccountActivePeriodData}
			/>

			<ModifyingGroup
				data={defaultData && defaultData.GroupModifying}
				setTemplateData={setModifyingGroupData}
			/>
			<Resignation
				data={defaultData && defaultData.Resigned}
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
