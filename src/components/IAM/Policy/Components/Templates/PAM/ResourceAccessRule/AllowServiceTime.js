import PropTypes from 'prop-types';
import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import React, {useEffect, useState} from 'react';
import useRadio from '../../../../../../../hooks/useRadio';
import {
	policyOption,
	restrictionOptions,
	setUsageOptionByAttribute,
} from '../../../../../../../utils/policy/options';
import TimeInterval, {
	dayOfWeekKey,
	timeIntervalDefaultValue,
} from './TimeInterval';

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
	//timeoutRistriction: 사유 입력 시간제한 유무
	const [
		timeoutRistriction,
		timeoutRistrictionRadioButton,
		setTimeoutRistriction,
	] = useRadio({
		name: 'timeoutRistriction',
		options: restrictionOptions,
	});
	const [timezone, setTimezone] = useState({});

	/**************************************************
	 * ambacc244 - 접속 가능 시간 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		//rule 생성을 위한 ruleType이 존재
		if (data?.attribute?.ruleType) {
			const attributes = {
				usage:
					timeoutRistriction === policyOption.restrict.restrict.key,
			};
			//제한 여부 true
			if (timeoutRistriction === policyOption.restrict.restrict.key) {
				const tempTimezone = {};
				Object.keys(timezone).map((v) => {
					if (timezone[v].checked) {
						tempTimezone[v] = timezone[v].val;
					}
				});
				// console.log(tempTimezone);
				attributes.policies = tempTimezone;
			}
			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [timeoutRistriction, data, setTemplateData, timezone]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//로그인 실패 사용 여부 세팅
		setTimeoutRistriction(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.key,
				policyOption.usage.none.key,
			),
		);

		if (data?.attribute?.policies) {
			const tempTimezone = {};
			Object.keys(data.attribute.policies).map(
				(v) =>
					(tempTimezone[v] = {
						checked: true,
						val: data.attribute.policies[v],
					}),
			);

			setTimezone({
				...timeIntervalDefaultValue,
				...tempTimezone,
			});
		}
	}, [data]);

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
						<TimeInterval
							data={timezone}
							setData={setTimezone}
							disabled={
								timeoutRistriction ===
								policyOption.restrict.none.key
							}
						/>
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
