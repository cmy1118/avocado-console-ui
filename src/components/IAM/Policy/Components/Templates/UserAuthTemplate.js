import React, {useEffect, useState} from 'react';

import DeviceAuth from './UserAuthTemplate/DeviceAuth';
import MFA from './UserAuthTemplate/MFA';
import FailOver from './UserAuthTemplate/FailOver';
import IdentityVerification from './UserAuthTemplate/IdentityVerification';
import IAM_RULE_TEMPLATE_DETAILE from '../../../../../reducers/api/IAM/Rule/templateDetail';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = ({templateId}) => {
	const dispatch = useDispatch();
	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);

	/**************************************************
	 * ambacc244 - 사용자 인증 템플릿의 default 정보 불러오기
	 **************************************************/
	useEffect(() => {
		dispatch(
			IAM_RULE_TEMPLATE_DETAILE.asyncAction.findAllRuleTemplateDetailAction(
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
			<DeviceAuth
				data={defaultData && defaultData.DeviceAuthentication}
			/>
			<MFA data={defaultData && defaultData.MFA} />
			<FailOver
				data={defaultData && defaultData.AlternativeAuthNFailOverAuth}
			/>
			<IdentityVerification
				data={defaultData && defaultData.IdentityVerification}
			/>
		</div>
	);
};

UserAuthTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAuthTemplate;
