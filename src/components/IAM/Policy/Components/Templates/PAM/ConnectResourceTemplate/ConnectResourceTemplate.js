import React, {useEffect, useState} from 'react';
import PAM_RULE_TEMPLATE_DETAIL from '../../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplateDetail';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../../reducers/api/IAM/Policy/IAM/PolicyManagement/policies';
import PAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplate';
import Connect from './Connect';
import Resource from '../Resource/Resource';

/**************************************************
 * ambacc244 - 자원 접속 방식 템플릿 컴포넌트
 **************************************************/
const ConnectResourceTemplate = ({
	templateId = 'KR-2020-0001:202202:0001',
	name = '자원 접속 방식',
	description = '원격 자원에 접속하는 방식을 설정한다.',
}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);
	const [connectData, setConnectData] = useState({});
	const [resourceData, setResourceData] = useState({});

	/**************************************************
	 * ambacc244 - 정책 생성 액션 요청으로 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
		if (creatingPolicyMode) {
			dispatch(
				PAM_RULE_MANAGEMENT_TEMPLATE.action.gatherRulteTemplate({
					name: name,
					description: description,
					details: [connectData, resourceData],
				}),
			);
		}
	}, [creatingPolicyMode, description, dispatch, name, templateId]);

	/**************************************************
	 * ambacc244 - 자원 접속 방식 템플릿의 default 정보 불러오기
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
			<Connect
				data={defaultData && defaultData.connect}
				setTemplateData={setConnectData}
			/>
			<Resource
				data={defaultData && defaultData.resource}
				setTemplateData={setResourceData}
			/>
		</div>
	);
};

ConnectResourceTemplate.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default ConnectResourceTemplate;
