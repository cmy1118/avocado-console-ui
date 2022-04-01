import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import TemplateLayout from '../Outline/TemplateLayout';
import useRadio from '../../../../../../hooks/useRadio';
import useCheckBox from '../../../../../../hooks/useCheckBox';
import TemplateElement from '../Outline/TemplateElement';
import useTextBox from '../../../../../../hooks/useTextBox';

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

const MFA = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	const [usageValue, usageRadio, setUsage] = useRadio({
		name: 'usage',
		options: [
			{
				label: '사용 함',
				key: 'use',
			},
			{
				label: '사용 안함',
				key: 'none',
			},
		],
	});

	const [authValue, authCheckBox, setAuthValue] = useCheckBox({
		options: [
			{
				label: '인증번호(Mail)',
				key: 'mail',
			},
			{
				label: '인증번호(SMS)',
				key: 'sms',
			},
			{
				label: '인증번호(Kakao)',
				key: 'kakao',
			},
			{
				label: '지문인증',
				key: 'fingerprint',
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

	/**************************************************
	 * seob - 규칙 템플릿 id에 해당하는 데이터 detail findAll
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			console.log('api 작업');
			try {
				// await api
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [dispatch]);
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
		</div>
	);
};

export default MFA;
