import PropTypes from 'prop-types';
import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import TimeInterval from '../../../../../../RecycleComponents/Templates/TimeInterval';
import React, {useEffect, useState} from 'react';
import {DayOfTheWeek} from './ConnectReasonTemplate';
import useRadio from '../../../../../../../hooks/useRadio';
import {restrictionOptions} from '../../../../../../../utils/policy/options';

const allowReasonTime = {
	title: '사유 입력 시간',
	description: ['원격자원 접속 시 사유 적용되는 시간대를 설정합니다.'],
	contents: {restriction: {titile: '제한 여부'}},
};

/**************************************************
 * ambacc244 - 접속 사유 정책(사유 입력 시간) 폼
 **************************************************/
const AllowReasonTime = ({data, setTemplateData}) => {
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

	/**************************************************
	 * ambacc244 - 로그인 방식 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.ruleType) {
			setTemplateData({
				applicationCode: data.applicationCode.code,
			});
		}
	}, [data, setTemplateData]);

	return (
		<TemplateLayout
			title={allowReasonTime.title}
			description={allowReasonTime.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={allowReasonTime.contents.restriction.titile}
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

AllowReasonTime.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default AllowReasonTime;
