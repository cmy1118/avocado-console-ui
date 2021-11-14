import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import {DateRangePicker} from 'react-dates';

const CalenderOptionTemp = () => {
	const [focusedInput, setFocusedInput] = useState(null);

	// const onClickDateChange = useCallback(({startDate, endDate}) => {
	// 	setFilter(() => [startDate, endDate]);
	// }, []);
	//
	const onFocusChange = useCallback((focusedInput) => {
		setFocusedInput(focusedInput);
	}, []);

	return (
		<div style={{zIndex: '10'}}>
			<DateRangePicker
				// startDate={filterValue[0]}
				startDateId='start-date'
				// endDate={filterValue[1]}
				// endDateId='end-date'
				// onDatesChange={onClickDateChange}
				focusedInput={focusedInput}
				onFocusChange={onFocusChange}
				isOutsideRange={() => false}
				displayFormat='YYYY.MM.DD'
				monthFormat='YYYY.MM'
				daySize={32}
				customArrowIcon={<div style={{padding: '9px'}}> to </div>}
			/>
		</div>
	);
};

export default CalenderOptionTemp;
