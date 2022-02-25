import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import React from 'react';
import useRadio from '../../../../../../hooks/useRadio';
import {
	personalInformationRestrictionMethodOptions,
	restrictionOptions,
	usageOptions,
} from '../../../../../../utils/options';
import useTextBox from '../../../../../../hooks/useTextBox';
import useCheckBox from '../../../../../../hooks/useCheckBox';

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
const PaswordPattern = () => {
	const [minPasswordLength, minPasswordLengthTextBox] = useTextBox({
		name: 'minPasswordLength',
	});
	const [maxPasswordLength, maxPasswordLengthTextBox] = useTextBox({
		name: 'maxPasswordLength',
	});
	const [consecutiveNumbers, consecutiveNumbersTextBox] = useTextBox({
		name: 'consecutiveNumbers',
	});
	const [mixedLetterAndNumber, mixedLetterAndNumberRadioButton] = useRadio({
		name: 'mixedLetterAndNumber',
		options: usageOptions,
	});
	const [mixedCaseLetter, mixedCaseLetterRadioButton] = useRadio({
		name: 'mixedCaseLetter',
		options: usageOptions,
	});
	const [
		repeatedCharacterRestrictionNumber,
		repeatedCharacterRestrictionRadioButton,
	] = useRadio({
		name: 'repeatedCharacterRestriction',
		options: restrictionOptions,
	});
	const [
		personalInformationRestriction,
		personalInformationRestrictionRadioButton,
	] = useRadio({
		name: 'personalInformationRestriction',
		options: restrictionOptions,
	});

	const [
		personalInformationRestrictionMethod,
		personalInformationRestrictionMethodCheckBox,
	] = useCheckBox({options: personalInformationRestrictionMethodOptions});

	const [
		enforcePasswordHistory,
		enforcePasswordHistoryRadioButton,
	] = useRadio({
		name: 'enforcePasswordHistory',
		options: restrictionOptions,
	});

	const [
		enforcePasswordHistoryPeriod,
		enforcePasswordHistoryPeriodTextBox,
	] = useTextBox({
		name: 'enforcePasswordHistoryPeriod',
	});

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
									<div>
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
									</div>
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
							render={mixedLetterAndNumberRadioButton}
						/>
						<TemplateElement
							title={
								passwordPattern.contents.mixedCaseLetter.title
							}
							render={mixedCaseLetterRadioButton}
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
									<div>
										{personalInformationRestrictionRadioButton()}
										{personalInformationRestrictionMethodCheckBox()}
									</div>
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
									<div>
										{enforcePasswordHistoryRadioButton()}
										{enforcePasswordHistoryPeriodTextBox()}
										{
											passwordPattern.contents
												.enforcePasswordHistory.period
												.message
										}
									</div>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

export default PaswordPattern;
