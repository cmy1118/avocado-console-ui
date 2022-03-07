import React, {useEffect, useState} from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import IAM_RULE_TEMPLATE_DETAILE from '../../../../../reducers/api/IAM/Rule/templateDetail';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = ({templateId}) => {
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
			<UserIdPattern data={templateData && templateData.UserIdPattern} />
			<PaswordPattern
				data={templateData && templateData.PasswordPattern}
			/>
		</div>
	);
};

UserAccountPatternTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAccountPatternTemplate;
