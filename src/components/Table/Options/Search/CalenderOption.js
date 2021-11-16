import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../../../styles/components/buttons';
import {DialogBoxFooter} from '../../../../styles/components/dialogBox';

const CalenderOption = ({column: {filterValue = [], setFilter, id}}) => {
	const [tempStartDate, setTempStartDate] = useState(
		filterValue[0] || undefined,
	);
	const [tempEndDate, setTempEndDate] = useState(filterValue[1] || undefined);

	const [focusedInput, setFocusedInput] = useState(null);

	const onClickDateChange = useCallback(({startDate, endDate}) => {
		setTempStartDate(startDate);
		setTempEndDate(endDate);
	}, []);

	const onFocusChange = useCallback((focusedInput) => {
		if (focusedInput === null) {
			setFocusedInput('startDate');
		} else {
			setFocusedInput(focusedInput);
		}
	}, []);

	const onClickCancel = useCallback(() => {
		setTempStartDate(filterValue[0]);
		setTempEndDate(filterValue[1]);
		setFocusedInput(null);
	}, [filterValue]);

	const onClickApplyFilter = useCallback(() => {
		setFilter(() => [tempStartDate, tempEndDate]);
		setFocusedInput(null);
	}, [setFilter, tempStartDate, tempEndDate]);

	useEffect(() => {
		moment.locale('ko');
	}, []);

	return (
		<div style={{zIndex: '10'}}>
			<DateRangePicker
				startDate={tempStartDate}
				startDateId='start-date'
				endDate={tempEndDate}
				endDateId='end-date'
				onDatesChange={onClickDateChange}
				focusedInput={focusedInput}
				onFocusChange={onFocusChange}
				isOutsideRange={() => false}
				displayFormat='YYYY.MM.DD'
				monthFormat='YYYY.MM'
				daySize={32}
				customArrowIcon={<div style={{padding: '9px'}}> to </div>}
				renderCalendarInfo={() => (
					<DialogBoxFooter>
						<TransparentBorderButton onClick={onClickCancel}>
							취소
						</TransparentBorderButton>
						<NormalBorderButton onClick={onClickApplyFilter}>
							적용
						</NormalBorderButton>
					</DialogBoxFooter>
				)}
			/>
		</div>
	);
};

CalenderOption.propTypes = {column: PropTypes.object.isRequired};

export default CalenderOption;
