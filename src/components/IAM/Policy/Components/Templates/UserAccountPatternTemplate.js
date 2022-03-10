import React, {useEffect, useState} from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import IAM_RULE_TEMPLATE from '../../../../../reducers/api/IAM/Rule/template';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../reducers/api/IAM/Rule/templateDetail';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {policyTypes} from '../../../../../utils/data';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = ({templateId}) => {
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
				IAM_RULE_TEMPLATE.action.gatherTemplate({
					id: templateId.id,
					data: {
						name: templateId.name,
						resource: policyTypes.iam,
						description: templateId.description,
						attributes: [
							JSON.stringify(userIdPatternData),
							JSON.stringify(PaswordPatternData),
						],
					},
				}),
			);
		}
	}, [creatingPolicy, dispatch, templateId]);

	/**************************************************
	 * ambacc244 - 사용자 계정 패턴 템플릿의 default 정보 불러오기
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
				let defaultData = {};

				data.map((v) => {
					defaultData[v.ruleType] = v.attribute;
				});

				setDefaultData(defaultData);
			});
	}, [dispatch, templateId]);

	return (
		<div>
			<UserIdPattern
				data={defaultData && defaultData.UserIdPattern}
				setTemplateData={setUserIdPatternData}
			/>
			<PaswordPattern
				data={defaultData && defaultData.PasswordPattern}
				setTemplateData={setPaswordPatternData}
			/>
		</div>
	);
};

UserAccountPatternTemplate.propTypes = {
	templateId: PropTypes.object,
};

export default UserAccountPatternTemplate;
