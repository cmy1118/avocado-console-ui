import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import TemplateLayout from '../Layout/TemplateLayout';
import useRadio from '../../../../../../hooks/useRadio';
import useCheckBox from '../../../../../../hooks/useCheckBox';
import TemplateElement from '../Layout/TemplateElement';
import useTextBox from '../../../../../../hooks/useTextBox';
import Resource from './Resource/Resource';
import PropTypes from 'prop-types';
import PAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplateDetail';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	mfa: {
		title: 'MFA',
		description: [
			`원격 자원 접속시 추가로 받을 인증을 설정합니다.`,
			`인증수단을 한가지만 설정하면 인증수단은 한가지로 고정되고 n개 선택 시엔 사용자가 수단을 선택하여 인증 받을수 있습니다.`,
			`입력 대기 시간은 인증번호 인증수단에만 적용 됩니다.`,
		],
		attributes: {
			usage: '사용 여부',
			authMethod: '인증 수단',
			timeoutSeconds: '입력 대기 시간(초)',
		},
	},
};

const MFA = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	const [usageValue, usageRadio, setUsage] = useRadio({
		name: 'usage',
		options: [
			{
				label: '사용 함',
				value: 'use',
			},
			{
				label: '사용 안함',
				value: 'none',
			},
		],
	});

	const [authValue, authCheckBox, setAuthValue] = useCheckBox({
		options: [
			{
				label: '인증번호(Mail)',
				value: 'mail',
			},
			{
				label: '인증번호(SMS)',
				value: 'sms',
			},
			{
				label: '인증번호(Kakao)',
				value: 'kakao',
			},
			{
				label: '지문인증',
				value: 'fingerprint',
			},
		],
	});

	const [
		timeoutSecondsValue,
		timeoutSecondsTextBox,
		setTimeoutSeconds,
	] = useTextBox({
		regex: /^[0-9]+$/,
	});
	const [resourceData, setResourceData] = useState({});

	/**************************************************
	 * seob - 규칙 템플릿 id에 해당하는 데이터 detail findAll
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(
					PAM_RULE_TEMPLATE_DETAIL.asyncAction.findAllRuleTemplateDetail(
						{
							templateId: templateId,
						},
					),
				);

				console.log(res);
				setUsage(res.attribute.usage ? 'use' : 'none');
				setTimeoutSeconds(res.attribute.timeoutSeconds);
				setData(res);
				// await api
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [dispatch, setTimeoutSeconds, setUsage, templateId]);
	return (
		<div>
			<TemplateLayout
				title={contents.mfa.title}
				description={contents.mfa.description}
				render={() => (
					<div>
						<TemplateElement
							title={contents.mfa.attributes.usage}
							render={usageRadio}
						/>
						<TemplateElement
							title={contents.mfa.attributes.authMethod}
							render={authCheckBox}
						/>
						<TemplateElement
							title={contents.mfa.attributes.timeoutSeconds}
							render={timeoutSecondsTextBox}
						/>
					</div>
				)}
			/>
			<Resource
				//TODO: default 데이터 있으면 넘겨주면 되는데 어떤 형식으로 올지 몰라서 command out
				// data={defaultData && defaultData.resource}
				setTemplateData={setResourceData}
			/>
		</div>
	);
};

MFA.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default MFA;
