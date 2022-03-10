import React, {useEffect, useState} from 'react';
import UserIdPattern from './UserAccountPatternTemplate/UserIdPattern';
import PaswordPattern from './UserAccountPatternTemplate/PaswordPattern';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import IAM_RULE_TEMPLATE_DETAILE from '../../../../../reducers/api/IAM/Rule/templateDetail';
import IAM_RULE_TEMPLATE from '../../../../../reducers/api/IAM/Rule/template';
import IAM_POLICY from '../../../../../reducers/api/IAM/Policy/policy';

/**************************************************
 * ambacc244 - 사용자 계정 패턴 컴포넌트
 **************************************************/
const UserAccountPatternTemplate = ({templateId}) => {
	const dispatch = useDispatch();
	const {creatingPolicy} = useSelector(IAM_POLICY.selector);
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
					id: templateId,
					data: [userIdPatternData, PaswordPatternData],
				}),
			);
		}
	}, [creatingPolicy, dispatch, templateId]);

	/**************************************************
	 * ambacc244 - 사용자 계정 패턴 템플릿의 default 정보 불러오기
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
	templateId: PropTypes.string,
};

export default UserAccountPatternTemplate;
