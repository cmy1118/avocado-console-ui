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

	const [templateData, setTemplateData] = useState([]);

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

				data.data.map((v) => {
					defaultData[v.ruleType] = v;
				});

				setTemplateData(defaultData);
			});
	}, []);
	return (
		<div>
			<DeviceAuth
				data={templateData && templateData.DeviceAuthentication}
			/>
			<MFA data={templateData && templateData.MFA} />
			<FailOver
				data={templateData && templateData.AlternativeAuthNFailOverAuth}
			/>
			<IdentityVerification
				data={templateData && templateData.IdentityVerification}
			/>
		</div>
	);
};

UserAuthTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAuthTemplate;
