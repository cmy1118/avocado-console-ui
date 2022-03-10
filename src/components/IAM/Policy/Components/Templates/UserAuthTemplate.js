import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import DeviceAuth from './UserAuthTemplate/DeviceAuth';
import MFA from './UserAuthTemplate/MFA';
import FailOver from './UserAuthTemplate/FailOver';
import IdentityVerification from './UserAuthTemplate/IdentityVerification';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../reducers/api/IAM/Rule/templateDetail';
import IAM_RULE_TEMPLATE from '../../../../../reducers/api/IAM/Rule/template';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {policyTypes} from '../../../../../utils/data';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = ({templateId}) => {
	const dispatch = useDispatch();
	const {creatingPolicy} = useSelector(
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
		if (creatingPolicy) {
			dispatch(
				IAM_RULE_TEMPLATE.action.gatherTemplate({
					id: templateId.id,
					data: {
						name: templateId.name,
						resource: policyTypes.iam,
						description: templateId.description,
						attributes: [
							JSON.stringify(deviceAuthenticationData),
							JSON.stringify(mfaData),
							JSON.stringify(alternativeAuthNFailOverAuthData),
							JSON.stringify(identityVerificationData),
						],
					},
				}),
			);
		}
	}, [
		alternativeAuthNFailOverAuthData,
		creatingPolicy,
		deviceAuthenticationData,
		dispatch,
		identityVerificationData,
		mfaData,
		templateId,
	]);

	/**************************************************
	 * ambacc244 - 사용자 인증 템플릿의 default 정보 불러오기
	 **************************************************/
	useEffect(() => {
		dispatch(
			IAM_RULE_TEMPLATE_DETAIL.asyncAction.findAllRuleTemplateDetailAction(
				{
					id: templateId.id,
				},
			),
		)
			.unwrap()
			.then((data) => {
				console.log(data);
				let defaultData = {};
				data.map((v) => {
					defaultData[v.ruleType] = v.attribute;
				});
				setDefaultData(defaultData);
			});
	}, [dispatch, templateId]);

	return (
		<div>
			<DeviceAuth
				data={defaultData && defaultData.DeviceAuthentication}
				setTemplateData={setDeviceAuthenticationData}
			/>
			<MFA
				data={defaultData && defaultData.MFA}
				setTemplateData={setMfaData}
			/>
			<FailOver
				data={defaultData && defaultData.AlternativeAuthNFailOverAuth}
				setTemplateData={setAlternativeAuthNFailOverAuthData}
			/>
			<IdentityVerification
				data={defaultData && defaultData.IdentityVerification}
				setTemplateData={setIdentityVerificationData}
			/>
		</div>
	);
};

UserAuthTemplate.propTypes = {
	templateId: PropTypes.object,
};

export default UserAuthTemplate;
