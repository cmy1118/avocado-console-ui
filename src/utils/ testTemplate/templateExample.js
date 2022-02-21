import {optionTypes} from './templateOverview';

const test = {
	title: '단말기 인증',
	contents: {
		description: ['단말기 인증이 필요한 애플리 케이션을 설정합니다.'],
		contents: [
			{
				type: optionTypes.selectBox,
				titile: '사용 여부',
				defaultValue: 'nonuse',
				options: [
					{
						value: 'use',
						label: '사용함',
					},
					{
						value: 'nonuse',
						label: '사용 안함',
						disabledSubContents: true,
						disabledValue: [
							{
								value: [],
							},
						],
					},
				],
				subContents: [
					{
						type: optionTypes.checkBox,
						defaultValue: [],
						changeLine: true,
						options: [
							{
								value: 'ManagementConsole',
								label: 'Management Console',
							},
							{value: 'WebTerminal', label: 'WebTerminal'},
						],
					},
				],
			},
		],
	},
};

const test2 = {
	title: 'MFA 인증',
	contents: {
		description: [
			'기본 인증 이후 추가 인증을 설정할 수 있으며, 최대 3차 까지 가능합니다.',
			'인증 수단은 중복 설정 할 수 없습니다.',
		],
		contents: [
			{
				type: optionTypes.selectBox,
				titile: '사용 여부',
				defaultValue: 'use',
				options: [
					{
						value: 'use',
						label: '사용함',
					},
					{
						value: 'nonuse',
						label: '사용안함',
						disabledSubContents: true,
						disabledValue: [
							{
								value: 'nonuse',
								subContents: [
									{
										value: 'non',
									},
									{
										value: [],
									},
								],
							},
							{
								value: 'nonuse',
								subContents: [
									{
										value: 'non',
									},
									{
										value: [],
									},
								],
							},
							{
								value: 'nonuse',
								subContents: [
									{
										value: 'non',
									},
									{
										value: [],
									},
								],
							},
						],
					},
				],
				subContents: [
					{type: optionTypes.newLine, changeLine: true},
					{
						type: optionTypes.comboBox,
						changeLine: true,
						defaultValue: 'use',
						title: '1차 추가 인증',
						options: [
							{
								value: 'use',
								label: '인증 함',
							},
							{
								value: 'nonuse',
								label: '인증 안함',
								disabledSubContents: true,
								disabledValue: [{value: 'no'}, {value: []}],
							},
						],
						subContents: [
							{
								type: optionTypes.selectBox,
								defaultValue: 'required',
								options: [
									{
										value: 'required',
										label: '필수',
									},
									{
										value: 'optional',
										label: '선택',
									},
									{
										value: 'no',
										label: '없음',
									},
								],
							},
							{
								type: optionTypes.checkBox,
								defaultValue: ['mail'],
								options: [
									{
										value: 'mail',
										label: '인증번호(Mail)',
									},
									{
										value: 'sms',
										label: '인증번호(SMS)',
									},
									{
										value: 'kakao',
										label: '인증번호(Kakao)',
									},
								],
							},
						],
					},
					{
						type: optionTypes.comboBox,
						changeLine: true,
						defaultValue: 'use',
						title: '2차 추가 인증',
						options: [
							{
								value: 'use',
								label: '인증 함',
							},
							{
								value: 'nonuse',
								label: '인증 안함',
								disabledSubContents: true,
								disabledValue: [{value: 'no'}, {value: []}],
							},
						],
						subContents: [
							{
								type: optionTypes.selectBox,
								defaultValue: 'optional',
								options: [
									{
										value: 'required',
										label: '필수',
									},
									{
										value: 'optional',
										label: '선택',
									},
									{
										value: 'no',
										label: '없음',
									},
								],
							},
							{
								type: optionTypes.checkBox,
								defaultValue: ['mail', 'kakao'],
								options: [
									{
										value: 'mail',
										label: '인증번호(Mail)',
									},
									{
										value: 'sms',
										label: '인증번호(SMS)',
									},
									{
										value: 'kakao',
										label: '인증번호(Kakao)',
									},
								],
							},
						],
					},
					{
						type: optionTypes.comboBox,
						changeLine: true,
						defaultValue: 'nonuse',
						title: '3차 추가 인증',
						options: [
							{
								value: 'use',
								label: '인증 함',
							},
							{
								value: 'nonuse',
								label: '인증 안함',
								disabledSubContents: true,
								disabledValue: [{value: 'no'}, {value: []}],
							},
						],
						subContents: [
							{
								type: optionTypes.selectBox,
								defaultValue: 'no',
								options: [
									{
										value: 'required',
										label: '필수',
									},
									{
										value: 'optional',
										label: '선택',
									},
									{
										value: 'no',
										label: '없음',
									},
								],
							},
							{
								type: optionTypes.checkBox,
								defaultValue: [''],
								options: [
									{
										value: 'mail',
										label: '인증번호(Mail)',
									},
									{
										value: 'sms',
										label: '인증번호(SMS)',
									},
									{
										value: 'kakao',
										label: '인증번호(Kakao)',
									},
								],
							},
						],
					},
				],
			},
		],
	},
};

const test3 = {
	title: '로그인 실패',
	contents: {
		description: [
			'사용자 로그인 실패 횟수에 따라 계정을 처리하기 위해 정책을 설정합니다.',
			'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
		],
		contents: [
			{
				type: optionTypes.input,
				titile: '로그인 실패 횟수',
				inputType: 'number',
				proText: '회',
				defaultValue: 5,
			},
			{
				type: optionTypes.selectBox,
				titile: '계정 처리 방법',
				defaultValue: 'lock',
				options: [
					{
						value: 'lock',
						label: '잠금',
					},
					{value: 'delete', label: '잠금'},
				],
			},
			{
				type: optionTypes.input,
				titile: '오류 횟수 초기화',
				inputType: 'number',
				proText: '시간 후',
				defaultValue: 24,
			},
			{
				type: optionTypes.input,
				titile: '계정 정상화',
				inputType: 'number',
				proText: '시간 후',
				defaultValue: 24,
			},
		],
	},
};
