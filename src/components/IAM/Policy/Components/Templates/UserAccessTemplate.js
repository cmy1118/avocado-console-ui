import React, {useState} from 'react';
import TimeInterval from '../../../../RecycleComponents/Templates/TimeInterval';
import TemplateItemContainer from '../TemplateItemContainer';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	common: {
		dayOfWeek: {
			mon: '월',
			tue: '화',
			wed: '수',
			thu: '목',
			fri: '금',
			sat: '토',
			sun: '일',
		},
	},
	managementConsole: {
		title: 'Management Console',
		description: [
			'요일별 접근 가능한 시간을 설정 합니다.',
			'요일별 접근 가능한 시간을 설정 합니다.',
			'요일별 접근 가능한 시간을 설정 합니다.',
		],
	},
	webTerminal: {
		title: 'Web Terminal',
		description: '요일별 접근 가능한 시간을 설정 합니다.',
	},
};

const UserAccessTemplate = () => {
	// 설정한 요일별 시간 state
	const [intervals, setIntervals] = useState({});

	// Week: 요일 리스트
	const Week = [
		{
			dayOfWeek: contents.common.dayOfWeek.mon,
		},
		{
			dayOfWeek: contents.common.dayOfWeek.tue,
		},
		{
			dayOfWeek: contents.common.dayOfWeek.wed,
		},
		{
			dayOfWeek: contents.common.dayOfWeek.thu,
		},
		{
			dayOfWeek: contents.common.dayOfWeek.fri,
		},
		{
			dayOfWeek: contents.common.dayOfWeek.sat,
		},
		{
			dayOfWeek: contents.common.dayOfWeek.sun,
		},
	];

	return (
		<div>
			<TemplateItemContainer
				title={contents.managementConsole.title}
				description={contents.managementConsole.description}
				render={() => {
					return Week.map(({dayOfWeek}) => (
						<TimeInterval key={dayOfWeek} title={dayOfWeek} />
					));
				}}
			/>
			<TemplateItemContainer
				title={contents.webTerminal.title}
				description={contents.webTerminal.description}
				render={() => {
					return Week.map(({dayOfWeek}) => (
						<TimeInterval key={dayOfWeek} title={dayOfWeek} />
					));
				}}
			/>
		</div>
	);
};

export default UserAccessTemplate;
