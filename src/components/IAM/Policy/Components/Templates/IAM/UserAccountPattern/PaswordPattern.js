import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import React, {useEffect} from 'react';
import useRadio from '../../../../../../../hooks/useRadio';
import {
	personalInfoRestrictionMethodOptions,
	policyOption,
	restrictionOptions,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policy/options';
import useTextBox from '../../../../../../../hooks/useTextBox';
import useCheckBox from '../../../../../../../hooks/useCheckBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import PropTypes from 'prop-types';

const passwordPattern = {
	title: '비밀번호 패턴',
	description: [
		'비밀번호 보안을 위한 생성 패턴 정책을 설정합니다.',
		'비밀번호 길이는 최소 10, 최대 30자로 길이 제한 합니다.',
		'숫자 연속 횟수는 0이면 사용 안함으로 간주하며, 최소3에서 최대6자로 제한 합니다.',
	],
	contents: {
		passwordLength: {
			title: '비밀번호 길이',
			message: {from: '최소', to: '최대'},
		},
		numberOfConsecutiveNumerics: {title: '숫자 연속 횟수'},
		mixNumberAndAlpha: {
			title: '영문 숫자 혼합 여부',
		},
		mixCase: {
			title: '대소문자 혼합 여부',
		},
		repeatedAlpha: {
			title: '반복문자 사용제한',
		},
		personalInfoRestriction: {
			title: '인적 사항 제한',
		},
		oldPasswordsRistriction: {
			title: '이전 비밀번호 재사용 제한',
			period: {message: '일'},
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 패턴(비밀번호 패턴) 폼
 **************************************************/
const PaswordPattern = ({data, setTemplateData}) => {
	//minPasswordLength: 최소 비밀번호 길이
	const [
		minPasswordLength,
		minPasswordLengthTextBox,
		setMinPasswordLength,
	] = useTextBox({
		name: 'minPasswordLength',
		//10-30
		regex: /^([1-2][0-9]|30)$/,
	});
	//maxPasswordLength: 최대 비밀번호 길이
	const [
		maxPasswordLength,
		maxPasswordLengthTextBox,
		setMaxPasswordLength,
	] = useTextBox({
		name: 'maxPasswordLength',
		//10-30
		regex: /^([1-2][0-9]|30)$/,
	});
	//numberOfConsecutiveNumerics: 연속 가능 숫자 횟수
	const [
		numberOfConsecutiveNumerics,
		numberOfConsecutiveNumericsTextBox,
		setNumberOfConsecutiveNumerics,
	] = useTextBox({
		name: 'numberOfConsecutiveNumerics',
		//0 || 3 - 6
		regex: /^(0|[3-6])$/,
	});
	//mixNumberAndAlpha: 영문, 숫자 혼합여부
	const [
		mixNumberAndAlpha,
		mixNumberAndAlphaRadioButton,
		setMixNumberAndAlpha,
	] = useRadio({
		name: 'mixNumberAndAlpha',
		options: usageOptions,
	});
	//mixCase: 대소문자 혼합여부
	const [mixCase, mixCaseRadioButton, setMixCase] = useRadio({
		name: 'mixCase',
		options: usageOptions,
	});
	//repeatedAlpha: 반복문자 사용제한 유무
	const [
		repeatedAlpha,
		repeatedAlphaRadioButton,
		setRepeatedAlpha,
	] = useRadio({
		name: 'repeatedAlpha',
		options: restrictionOptions,
	});
	//personalInfoRestriction: 인적 사항 제한 유무
	const [
		personalInfoRestriction,
		personalInfoRestrictionRadioButton,
		setPersonalInfoRestriction,
	] = useRadio({
		name: 'personalInfoRestriction',
		options: restrictionOptions,
	});
	//personalInfoRestrictionMethod : 인적 사항 제한 요소
	const [
		personalInfoRestrictionMethod,
		personalInfoRestrictionMethodCheckBox,
		setPersonalInfoRestrictionMethod,
	] = useCheckBox({options: personalInfoRestrictionMethodOptions});
	//oldPasswordsRistriction: 이전 비밀번호 재사용 제한 유무
	const [
		oldPasswordsRistriction,
		oldPasswordsRistrictionRadioButton,
		setOldPasswordsRistriction,
	] = useRadio({
		name: 'oldPasswordsRistriction',
		options: restrictionOptions,
	});
	//allowedDaysOfOldPasswords : 이전 비밀번호 재사용 제한 일
	const [
		allowedDaysOfOldPasswords,
		allowedDaysOfOldPasswordsTextBox,
		setAllowedDaysOfOldPasswords,
	] = useTextBox({
		name: 'allowedDaysOfOldPasswords',
		//0 - 90
		regex: /^([0-9]|[1-8][0-9]|90)$/,
		disabled: oldPasswordsRistriction === policyOption.restrict.none.value,
	});

	/**************************************************
	 * ambacc244 - 비밀번호 패턴 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			setTemplateData({
				resource: data?.resource,
				attribute: {
					ruleType: data?.attribute.ruleType,
					minLength: Number(minPasswordLength),
					maxLength: Number(maxPasswordLength),
					numberOfConsecutiveNumerics: numberOfConsecutiveNumerics,
					mixNumberAndAlpha:
						mixNumberAndAlpha === policyOption.usage.use.value,
					mixCase: mixCase === policyOption.usage.use.value,
					repeatedAlpha:
						repeatedAlpha === policyOption.restrict.restrict.value,
					includePersonalInfoList: personalInfoRestriction
						? personalInfoRestrictionMethod
						: [],
					allowedDaysOfOldPasswords:
						oldPasswordsRistriction ===
						policyOption.restrict.restrict.value
							? allowedDaysOfOldPasswords
							: 0,
				},
			});
		}
	}, [
		allowedDaysOfOldPasswords,
		data,
		maxPasswordLength,
		minPasswordLength,
		mixCase,
		mixNumberAndAlpha,
		numberOfConsecutiveNumerics,
		oldPasswordsRistriction,
		personalInfoRestriction,
		personalInfoRestrictionMethod,
		repeatedAlpha,
		setTemplateData,
	]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//최소 비밀번호 길이 default value 있음
		if (data?.attribute?.minLength)
			setMinPasswordLength(data?.attribute.minLength);
		//최대 비밀번호 길이 default value 있음
		if (data?.attribute?.maxLength)
			setMaxPasswordLength(data?.attribute.maxLength);
		//숫자 연속 횟수 default value 있음
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'numberOfConsecutiveNumerics',
			)
		) {
			setNumberOfConsecutiveNumerics(
				data.attribute.numberOfConsecutiveNumerics,
			);
		}
		//영문, 숫자 혼합여부 세팅
		setMixNumberAndAlpha(
			setUsageOptionByAttribute(
				data?.attribute,
				'mixNumberAndAlpha',
				policyOption.usage.use.value,
				policyOption.usage.none.value,
			),
		);
		//대소문자 혼합여부 세팅
		setMixCase(
			setUsageOptionByAttribute(
				data?.attribute,
				'mixCase',
				policyOption.usage.use.value,
				policyOption.usage.none.value,
			),
		);
		//반복문자 사용제한 유무 세팅
		setRepeatedAlpha(
			setUsageOptionByAttribute(
				data?.attribute,
				'repeatedAlpha',
				policyOption.restrict.restrict.value,
				policyOption.restrict.none.value,
			),
		);
		//인적 사항 제한 default value 있음
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'includePersonalInfoList',
			)
		) {
			setPersonalInfoRestrictionMethod(
				data?.attribute.includePersonalInfoList,
			);
			setPersonalInfoRestriction(
				data?.attribute.includePersonalInfoList.length !== 0
					? policyOption.restrict.restrict.value
					: policyOption.restrict.none.value,
			);
		}
		//이전 비밀번호 재사용 제한 default value 있음 && 제한 일수가 0 보다 큼
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'allowedDaysOfOldPasswords',
			) &&
			data?.attribute.allowedDaysOfOldPasswords !== 0
		) {
			setOldPasswordsRistriction(policyOption.restrict.restrict.value);
			setAllowedDaysOfOldPasswords(
				data?.attribute.allowedDaysOfOldPasswords,
			);
			//이전 비밀번호 사용 제한 default value 없음 || 제한 일수가 0
		} else {
			setOldPasswordsRistriction(policyOption.restrict.none.value);
		}
	}, [
		data,
		setAllowedDaysOfOldPasswords,
		setMaxPasswordLength,
		setMinPasswordLength,
		setMixCase,
		setMixNumberAndAlpha,
		setNumberOfConsecutiveNumerics,
		setOldPasswordsRistriction,
		setPersonalInfoRestriction,
		setPersonalInfoRestrictionMethod,
		setRepeatedAlpha,
	]);

	return (
		<TemplateLayout
			title={passwordPattern.title}
			description={passwordPattern.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={
								passwordPattern.contents.passwordLength.title
							}
							render={() => {
								return (
									<RowDiv>
										{
											passwordPattern.contents
												.passwordLength.message.from
										}
										{minPasswordLengthTextBox()}
										{
											passwordPattern.contents
												.passwordLength.message.to
										}
										{maxPasswordLengthTextBox()}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={
								passwordPattern.contents
									.numberOfConsecutiveNumerics.title
							}
							render={numberOfConsecutiveNumericsTextBox}
						/>
						<TemplateElement
							title={
								passwordPattern.contents.mixNumberAndAlpha.title
							}
							render={mixNumberAndAlphaRadioButton}
						/>
						<TemplateElement
							title={passwordPattern.contents.mixCase.title}
							render={mixCaseRadioButton}
						/>
						<TemplateElement
							title={passwordPattern.contents.repeatedAlpha.title}
							render={repeatedAlphaRadioButton}
						/>
						<TemplateElement
							title={
								passwordPattern.contents.personalInfoRestriction
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{personalInfoRestrictionRadioButton()}
										{personalInfoRestrictionMethodCheckBox()}
									</RowDiv>
								);
							}}
						/>

						<TemplateElement
							title={
								passwordPattern.contents.oldPasswordsRistriction
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{oldPasswordsRistrictionRadioButton()}
										{allowedDaysOfOldPasswordsTextBox()}
										{
											passwordPattern.contents
												.oldPasswordsRistriction.period
												.message
										}
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

PaswordPattern.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};
export default PaswordPattern;
