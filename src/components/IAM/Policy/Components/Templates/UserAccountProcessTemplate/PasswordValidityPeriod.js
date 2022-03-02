import React from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	accountNormalizationOptions,
	accountStatusOptions,
	usageOptions,
} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';

const passwordValidityPeriod = {
	title: '비밀번호 사용 기간',
	description: [
		'사용자의 계정의 비밀번호 사용기간을 제어하는 정책을 설정합니다.',
		'정상화 후에는 반드시 비밀번호를 변경해햐 합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		activePeriod: {
			title: '사용 기간',
			message: '일',
		},
		accountStatus: {
			title: '계정 처리 방법',
		},
		accountNormalization: {
			title: '계정 정상화',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 계정 처리(비밀번호 사용 기간) 폼
 **************************************************/
const PasswordValidityPeriod = () => {
	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});
	const [activePeriod, activePeriodTextBox] = useTextBox({
		name: 'activePeriod',
	});
	const [accountStatus, accountStatusRadioButton] = useRadio({
		name: 'accountStatus',
		options: accountStatusOptions,
	});
	const [accountNormalization, accountNormalizationRadioButton] = useRadio({
		name: 'accountNormalization',
		options: accountNormalizationOptions,
	});

	return (
		<TemplateElementContainer
			title={passwordValidityPeriod.title}
			description={passwordValidityPeriod.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={passwordValidityPeriod.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								passwordValidityPeriod.contents.activePeriod
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{activePeriodTextBox()}
										{
											passwordValidityPeriod.contents
												.activePeriod.message
										}
									</RowDiv>
								);
							}}
						/>
						<TemplateElement
							title={
								passwordValidityPeriod.contents.accountStatus
									.title
							}
							render={accountStatusRadioButton}
						/>
						<TemplateElement
							title={
								passwordValidityPeriod.contents
									.accountNormalization.title
							}
							render={accountNormalizationRadioButton}
						/>
					</div>
				);
			}}
		/>
	);
};

export default PasswordValidityPeriod;
