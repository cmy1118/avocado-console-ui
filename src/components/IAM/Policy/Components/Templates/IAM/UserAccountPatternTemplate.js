import React, {useEffect, useState} from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/RuleManagement/template';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/RuleManagement/templateDetail';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {policyTypes} from '../../../../../../utils/data';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicy} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);
	const [userIdPatternData, setUserIdPatternData] = useState({});
	const [PaswordPatternData, setPaswordPatternData] = useState({});

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
						attributes: [userIdPatternData, PaswordPatternData],
					},
				}),
			);
		}
	}, [
		PaswordPatternData,
		creatingPolicy,
		description,
		dispatch,
		name,
		templateId,
		userIdPatternData,
	]);

	/**************************************************
	 * ambacc244 - 사용자 계정 패턴 템플릿의 default 정보 불러오기
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
			<UserIdPattern
				data={defaultData && defaultData.user_id_pattern}
				setTemplateData={setUserIdPatternData}
			/>
			<PaswordPattern
				data={defaultData && defaultData.password_pattern}
				setTemplateData={setPaswordPatternData}
			/>
		</div>
	);
};

UserAccountPatternTemplate.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default UserAccountPatternTemplate;
