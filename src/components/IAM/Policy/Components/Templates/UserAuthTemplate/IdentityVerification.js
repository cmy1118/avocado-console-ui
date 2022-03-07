import React, {useEffect} from 'react';

import TemplateElementContainer from '../../TemplateElementContainer';
import {
	identityVerificationMethodOptions,
	usageOptions,
} from '../../../../../../utils/options';
import TemplateElement from '../../TemplateElement';
import useRadio from '../../../../../../hooks/useRadio';
import useTextBox from '../../../../../../hooks/useTextBox';
import {RowDiv} from '../../../../../../styles/components/style';
import PropTypes from 'prop-types';
import MFA from './MFA';

const identityVerification = {
	title: '본인 확인 인증',
	description: [
		'화면 보호 해제  본인임을 확인하는 인증 절차를 설정 합니다.',
		'입력 대기 시간은 최대 180초(3분)을 초과 할 수 없습니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		authMethod: {
			title: '확인 유형',
		},
		timeOutSeconds: {
			title: '입력 대기 시간(초)',
			message: '초',
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증(본인 확인 인증) 폼
 **************************************************/
const IdentityVerification = ({data}) => {
	//usage: 본인 확인 인증 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'identityVerificationUsage',
		options: usageOptions,
	});
	//authMethod: 본인 인증 확인 유형
	const [authMethod, authMethodRadioButton, setAuthMethod] = useRadio({
		name: 'IdentityVerificationAuthMethod',
		options: identityVerificationMethodOptions,
	});
	//timeOutSeconds: 입력 대기 시간
	const [
		timeOutSeconds,
		timeOutSecondsTextBox,
		setTimeOutSeconds,
	] = useTextBox({
		name: 'timeOutSeconds',
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (
			data?.attribute &&
			Object.prototype.hasOwnProperty.call(data.attribute, 'usage')
		) {
			setUsage(
				data.attribute.usage
					? usageOptions[0].key
					: usageOptions[1].key,
			);
		}
		if (
			data?.attribute?.policies &&
			Object.prototype.hasOwnProperty.call(
				data.attribute.policies,
				'MAIL',
			)
		) {
			setAuthMethod(identityVerificationMethodOptions[1].key);
			setTimeOutSeconds(data.attribute.policies.MAIL.timoutSeconds);
		}
	}, [data]);

	return (
		<TemplateElementContainer
			title={identityVerification.title}
			description={identityVerification.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={identityVerification.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								identityVerification.contents.authMethod.title
							}
							render={authMethodRadioButton}
						/>
						<TemplateElement
							title={
								identityVerification.contents.timeOutSeconds
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{timeOutSecondsTextBox()}
										{
											identityVerification.contents
												.timeOutSeconds.message
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

IdentityVerification.propTypes = {
	data: PropTypes.object,
};

export default IdentityVerification;
