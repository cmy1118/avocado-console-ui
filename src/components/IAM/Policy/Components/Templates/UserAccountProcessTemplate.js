import React, {useEffect, useState} from 'react';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';
import Dormant from './UserAccountProcessTemplate/Dormant';
import AccountActivePeriod from './UserAccountProcessTemplate/AccountActivePeriod';
import PasswordValidityPeriod from './UserAccountProcessTemplate/PasswordValidityPeriod';
import ModifyingGroup from './UserAccountProcessTemplate/ModifyingGroup';
import Resignation from './UserAccountProcessTemplate/Resignation';
import IAM_RULE_TEMPLATE_DETAILE from '../../../../../reducers/api/IAM/Rule/templateDetail';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

/**************************************************
 * ambacc244 - 사용자 계정 처리 컴포넌트
 **************************************************/
const UserAccountProcessTemplate = ({templateId}) => {
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
			<LoginFailure
				data={templateData && templateData.SignInFailBlocking}
			/>
			<Dormant data={templateData && templateData.DormantBlocking} />
			<AccountActivePeriod
				data={templateData && templateData.AccountExpired}
			/>
			{/*<PasswordValidityPeriod />*/}
			<ModifyingGroup
				data={templateData && templateData.GroupModifying}
			/>
			<Resignation data={templateData && templateData.Resigned} />
		</div>
	);
};

UserAccountProcessTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAccountProcessTemplate;
