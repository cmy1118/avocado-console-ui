import React, {useEffect, useState} from 'react';
import TimeInterval from '../../../../RecycleComponents/Templates/TimeInterval';
import TemplateElementContainer from '../TemplateElementContainer';
import TemplateElement from '../TemplateElement';
import useRadio from '../../../../../hooks/useRadio';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	common: {
		isLimited: {
			title: '제한 여부',
			true: '제한 함',
			false: '제한 안함',
		},
	},
	managementConsole: {
		title: 'Management Console',
		description: [
			'접근 가능 시간을 제한 하지 않으면 언제든 제한 없이 접근 가능합니다.',
			'접근 가능 시간을 제한할 경우 요일별 시간을 설정합니다. 23:59까지만 설정',
		],
	},
	webTerminal: {
		title: 'Web Terminal',
		description: [
			'접근 가능 시간을 제한 하지 않으면 언제든 제한 없이 접근 가능합니다.',
			'접근 가능 시간을 제한할 경우 요일별 시간을 설정합니다. 23:59까지만 설정',
		],
	},
};

/**************************************************
 * seob - 사용자 접근 템플릿
 ***************************************************/
const UserAccessTemplate = () => {
	const CONSOLE_RADIO_NAME = 'console-radio-name';
	const WEBTERM_RADIO_NAME = 'webterm-radio-name';
	// 라디오 버튼 옵션값
	const radioOptions = [
		{label: contents.common.isLimited.true, value: true},
		{label: contents.common.isLimited.false, value: false},
	];
	// console 라디오 버튼 hook
	const [consoleRadioValue, consoleRadio] = useRadio({
		name: CONSOLE_RADIO_NAME,
		options: radioOptions,
	});

	// webterm 라디오 버튼 hook
	const [webtermRadioValue, webtermRadio] = useRadio({
		name: WEBTERM_RADIO_NAME,
		options: radioOptions,
	});
	// 'Management Console' 설정한 요일별 시간 state
	const [mcIntervals, setMcIntervals] = useState({});
	// 'Web Terminal' 설정한 요일별 시간 state
	const [wtIntervals, setWtIntervals] = useState({});

	// Week: 요일 리스트
	const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

	// 제한여부 및 시간 변경에 대한 변경값 출력
	useEffect(() => {
		console.log('mcIntervals => ', consoleRadioValue, mcIntervals);
		console.log('wtIntervals => ', webtermRadioValue, wtIntervals);
	}, [consoleRadioValue, mcIntervals, webtermRadioValue, wtIntervals]);

	return (
		<div>
			<TemplateElementContainer
				title={contents.managementConsole.title}
				description={contents.managementConsole.description}
				render={() => {
					return (
						<>
							<TemplateElement
								title={contents.common.isLimited.title}
								render={consoleRadio}
							/>
							{week.map((dayOfWeek) => (
								<TimeInterval
									key={dayOfWeek}
									title={dayOfWeek}
									setInterval={setMcIntervals}
									disabled={!consoleRadioValue}
								/>
							))}
						</>
					);
				}}
			/>
			<TemplateElementContainer
				title={contents.webTerminal.title}
				description={contents.webTerminal.description}
				render={() => {
					return (
						<>
							<TemplateElement
								title={contents.common.isLimited.title}
								render={webtermRadio}
							/>
							{week.map((dayOfWeek) => (
								<TimeInterval
									key={dayOfWeek}
									title={dayOfWeek}
									setInterval={setWtIntervals}
									disabled={!webtermRadioValue}
								/>
							))}
						</>
					);
				}}
			/>
		</div>
	);
};

export default UserAccessTemplate;
