import React, {useEffect, useState} from 'react';
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
const TimeInterval = ({title, setInterval, disabled = false}) => {
	// 설정한 시간
	const [time, setTime] = useState({
		start: '09:00',
		end: '18:00',
	});

	// 체크박스 체크 여부
	const [checked, setChecked] = useState(true);

	/**************************************************
	 * seob - input time의 값을 변경하는 함수
	 ***************************************************/
	const handleChangeTime = (e) => {
		console.log(e);
		const {value, name} = e.target;
		console.log('name => ', name);
		console.log('value => ', value);
		setTime((prev) => ({...prev, [name]: value}));
		setInterval((prev) => ({...prev, [title]: {...time, [name]: value}}));
	};

	// 최초 렌더링에 interval 초기화
	useEffect(() => {
		setInterval((prev) => ({...prev, [title]: time}));
	}, []); // 1번만 실행되도록 deps 빈값입니다.

	return (
		<Container>
			<CheckBoxContainer>
				<CheckBox
					label={contents.dayOfWeek[title]}
					checked={checked}
					onChange={() => setChecked(!checked)}
					disabled={disabled}
					indeterminate={disabled}
				/>
			</CheckBoxContainer>
			<IntervalContainer>
				<input
					type='time'
					value={time.start}
					name='start'
					min='09:00'
					// todo: 범위를 초과하지 않도록 작업 => handleChangeTime에서 처리 필요
					max={time.end}
					onChange={handleChangeTime}
					required
					disabled={disabled || !checked}
				/>
				<div> ~ </div>
				<input
					type='time'
					value={time.end}
					name='end'
					// todo: 범위를 초과하지 않도록 작업 => handleChangeTime에서 처리 필요
					min={time.start}
					max='24:00'
					onChange={handleChangeTime}
					required
					disabled={disabled || !checked}
				/>
			</IntervalContainer>
		</Container>
	);
};

TimeInterval.propTypes = {
	title: PropTypes.string,
	setInterval: PropTypes.func,
	disabled: PropTypes.bool,
};

export default TimeInterval;
