import React, {useEffect, useState} from 'react';
import LoginFailure from './UserAccountProcessTemplate/LoginFailure';
import Dormant from './UserAccountProcessTemplate/Dormant';
import AccountActivePeriod from './UserAccountProcessTemplate/AccountActivePeriod';
import ModifyingGroup from './UserAccountProcessTemplate/ModifyingGroup';
import Resignation from './UserAccountProcessTemplate/Resignation';
import IAM_RULE_TEMPLATE_DETAILE from '../../../../../reducers/api/IAM/Rule/templateDetail';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import IAM_RULE_TEMPLATE from '../../../../../reducers/api/IAM/Rule/template';
import IAM_POLICY from '../../../../../reducers/api/IAM/Policy/policy';

/**************************************************
 * ambacc244 - 사용자 계정 처리 컴포넌트
 **************************************************/
const UserAccountProcessTemplate = ({templateId}) => {
	const dispatch = useDispatch();
	const {creatingPolicy} = useSelector(IAM_POLICY.selector);

	//defaultData: 템플릿의 default value
	const [defaultData, setDefaultData] = useState([]);
	const [LoginFailureData, setLoginFailureData] = useState({});
	const [DormantData, setDormantData] = useState({});
	const [AccountActivePeriodData, setAccountActivePeriodData] = useState({});
	const [ModifyingGroupData, setModifyingGroupData] = useState({});
	const [ResignationData, setResignationData] = useState({});

	/**************************************************
	 * ambacc244 - 정책 생성 액션 요청으로 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
		if (creatingPolicy) {
			dispatch(
				IAM_RULE_TEMPLATE.action.gatherTemplate({
					id: templateId,
					data: [
						LoginFailureData,
						DormantData,
						AccountActivePeriodData,
						ModifyingGroupData,
						ResignationData,
					],
				}),
			);
		}
	}, [
		AccountActivePeriodData,
		DormantData,
		LoginFailureData,
		ModifyingGroupData,
		ResignationData,
		creatingPolicy,
		dispatch,
		templateId,
	]);

	/**************************************************
	 * ambacc244 - 사용자 계정 처리 템플릿의 default 정보 불러오기
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
			<LoginFailure
				data={defaultData && defaultData.SignInFailBlocking}
				setTemplateData={setLoginFailureData}
			/>
			<Dormant
				data={defaultData && defaultData.DormantBlocking}
				setTemplateData={setDormantData}
			/>
			<AccountActivePeriod
				data={defaultData && defaultData.AccountExpired}
				setTemplateData={setAccountActivePeriodData}
			/>

			<ModifyingGroup
				data={defaultData && defaultData.GroupModifying}
				setTemplateData={setModifyingGroupData}
			/>
			<Resignation
				data={defaultData && defaultData.Resigned}
				setTemplateData={setResignationData}
			/>
		</div>
	);
};

UserAccountProcessTemplate.propTypes = {
	templateId: PropTypes.string,
};

export default UserAccountProcessTemplate;
