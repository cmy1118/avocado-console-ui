import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import DeviceAuth from './DeviceAuth';
import MFA from './MFA';
import FailOver from './FailOver';
import IdentityVerification from './IdentityVerification';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplateDetail';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplate';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import {ruleTypes} from '../../../../../../../utils/policy/rule';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuth = ({templateId, name, description}) => {
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
					name: name,
					description: description,
					details: [
						deviceAuthenticationData,
						mfaData,
						alternativeAuthNFailOverAuthData,
						identityVerificationData,
					],
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
		const getDefaultValue = async () => {
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
		getDefaultValue();
	}, [dispatch, templateId]);

	return (
		<div>
			<DeviceAuth
				data={
					defaultData && defaultData[ruleTypes.device_authentication]
				}
				setTemplateData={setDeviceAuthenticationData}
			/>
			<MFA
				data={defaultData && defaultData[ruleTypes.mfa]}
				setTemplateData={setMfaData}
			/>
			<FailOver
				data={
					defaultData &&
					defaultData[ruleTypes.alternative_authn_failover]
				}
				setTemplateData={setAlternativeAuthNFailOverAuthData}
			/>
			<IdentityVerification
				data={
					defaultData && defaultData[ruleTypes.identity_verification]
				}
				setTemplateData={setIdentityVerificationData}
			/>
		</div>
	);
};

UserAuth.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default UserAuth;
