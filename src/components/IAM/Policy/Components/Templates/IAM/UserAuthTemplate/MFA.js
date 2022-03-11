import React, {useEffect} from 'react';
import TemplateElementContainer from '../../../TemplateElementContainer';
import TemplateElement from '../../../TemplateElement';
import {
	additionalAuthMethodOptions,
	authUsageOptions,
	optionValue,
	requiredOptions,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/options';
import useRadio from '../../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../../hooks/useComboBox';
import useCheckBox from '../../../../../../../hooks/useCheckBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import PropTypes from 'prop-types';

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
		disabled: usage === optionValue.usage.none,
	});
	//required1: 1차 추가인증 필수 여부
	const [required1, required1ComboBox, setRequired1] = useComboBox({
		options: requiredOptions,
		//1차 추가인증 사용 여부 false일때 disabled
		disabled: authUsage1 === optionValue.authUsage.none,
	});
	//authMethod1: 1차 추가인증 수단
	const [authMethod1, authMethod1CheckBox, setAuthMethod1] = useCheckBox({
		options: additionalAuthMethodOptions,
		//1차 추가인증 사용 여부 false일때 disabled
		disabled: required1 === optionValue.required.none,
	});
	//authUsage2: 2차 추가인증 사용 여부
	const [authUsage2, authUsage2ComboBox, setAuthUsage2] = useComboBox({
		options: authUsageOptions,
		//mfa 인증 사용 여부 false일때 disabled
		disabled: usage === optionValue.usage.none,
	});
	//required2: 2차 추가인증 필수 여부
	const [required2, required2ComboBox, setRequired2] = useComboBox({
		options: requiredOptions,
		//2차 추가인증 사용 여부 false일때 disabled
		disabled: authUsage2 === optionValue.authUsage.none,
	});
	//authMethod2: 2차 추가인증 수단
	const [authMethod2, authMethod2CheckBox, setAuthMethod2] = useCheckBox({
		options: additionalAuthMethodOptions,
		//2차 추가인증 사용 여부 false일때 disabled
		disabled: required2 === optionValue.required.none,
	});
	//authUsage3: 3차 추가인증 사용 여부
	const [authUsage3, authUsage3ComboBox, setAuthUsage3] = useComboBox({
		options: authUsageOptions,
		//mfa 인증 사용 여부 false일때 disabled
		disabled: usage === optionValue.usage.none,
	});
	//required3: 3차 추가인증 필수 여부
	const [required3, required3ComboBox, setRequired3] = useComboBox({
		options: requiredOptions,
		//3차 추가인증 사용 여부 false일때 disabled
		disabled: authUsage3 === optionValue.authUsage.none,
	});
	//authMethod3: 3차 추가인증 수단
	const [authMethod3, authMethod3CheckBox, setAuthMethod3] = useCheckBox({
		options: additionalAuthMethodOptions,
		//3차 추가인증 사용 여부 false일때 disabled
		disabled: required3 === optionValue.required.none,
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
		setTemplateData({
			...data,
			usage: usage === optionValue.usage.use,
			1: {types: authMethod1, option: required1},
			2: {types: authMethod2, option: required2},
			3: {types: authMethod3, option: required3},
		});
	}, [
		authMethod1,
		authMethod2,
		authMethod3,
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
				optionValue.usage.use,
				optionValue.usage.none,
			),
		);
		//mfa 인증 여부 true && 추가인증 default value 있음
		if (data?.usage && data?.policies) {
			//1차 추가 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, '1')) {
				//1차 추가 인증 세팅
				setAuthUsage1(optionValue.authUsage.use);
				setRequired1(data.policies['1'].option);
				setAuthMethod1(data.policies['1'].types);
			}
			//2차 추가 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, '2')) {
				//2차 추가 인증 세팅
				setAuthUsage2(optionValue.authUsage.use);
				setRequired2(data.policies['2'].option);
				setAuthMethod2(data.policies['2'].types);
			}
			//3차 추가 인증 default value 있음
			if (Object.prototype.hasOwnProperty.call(data.policies, '3')) {
				//3차 추가 인증 세팅
				setAuthUsage3(optionValue.authUsage.use);
				setRequired3(data.policies['3'].option);
				setAuthMethod3(data.policies['3'].types);
			}
			//mfa 인증 여부 false || 추가인증 default value 없음
		} else {
			setAuthUsage1(optionValue.authUsage.none);
			setRequired1(optionValue.required.none);
			setAuthUsage2(optionValue.authUsage.none);
			setRequired2(optionValue.required.none);
			setAuthUsage3(optionValue.authUsage.none);
			setRequired3(optionValue.required.none);
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
