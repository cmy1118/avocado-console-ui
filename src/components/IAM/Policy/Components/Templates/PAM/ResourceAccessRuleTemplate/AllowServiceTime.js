import PropTypes from 'prop-types';
import TemplateLayout from '../../Outline/TemplateLayout';
import TemplateElement from '../../Outline/TemplateElement';
import TimeInterval from '../../../../../../RecycleComponents/Templates/TimeInterval';
import React, {useState} from 'react';
import useRadio from '../../../../../../../hooks/useRadio';
import {restrictionOptions} from '../../../../../../../utils/policyOptions';
import {DayOfTheWeek} from '../ConnectReasonTemplate/ConnectReasonTemplate';

const allowServiceTime = {
	title: '접속 가능 시간',
	description: [
		'접근 가능 시간을 제한 하지 않으면 언제든 제한 없이 접근 가능합니다..',
		'접근 가능 시간을 제한할 경우 요일별 시간을 설정 합니다. 23:59까지만 설정 가능합니다.',
	],
	contents: {restriction: {titile: '제한 여부'}},
};

/**************************************************
 * ambacc244 - 자원 접근 정책(접속 가능 시간) 폼
 **************************************************/
const AllowServiceTime = ({data, setTemplateData}) => {
	const [timezone, setTimezone] = useState({});
	//timeoutRistriction: 사유 입력 시간제한 유무
	const [
		timeoutRistriction,
		timeoutRistrictionRadioButton,
		setOldTimeoutRistriction,
	] = useRadio({
		name: 'timeoutRistriction',
		options: restrictionOptions,
	});

	return (
		<TemplateLayout
			title={allowServiceTime.title}
			description={allowServiceTime.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={allowServiceTime.contents.restriction.titile}
							render={timeoutRistrictionRadioButton}
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
	);
};

AllowServiceTime.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default AllowServiceTime;
