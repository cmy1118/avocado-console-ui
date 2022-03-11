import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckBox from '../New/CheckBox';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const Input = styled.input`
	width: 20px;
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

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	dayOfWeek: {
		mon: '월',
		tue: '화',
		wed: '수',
		thu: '목',
		fri: '금',
		sat: '토',
		sun: '일',
	},
};

/**************************************************
 * seob - 요일별 시간간격 설정 컴포넌트
 *
 * title: 요일
 * setInterval: 요일에 해당하는 time interval를 설정하는 함수
 * disabled: 외부 제한요소에 의한 제한처리 여부
 ***************************************************/
const TimeInterval = ({week, title, data, setData}) => {
	// 설정한 시간

	const [time, setTime] = useState(
		data?.attribute.policies[week] || {from: '09:00', to: '18:00'},
	);

	// console.log(data.attribute.usage);

	// 체크박스 체크 여부
	const [checked, setChecked] = useState(!!data?.attribute.policies[week]);

	/**************************************************
	 * seob - input time의 값을 변경하는 함수
	 ***************************************************/
	const handleChangeTime = useCallback(
		(e) => {
			console.log(e);
			const {value, name} = e.target;
			console.log('name => ', name);
			console.log('value => ', value);
			if (name === 'from') {
				if (value < '09:00' || value > time.to) return;
			} else if (name === 'to') {
				if (value < time.from || value > '24:00') return;
			}
			setTime((time) => ({...time, [name]: value}));
			setData((prev) =>
				prev.map((v) => {
					if (v.resource === data.resource) {
						return {
							...v,
							attribute: {
								...v.attribute,
								policies: {
									...v.attribute.policies,
									[week]: {...time, [name]: value},
								},
							},
						};
					} else {
						return v;
					}
				}),
			);
			// setTime((prev) => ({...prev, [name]: value}));
			// setInterval((prev) => ({...prev, [title]: {...time, [name]: value}}));
		},
		[data, setData, time, week],
	);

	const handleChangeChecked = useCallback(() => {
		setData((prev) =>
			prev.map((v) => {
				if (v.resource === data.resource) {
					if (checked) delete v.attribute.policies[week];
					return {
						...v,
						attribute: {
							...v.attribute,
							policies: {
								...v.attribute.policies,
								...(!checked && {
									[week]: {from: '09:00:00', to: '18:00:00'},
								}),
							},
						},
					};
				} else {
					return v;
				}
			}),
		);
		setChecked(!checked);
	}, [checked, data, setData, week]);

	return (
		<Container>
			<CheckBoxContainer>
				<CheckBox
					label={contents.dayOfWeek[title]}
					checked={checked}
					onChange={handleChangeChecked}
					disabled={!data.attribute.usage}
					indeterminate={!data.attribute.usage}
				/>
			</CheckBoxContainer>
			<IntervalContainer>
				<input
					type='time'
					value={time.from}
					name='from'
					min='09:00'
					// todo: 범위를 초과하지 않도록 작업 => handleChangeTime에서 처리 필요
					max={time.to}
					onChange={handleChangeTime}
					required
					disabled={!data.attribute.usage || !checked}
				/>
				<div> ~ </div>
				<input
					type='time'
					value={time.to}
					name='to'
					// todo: 범위를 초과하지 않도록 작업 => handleChangeTime에서 처리 필요
					min={time.from}
					max='24:00'
					onChange={handleChangeTime}
					required
					disabled={!data.attribute.usage || !checked}
				/>
			</IntervalContainer>
		</Container>
	);
};

TimeInterval.propTypes = {
	title: PropTypes.string,
	week: PropTypes.string,
	data: PropTypes.object,
	setData: PropTypes.func,
};

export default TimeInterval;
