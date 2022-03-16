import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import DeviceAuth from './UserAuthTemplate/DeviceAuth';
import MFA from './UserAuthTemplate/MFA';
import FailOver from './UserAuthTemplate/FailOver';
import IdentityVerification from './UserAuthTemplate/IdentityVerification';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/RuleManagement/templateDetail';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/RuleManagement/template';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {policyTypes} from '../../../../../../utils/data';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);
	const [deviceAuthenticationData, setDeviceAuthenticationData] = useState(
		{},
	);
	const [mfaData, setMfaData] = useState({});
	const [
		alternativeAuthNFailOverAuthData,
		setAlternativeAuthNFailOverAuthData,
	] = useState({});
	const [identityVerificationData, setIdentityVerificationData] = useState(
		{},
	);

	/**************************************************
	 * ambacc244 - 정책 생성 액션 요청으로 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
		if (creatingPolicyMode) {
			dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.action.gatherRulteTemplate({
					id: templateId,
					data: {
						name: name,
						resource: policyTypes.iam,
						description: description,
						attributes: [
							deviceAuthenticationData,
							mfaData,
							alternativeAuthNFailOverAuthData,
							identityVerificationData,
						],
					},
				}),
			);
		}
	}, [
		alternativeAuthNFailOverAuthData,
		creatingPolicyMode,
		description,
		deviceAuthenticationData,
		dispatch,
		identityVerificationData,
		mfaData,
		name,
		templateId,
	]);

	/**************************************************
	 * ambacc244 - 사용자 인증 템플릿의 default 정보 불러오기
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
					defaultData[v.attribute.ruleType] = v.attribute;
				});
				setDefaultData(defaultData);
			});
	}, [dispatch, templateId]);

	return (
		<div>
			<DeviceAuth
				data={defaultData && defaultData.device_authentication}
				setTemplateData={setDeviceAuthenticationData}
			/>
			<MFA
				data={defaultData && defaultData.mfa}
				setTemplateData={setMfaData}
			/>
			<FailOver
				data={defaultData && defaultData.alternative_authn_failover}
				setTemplateData={setAlternativeAuthNFailOverAuthData}
			/>
			<IdentityVerification
				data={defaultData && defaultData.identity_verification}
				setTemplateData={setIdentityVerificationData}
			/>
		</div>
	);
};

UserAuthTemplate.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default UserAuthTemplate;
