import React, {useEffect} from 'react';
import TemplateElementContainer from '../../../TemplateElementContainer';
import TemplateElement from '../../../TemplateElement';
import {
	additionalAuthMethodOptions,
	authUsageOptions,
	policyOption,
	requiredOptions,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policyOptions';
import useRadio from '../../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../../hooks/useComboBox';
import useCheckBox from '../../../../../../../hooks/useCheckBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import PropTypes from 'prop-types';
import useTextBox from '../../../../../../../hooks/useTextBox';

const mfa = {
	title: 'MFA 인증',
	description: [
		'기본 인증 이후 추가 인증을 설정할 수 있으며, 최대 3차 까지 가능합니다.',
		'인증 수단은 중복 설정 할 수 없습니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		additionalAuth1: {
			title: '1차 추가 인증',
		},
		additionalAuth2: {
			title: '2차 추가 인증',
		},
		additionalAuth3: {
			title: '3차 추가 인증',
		},
		timeoutSeconds: {
			title: '입력 대기 시간(초)',
			message: '초',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증(MFA 인증) 폼
 **************************************************/
const MFA = ({data, setTemplateData}) => {
	//usage: mfa 인증 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'mfaUsage',
		options: usageOptions,
	});
	//authUsage1: 1차 추가인증 사용 여부
	const [authUsage1, authUsage1ComboBox, setAuthUsage1] = useComboBox({
		options: authUsageOptions,
		//mfa 인증 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});
	//required1: 1차 추가인증 필수 여부
	const [required1, required1ComboBox, setRequired1] = useComboBox({
		options: requiredOptions,
		//1차 추가인증 사용 여부 false일때 disabled
		disabled: authUsage1 === policyOption.authUsage.none.key,
	});
	//authMethod1: 1차 추가인증 수단
	const [authMethod1, authMethod1CheckBox, setAuthMethod1] = useCheckBox({
		options: additionalAuthMethodOptions,
		//1차 추가인증 사용 여부 false일때 disabled
		disabled: required1 === policyOption.required.none.key,
	});
	//authUsage2: 2차 추가인증 사용 여부
	const [authUsage2, authUsage2ComboBox, setAuthUsage2] = useComboBox({
		options: authUsageOptions,
		//mfa 인증 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});
	//required2: 2차 추가인증 필수 여부
	const [required2, required2ComboBox, setRequired2] = useComboBox({
		options: requiredOptions,
		//2차 추가인증 사용 여부 false일때 disabled
		disabled: authUsage2 === policyOption.authUsage.none.key,
	});
	//authMethod2: 2차 추가인증 수단
	const [authMethod2, authMethod2CheckBox, setAuthMethod2] = useCheckBox({
		options: additionalAuthMethodOptions,
		//2차 추가인증 사용 여부 false일때 disabled
		disabled: required2 === policyOption.required.none.key,
	});
	//authUsage3: 3차 추가인증 사용 여부
	const [authUsage3, authUsage3ComboBox, setAuthUsage3] = useComboBox({
		options: authUsageOptions,
		//mfa 인증 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});
	//required3: 3차 추가인증 필수 여부
	const [required3, required3ComboBox, setRequired3] = useComboBox({
		options: requiredOptions,
		//3차 추가인증 사용 여부 false일때 disabled
		disabled: authUsage3 === policyOption.authUsage.none.key,
	});
	//authMethod3: 3차 추가인증 수단
	const [authMethod3, authMethod3CheckBox, setAuthMethod3] = useCheckBox({
		options: additionalAuthMethodOptions,
		//3차 추가인증 사용 여부 false일때 disabled
		disabled: required3 === policyOption.required.none.key,
	});
	//timeoutSeconds: 입력 대기 시간
	const [
		timeoutSeconds,
		timeoutSecondsTextBox,
		setTimeoutSeconds,
	] = useTextBox({
		name: 'timeoutSeconds',
		//1 - 180
		regex: /^([1-9]|[1-9][0-9]|1[0-7][0-9]|180)$/,
		//mfa 사용 여부 false일때 disabled
		disabled: usage === policyOption.usage.none.key,
	});
	//추가인증 화면을 그리기 위한 컴포넌트 배열
	const additionalAuth = [
		{
			key: 'additionalAuth1',
			authUsage: authUsage1ComboBox,
			required: required1ComboBox,
			authMethod: authMethod1CheckBox,
		},
		{
			key: 'additionalAuth2',
			authUsage: authUsage2ComboBox,
			required: required2ComboBox,
			authMethod: authMethod2CheckBox,
		},
		{
			key: 'additionalAuth3',
			authUsage: authUsage3ComboBox,
			required: required3ComboBox,
			authMethod: authMethod3CheckBox,
		},
	];

	/**************************************************
	 * ambacc244 - MFA 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.ruleType) {
			let attributes = {usage: usage === policyOption.usage.use.key};
			//사용 여부 true
			if (usage === policyOption.usage.use.key) {
				//1차 추가 인증에 사용 여부 true
				if (authUsage1 === policyOption.authUsage.use.key)
					attributes[1] = {
						types: authMethod1,
						option: required1,
					};
				//2차 추가 인증에 사용 여부 true
				if (authUsage2 === policyOption.authUsage.use.key)
					attributes[2] = {
						types: authMethod2,
						option: required2,
					};
				//3차 추가 인증에 사용 여부 true
				if (authUsage3 === policyOption.authUsage.use.key)
					attributes[3] = {
						types: authMethod3,
						option: required3,
					};
				attributes.timeoutSeconds = timeoutSeconds;
			}

			setTemplateData({ruleType: data.ruleType, ...attributes});
		}
	}, [
		authMethod1,
		authMethod2,
		authMethod3,
		authUsage1,
		authUsage2,
		authUsage3,
		data,
		required1,
		required2,
		required3,
		setTemplateData,
		usage,
	]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//mfa 인증 여부 세팅
		setUsage(
			setUsageOptionByAttribute(
				data,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);
		// 추가인증 default value 있음
		if (data?.policies) {
			//1차 추가 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, '1')) {
				//1차 추가 인증 세팅
				setAuthUsage1(policyOption.authUsage.use.key);
				setRequired1(data.policies['1'].option);
				setAuthMethod1(data.policies['1'].types);
			}
			//2차 추가 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, '2')) {
				//2차 추가 인증 세팅
				setAuthUsage2(policyOption.authUsage.use.key);
				setRequired2(data.policies['2'].option);
				setAuthMethod2(data.policies['2'].types);
			}
			//3차 추가 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, '3')) {
				//3차 추가 인증 세팅
				setAuthUsage3(policyOption.authUsage.use.key);
				setRequired3(data.policies['3'].option);
				setAuthMethod3(data.policies['3'].types);
			}
			//mfa 인증 여부 false || 추가인증 default value 없음
		} else {
			setAuthUsage1(policyOption.authUsage.none.key);
			setRequired1(policyOption.required.none.key);
			setAuthUsage2(policyOption.authUsage.none.key);
			setRequired2(policyOption.required.none.key);
			setAuthUsage3(policyOption.authUsage.none.key);
			setRequired3(policyOption.required.none.key);
		}
		//입력 대기 시간 default value 있음
		if (data?.timoutSeconds) {
			//입력 대기 시간 세팅
			setTimeoutSeconds(data.timoutSeconds);
		}
	}, [
		data,
		setAuthMethod1,
		setAuthMethod2,
		setAuthMethod3,
		setAuthUsage1,
		setAuthUsage2,
		setAuthUsage3,
		setRequired1,
		setRequired2,
		setRequired3,
		setUsage,
	]);

	return (
		<TemplateElementContainer
			title={mfa.title}
			description={mfa.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={mfa.contents.usage.title}
							render={usageRadioButton}
						/>
						<div>
							--------------------------------------------------------------
						</div>
						{additionalAuth.map((v) => (
							<TemplateElement
								key={v.key}
								title={mfa.contents[v.key].title}
								render={() => {
									return (
										<RowDiv>
											{v.authUsage()}
											{v.required()}
											{v.authMethod()}
										</RowDiv>
									);
								}}
							/>
						))}
						<TemplateElement
							title={mfa.contents.timeoutSeconds.title}
							render={() => {
								return (
									<RowDiv>
										{timeoutSecondsTextBox()}
										{mfa.contents.timeoutSeconds.message}
									</RowDiv>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

MFA.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default MFA;
