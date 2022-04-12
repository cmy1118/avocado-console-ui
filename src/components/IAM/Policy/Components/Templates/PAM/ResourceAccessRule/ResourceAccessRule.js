import React, {useEffect, useState} from 'react';
import PAM_RULE_TEMPLATE_DETAIL from '../../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplateDetail';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Resource from '../Resource/Resource';
import PAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplate';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import AllowServiceTime from './AllowServiceTime';
import {ruleTypes} from '../../../../../../../utils/policy/rule';

/**************************************************
 * ambacc244 - 자원 접근 정책 템플릿 컴포넌트
 **************************************************/
const ResourceAccessRule = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);
	const [allowServiceTimeData, setAllowServiceTimeData] = useState([]);
	const [resourceData, setResourceData] = useState({});

	/**************************************************
	 * ambacc244 - 자원 접근 정책 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
		if (creatingPolicyMode) {
			dispatch(
				PAM_RULE_MANAGEMENT_TEMPLATE.action.gatherRulteTemplate({
					name: name,
					description: description,
					details: [
						allowServiceTimeData,
						//, resourceData
					],
				}),
			);
		}
	}, [creatingPolicyMode, description, dispatch, name, templateId]);

	/**************************************************
	 * ambacc244 - 자원 접근 정책 템플릿 default 정보 불러오기
	 **************************************************/
	useEffect(() => {
		const getDefaultValue = async () => {
			try {
				const res = await dispatch(
					PAM_RULE_TEMPLATE_DETAIL.asyncAction.findAllRuleTemplateDetail(
						{templateId: templateId},
					),
				);

				let defaultData = {};
				res.payload.data.map((v) => {
					defaultData[v.attribute.ruleType] = v;
				});
				setDefaultData(defaultData);
			} catch (err) {
				console.log(err);
			}
		};

		getDefaultValue();
	}, [dispatch, templateId]);

	return (
		<div>
			<AllowServiceTime
				data={
					defaultData && defaultData[ruleTypes.allowed_service_time]
				}
				setTemplateData={setAllowServiceTimeData}
			/>
			<Resource
				data={defaultData && defaultData.resource}
				setTemplateData={setResourceData}
			/>
		</div>
	);
};

ResourceAccessRule.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default ResourceAccessRule;
