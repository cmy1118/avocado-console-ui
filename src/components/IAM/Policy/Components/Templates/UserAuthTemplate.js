import React, {useState} from 'react';
import TemplateItemContainer from '../TemplateItemContainer';
import TemplateElement from '../TemplateElement';
import CheckBox from '../../../../RecycleComponents/New/CheckBox';
import RadioButton from '../../../../RecycleComponents/New/RadioButton';
import {usageOptions} from '../../../../../utils/options';

const userAuth = {
	title: '사용자 인증',
	contents: {
		deviceAuth: {
			title: '단말기 인증',
			description: ['단말기 인증이 필요한 애플리 케이션을 설정합니다.'],
		},
		mfa: {
			title: 'MFA 인증',
			description: [
				'기본 인증 이후 추가 인증을 설정할 수 있으며, 최대 3차 까지 가능합니다.',
				'인증 수단은 중복 설정 할 수 없습니다.',
			],
			contents: {
				usage: {
					title: '사용 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				additionalAuth1: {
					title: '1차 추가 인증',
					auth: {use: '인증 함', nonuse: '인증 안함'},
					required: {required: '필수', optional: '선택', no: '없음'},
					authMethod: {
						mail: '인증번호(Mail)',
						sms: '인증번호(SMS)',
						kakao: '인증번호(Kakao)',
					},
				},
				additionalAuth2: {
					title: '2차 추가 인증',
					auth: {use: '인증 함', nonuse: '인증 안함'},
					required: {required: '필수', optional: '선택', no: '없음'},
					authMethod: {
						mail: '인증번호(Mail)',
						sms: '인증번호(SMS)',
						kakao: '인증번호(Kakao)',
					},
				},
				additionalAuth3: {
					title: '3차 추가 인증',
					auth: {use: '인증 함', nonuse: '인증 안함'},
					required: {required: '필수', optional: '선택', no: '없음'},
					authMethod: {
						mail: '인증번호(Mail)',
						sms: '인증번호(SMS)',
						kakao: '인증번호(Kakao)',
					},
				},
			},
		},
		failOver: {
			title: 'Fail Over',
			description: [
				'인증수단의 문제로 실패시 다른 인증수단으로 전환 하여 인증을 진행합니다.',
			],
			contents: {
				usage: {
					title: '사용 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				basicAuth: {
					title: '기본 인증',
					options: {
						no: '없음',
						mail: '인증번호(Mail)',
						sms: '인증번호(SMS)',
						kakao: '인증번호(Kakao)',
					},
				},
				mfa: {
					title: 'MFA',
					options: {
						no: '없음',
						mail: '인증번호(Mail)',
						sms: '인증번호(SMS)',
						kakao: '인증번호(Kakao)',
					},
				},
			},
		},
		identityVerification: {
			title: '본인 확인 인증',
			description: [
				'화면 보호 해제  본인임을 확인하는 인증 절차를 설정 합니다.',
				'입력 대기 시간은 최대 180초(3분)을 초과 할 수 없습니다.',
			],
			contents: {
				usage: {
					title: '사용 여부',
					options: {use: '사용함', nonuse: '사용 안함'},
				},
				authMethod: {
					title: '확인 유형',
					options: {
						idPassword: 'ID/Password',
						mail: '인증번호(Mail)',
						sms: '인증번호(SMS)',
						kakao: '인증번호(Kakao)',
					},
				},
				waitingTime: {
					title: '입력 대기 시간(초)',
					message: '초',
				},
			},
		},
	},
};

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = () => {
	const [applicationUsage, setApplicationUsage] = useState();

	const authOptions = [
		{
			value: userAuth.contents.failOver.contents.basicAuth.options.no,
			label: userAuth.contents.failOver.contents.basicAuth.options.no,
		},
		{
			value: userAuth.contents.failOver.contents.basicAuth.options.mail,
			label: userAuth.contents.failOver.contents.basicAuth.options.mail,
		},
		{
			value: userAuth.contents.failOver.contents.basicAuth.options.sms,
			label: userAuth.contents.failOver.contents.basicAuth.options.sms,
		},
		{
			value: userAuth.contents.failOver.contents.basicAuth.options.kakao,
			label: userAuth.contents.failOver.contents.basicAuth.options.kakao,
		},
	];
	const authMethod = [
		{
			value:
				userAuth.contents.identityVerification.contents.authMethod
					.options.idPassword,
			label:
				userAuth.contents.identityVerification.contents.authMethod
					.options.idPassword,
		},
		{
			value:
				userAuth.contents.identityVerification.contents.authMethod
					.options.mail,
			label:
				userAuth.contents.identityVerification.contents.authMethod
					.options.mail,
		},
		{
			value:
				userAuth.contents.identityVerification.contents.authMethod
					.options.sms,
			label:
				userAuth.contents.identityVerification.contents.authMethod
					.options.sms,
		},
		{
			value:
				userAuth.contents.identityVerification.contents.authMethod
					.options.kakao,
			label:
				userAuth.contents.identityVerification.contents.authMethod
					.options.kakao,
		},
	];
	return (
		<div>
			<TemplateItemContainer
				title={userAuth.contents.deviceAuth.title}
				description={userAuth.contents.deviceAuth.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={
									userAuth.contents.deviceAuth.contents.usage
										.title
								}
								render={() => {
									return (
										<RadioButton
											value={usageOptions[0].value}
											setValue={setApplicationUsage}
											options={usageOptions}
										/>
									);
								}}
							/>
							<TemplateElement
								title={
									userAuth.contents.deviceAuth.contents
										.application.title
								}
								render={() => {
									return (
										<div>
											<CheckBox
												label={
													userAuth.contents.deviceAuth
														.contents.application
														.options
														.managementConsole
												}
											/>
											<CheckBox
												label={
													userAuth.contents.deviceAuth
														.contents.application
														.options.webTerminal
												}
											/>
										</div>
									);
								}}
							/>
						</div>
					);
				}}
			/>
			<TemplateItemContainer
				title={userAuth.contents.mfa.title}
				description={userAuth.contents.mfa.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={
									userAuth.contents.mfa.contents.usage.title
								}
								render={() => {
									return (
										<RadioButton
											value={usageOptions[0].value}
											setValue={setApplicationUsage}
											options={usageOptions}
										/>
									);
								}}
							/>
							{/*	<TemplateElement*/}
							{/*		title={*/}
							{/*			userAuth.contents.deviceAuth.contents*/}
							{/*				.application.title*/}
							{/*		}*/}
							{/*		render={() => {*/}
							{/*			return (*/}
							{/*				<div>*/}
							{/*					<CheckBox*/}
							{/*						label={*/}
							{/*							userAuth.contents.deviceAuth*/}
							{/*								.contents.application*/}
							{/*								.options*/}
							{/*								.managementConsole*/}
							{/*						}*/}
							{/*					/>*/}
							{/*					<CheckBox*/}
							{/*						label={*/}
							{/*							userAuth.contents.deviceAuth*/}
							{/*								.contents.application*/}
							{/*								.options.webTerminal*/}
							{/*						}*/}
							{/*					/>*/}
							{/*				</div>*/}
							{/*			);*/}
							{/*		}}*/}
							{/*	/>*/}
						</div>
					);
				}}
			/>
		</div>
	);
};

export default UserAuthTemplate;
