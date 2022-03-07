import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import React, {useEffect} from 'react';
import useRadio from '../../../../../../hooks/useRadio';
import {
	personalInformationRestrictionMethodOptions,
	restrictionOptions,
	usageOptions,
} from '../../../../../../utils/options';
import useTextBox from '../../../../../../hooks/useTextBox';
import useCheckBox from '../../../../../../hooks/useCheckBox';
import {RowDiv} from '../../../../../../styles/components/style';
import PropTypes from 'prop-types';
import UserIdPattern from './UserIdPattern';

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
		consecutiveNumbers: {title: '숫자 연속 횟수'},
		mixedLetterAndNumber: {
			title: '영문 숫자 혼합 여부',
		},
		mixedCaseLetter: {
			title: '대소문자 혼합 여부',
		},
		repeatedCharacterRestriction: {
			title: '반복문자 사용제한',
			options: {yes: '제한함', no: '제한 안함'},
		},
		personalInformationRestriction: {
			title: '인적 사항 제한',
			restriction: {yes: '제한함', no: '제한 안함'},
			options: {
				email: 'Email',
				phoneNumber: '전화번호',
				consecutiveNumbersWithId: 'ID 동일 연속 문자 수(3)',
			},
		},
		enforcePasswordHistory: {
			title: '이전 비밀번호 재사용 제한',
			restrict: {yes: '제한함', no: '제한 안함'},
			period: {message: '일'},
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 패턴(비밀번호 패턴) 폼
 **************************************************/
const PaswordPattern = ({data}) => {
	const [
		minPasswordLength,
		minPasswordLengthTextBox,
		setMinPasswordLength,
	] = useTextBox({
		name: 'minPasswordLength',
	});
	const [
		maxPasswordLength,
		maxPasswordLengthTextBox,
		setMaxPasswordLength,
	] = useTextBox({
		name: 'maxPasswordLength',
	});
	const [
		consecutiveNumbers,
		consecutiveNumbersTextBox,
		setConsecutiveNumbers,
	] = useTextBox({
		name: 'consecutiveNumbers',
	});
	const [
		mixNumberAndAlpha,
		mixNumberAndAlphaRadioButton,
		setMixNumberAndAlpha,
	] = useRadio({
		name: 'mixNumberAndAlpha',
		options: usageOptions,
	});
	const [mixCase, mixCaseRadioButton, setMixCase] = useRadio({
		name: 'mixCase',
		options: usageOptions,
	});
	const [
		repeatedCharacterRestrictionNumber,
		repeatedCharacterRestrictionRadioButton,
		setRepeatedCharacterRestrictionNumber,
	] = useRadio({
		name: 'repeatedCharacterRestrictionNumber',
		options: restrictionOptions,
	});
	const [
		personalInformationRestriction,
		personalInformationRestrictionRadioButton,
		setPersonalInformationRestriction,
	] = useRadio({
		name: 'personalInformationRestriction',
		options: restrictionOptions,
	});

	const [
		personalInformationRestrictionMethod,
		personalInformationRestrictionMethodCheckBox,
		setPersonalInformationRestrictionMethod,
	] = useCheckBox({options: personalInformationRestrictionMethodOptions});

	const [
		oldPasswordsRistriction,
		oldPasswordsRistrictionRadioButton,
		setOldPasswordsRistriction,
	] = useRadio({
		name: 'oldPasswordsRistriction',
		options: restrictionOptions,
	});

	const [
		allowedDaysOfOldPasswords,
		allowedDaysOfOldPasswordsTextBox,
		setAllowedDaysOfOldPasswords,
	] = useTextBox({
		name: 'allowedDaysOfOldPasswords',
	});
	console.log(data);
	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.minLength) {
			setMinPasswordLength(data.attribute.minLength);
		}

		if (data?.attribute?.maxLength) {
			setMaxPasswordLength(data.attribute.maxLength);
		}

		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'numberOfConsecutiveNumerics',
			)
		) {
			setConsecutiveNumbers(data.attribute.numberOfConsecutiveNumerics);
		}

		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'mixNumberAndAlpha',
			)
		) {
			setMixNumberAndAlpha(
				data.attribute.mixNumberAndAlpha
					? usageOptions[0].key
					: usageOptions[1].key,
			);
		}

		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(data?.attribute, 'mixCase')
		) {
			setMixCase(
				data.attribute.mixCase
					? usageOptions[0].key
					: usageOptions[1].key,
			);
		}

		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'repeatedCharacterRestrictionNumber',
			)
		) {
			setRepeatedCharacterRestrictionNumber(
				data.attribute.repeatedCharacterRestrictionNumber
					? restrictionOptions[0].key
					: restrictionOptions[1].key,
			);
		}

		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'includePersonalInfoList',
			)
		) {
			setPersonalInformationRestrictionMethod(
				data.attribute.includePersonalInfoList,
			);

			setPersonalInformationRestriction(
				data.attribute.allowedDaysOfOldPasswords.length !== 0
					? restrictionOptions[0].key
					: restrictionOptions[1].key,
			);
		}

		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(
				data?.attribute,
				'allowedDaysOfOldPasswords',
			) &&
			data.attribute.allowedDaysOfOldPasswords !== 0
		) {
			setOldPasswordsRistriction(restrictionOptions[0].key);
			setAllowedDaysOfOldPasswords(
				data.attribute.allowedDaysOfOldPasswords,
			);
		} else {
			setOldPasswordsRistriction(restrictionOptions[1].key);
		}
	}, [data]);

	return (
		<TemplateElementContainer
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
								passwordPattern.contents.consecutiveNumbers
									.title
							}
							render={consecutiveNumbersTextBox}
						/>
						<TemplateElement
							title={
								passwordPattern.contents.mixedLetterAndNumber
									.title
							}
							render={mixNumberAndAlphaRadioButton}
						/>
						<TemplateElement
							title={
								passwordPattern.contents.mixedCaseLetter.title
							}
							render={mixCaseRadioButton}
						/>
						<TemplateElement
							title={
								passwordPattern.contents
									.repeatedCharacterRestriction.title
							}
							render={repeatedCharacterRestrictionRadioButton}
						/>
						<TemplateElement
							title={
								passwordPattern.contents
									.personalInformationRestriction.title
							}
							render={() => {
								return (
									<RowDiv>
										{personalInformationRestrictionRadioButton()}
										{personalInformationRestrictionMethodCheckBox()}
									</RowDiv>
								);
							}}
						/>

						<TemplateElement
							title={
								passwordPattern.contents.enforcePasswordHistory
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{oldPasswordsRistrictionRadioButton()}
										{allowedDaysOfOldPasswordsTextBox()}
										{
											passwordPattern.contents
												.enforcePasswordHistory.period
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
};
export default PaswordPattern;
