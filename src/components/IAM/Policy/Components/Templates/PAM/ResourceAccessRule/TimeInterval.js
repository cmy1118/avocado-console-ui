import PropTypes from 'prop-types';
import CheckBox from '../../../../../../RecycleComponents/New/CheckBox';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 12px 24px;
`;

const IntervalContainer = styled.div`
	display: flex;
	margin: 12px 24px;
	input[type='time']::-webkit-calendar-picker-indicator {
		background: none;
		display: none;
	}
`;

export const dayOfWeekKey = {
	MONDAY: 'MONDAY',
	TUESDAY: 'TUESDAY',
	WEDNESDAY: 'WEDNESDAY',
	THURSDAY: 'THURSDAY',
	FRIDAY: 'FRIDAY',
	SATURDAY: 'SATURDAY',
	SUNDAY: 'SUNDAY',
};

export const timeIntervalDefaultValue = {
	[dayOfWeekKey.MONDAY]: {
		checked: false,
		val: {
			from: '09:00:00',
			to: '18:00:00',
		},
	},
	[dayOfWeekKey.TUESDAY]: {
		checked: false,
		val: {from: '09:00:00', to: '18:00:00'},
	},
	[dayOfWeekKey.WEDNESDAY]: {
		checked: false,
		val: {
			from: '09:00:00',
			to: '18:00:00',
		},
	},
	[dayOfWeekKey.THURSDAY]: {
		checked: false,
		val: {from: '09:00:00', to: '18:00:00'},
	},
	[dayOfWeekKey.FRIDAY]: {
		checked: false,
		val: {from: '09:00:00', to: '18:00:00'},
	},
	[dayOfWeekKey.SATURDAY]: {
		checked: false,
		val: {from: '09:00:00', to: '18:00:00'},
	},
	[dayOfWeekKey.SUNDAY]: {
		checked: false,
		val: {from: '09:00:00', to: '18:00:00'},
	},
};

const dayOfWeek = [
	dayOfWeekKey.MONDAY,
	dayOfWeekKey.TUESDAY,
	dayOfWeekKey.WEDNESDAY,
	dayOfWeekKey.THURSDAY,
	dayOfWeekKey.FRIDAY,
	dayOfWeekKey.SATURDAY,
	dayOfWeekKey.SUNDAY,
];

const timeInterval = {
	dayOfWeek: {
		[dayOfWeekKey.MONDAY]: '월',
		[dayOfWeekKey.TUESDAY]: '화',
		[dayOfWeekKey.WEDNESDAY]: '수',
		[dayOfWeekKey.THURSDAY]: '목',
		[dayOfWeekKey.FRIDAY]: '금',
		[dayOfWeekKey.SATURDAY]: '토',
		[dayOfWeekKey.SUNDAY]: '일',
	},
};

const TimeInterval = ({data, setData, disabled}) => {
	const onChangeCheck = useCallback(
		(v) => () => {
			setData((prev) => ({
				...prev,
				[v]: {
					...prev[v],
					checked: !prev[v].checked,
				},
			}));
		},
		[],
	);

	const onChangeTimezone = useCallback(
		(v) => (e) => {
			const {value, name} = e.target;

			setData((prev) => ({
				...prev,
				[v]: {
					...prev[v],
					val: {...prev[v].val, [name]: value},
				},
			}));
		},
		[data],
	);

	return dayOfWeek.map((v) => (
		<Container key={v}>
			<CheckBoxContainer>
				<CheckBox
					label={timeInterval.dayOfWeek[v]}
					checked={data[v]?.checked}
					onChange={onChangeCheck(v)}
					disabled={disabled}
					indeterminate={disabled}
				/>
			</CheckBoxContainer>
			<IntervalContainer>
				<input
					type='time'
					value={data[v]?.val.from}
					name='from'
					min='09:00'
					// todo: 범위를 초과하지 않도록 작업 => handleChangeTime에서 처리 필요
					max={data[v]?.val.to}
					onChange={onChangeTimezone(v)}
					required
					disabled={disabled || !data[v]?.checked}
				/>
				<div> ~ </div>
				<input
					type='time'
					value={data[v]?.val.to}
					name='to'
					// todo: 범위를 초과하지 않도록 작업 => handleChangeTime에서 처리 필요
					min={data[v]?.val.from}
					max='24:00'
					onChange={onChangeTimezone(v)}
					required
					disabled={disabled || !data[v]?.checked}
				/>
			</IntervalContainer>
		</Container>
	));
};

TimeInterval.propTypes = {
	data: PropTypes.object.isRequired,
	setData: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
};

export default TimeInterval;
