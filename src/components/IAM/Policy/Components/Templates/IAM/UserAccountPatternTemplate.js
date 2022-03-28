import React, {useEffect, useState} from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplate';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/IAM/RuleManagement/ruleTemplateDetail';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import {policyTypes} from '../../../../../../utils/data';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
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
		if (creatingPolicyMode) {
			dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.action.gatherRulteTemplate({
					name: name,
					description: description,
					details: [userIdPatternData, PaswordPatternData],
				}),
			);
		}
	}, [
		PaswordPatternData,
		creatingPolicyMode,
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
		const fetchData = async () => {
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
		fetchData();
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
