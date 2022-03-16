import React from 'react';
import useRadio from '../../../../../../hooks/useRadio';
import {
	resourceOptions,
	restrictionOptions,
	usageOptions,
} from '../../../../../../utils/policyOptions';
import TemplateElementContainer from '../../TemplateElementContainer';
import TimeInterval from '../../../../../RecycleComponents/Templates/TimeInterval';
import TemplateElement from '../../TemplateElement';

const connectReason = {
	connectReason: {
		title: '접속 사유',
		description: ['원격자원 접속 사유 정책을 관리합니다.'],
	},
	timeout: {
		title: '사유 입력 시간',
		description: ['원격자원 접속 시 사유 적용되는 시간대를 설정합니다.'],
		contents: {restriction: {titile: '제한 여부'}},
	},
	resource: {
		title: '자원',
		description: [
			'자원 추가는 정책(권한) 부여 권한이 있는 자원만 추가 가능하며, 모든 자원 은 부여 권한이 있는 모든 자원 입니다.',
			'자원 그룹 : 선택한 그룹의 하위 자원만 해당 정책이 적용되며 하위의 그룹은 해당 되지 않습니다.',
			"'특정자원' 추가 후 '모든자원'으로 선택 변경 시 기존에 선택된 자원은 모두 삭제 됩니다.",
			'정책은 선택한 자원 그룹의 하위 자원과 자원을 모두 합하여 적용됩니다.',
		],
	},
};

const DayOfTheWeek = {
	MON: '월',
	TUE: '화',
	WED: '수',
	THU: '목',
	FRI: '금',
	SAT: '토',
	SUN: '일',
};

/**************************************************
 * ambacc244 - 접속 사유 정책 템플릿 컴포넌트
 **************************************************/
const ConnectReason = () => {
	//usage: 접속 사유 정책 사용 유무
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'ConnectReasonUsage',
		options: usageOptions,
	});
	//timeoutRistriction: 사유 입력 시간제한 유무
	const [
		timeoutRistriction,
		timeoutRistrictionRadioButton,
		setOldTimeoutRistriction,
	] = useRadio({
		name: 'timeoutRistriction',
		options: restrictionOptions,
	});
	//resource: 자원 선택 방식
	const [resource, resourceRadioButton, setResource] = useRadio({
		name: 'connectResource',
		options: resourceOptions,
	});

	return (
		<div>
			<TemplateElementContainer
				title={connectReason.connectReason.title}
				description={connectReason.connectReason.description}
				render={() => {
					return (
						<div>
							{usageRadioButton()}
							<div>----------------------------------</div>
						</div>
					);
				}}
			/>
			<TemplateElementContainer
				title={connectReason.timeout.title}
				description={connectReason.timeout.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={
									connectReason.timeout.contents.restriction
										.title
								}
								render={timeoutRistrictionRadioButton}
							/>
							{/*{timeoutRistrictionRadioButton()}*/}
							<div>----------------------------------</div>
							{Object.keys(DayOfTheWeek).map((w) => (
								<TimeInterval
									key={w}
									week={w}
									title={DayOfTheWeek[w]}
									// data={v}
									// setData={setData}
								/>
							))}
						</div>
					);
				}}
			/>
			<TemplateElementContainer
				title={connectReason.resource.title}
				description={connectReason.resource.description}
				render={() => {
					return (
						<div>
							{resourceRadioButton()}
							<div>----------------------------------</div>
						</div>
					);
				}}
			/>
		</div>
	);
};

export default ConnectReason;
