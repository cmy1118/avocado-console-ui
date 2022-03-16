import React from 'react';
import useRadio from '../../../../../../hooks/useRadio';
import {
	resourceOptions,
	restrictionOptions,
} from '../../../../../../utils/policyOptions';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import TimeInterval from '../../../../../RecycleComponents/Templates/TimeInterval';
import {DayOfTheWeek} from './ConnectReason';

const resourceAccessRule = {
	accessTimezone: {
		title: '접속 가능 시간',
		description: [
			'접근 가능 시간을 제한 하지 않으면 언제든 제한 없이 접근 가능합니다..',
			'접근 가능 시간을 제한할 경우 요일별 시간을 설정 합니다. 23:59까지만 설정 가능합니다.',
		],
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

/**************************************************
 * ambacc244 - 자원 접근 정책 템플릿 컴포넌트
 **************************************************/
const ResourceAccessRule = () => {
	//accessTimezoneRistriction: 사유 입력 시간제한 유무
	const [
		accessTimezoneRistriction,
		accessTimezoneRistrictionRadioButton,
		setAccessTimezoneRistriction,
	] = useRadio({
		name: 'accessTimezoneRistriction',
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
				title={resourceAccessRule.accessTimezone.title}
				description={resourceAccessRule.accessTimezone.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={
									resourceAccessRule.accessTimezone.contents
										.restriction.titile
								}
								render={accessTimezoneRistrictionRadioButton}
							/>
							<div>----------------------------------</div>
							{Object.keys(DayOfTheWeek).map((w) => (
								<TimeInterval
									key={w}
									week={w}
									title={DayOfTheWeek[w]}
									data={{
										attribute: {
											usage: false,
											policies: {
												MONDAY: {
													from: '09:00:00',
													to: '18:00:00',
												},
												THURSDAY: {
													from: '09:00:00',
													to: '18:00:00',
												},
											},
										},
									}}
								/>
							))}
						</div>
					);
				}}
			/>
			<TemplateElementContainer
				title={resourceAccessRule.resource.title}
				description={resourceAccessRule.resource.description}
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
export default ResourceAccessRule;
