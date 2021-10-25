import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import {DateRangePicker} from 'react-dates';

const CalenderOption = ({column: {filterValue = [], setFilter, id}}) => {
	const [focusedInput, setFocusedInput] = useState(null);

	const onClickDateChange = useCallback(({startDate, endDate}) => {
		setFilter(() => [startDate, endDate]);
	}, []);

	const onFocusChange = useCallback((focusedInput) => {
		setFocusedInput(focusedInput);
	}, []);

	return (
		<DateRangePicker
			startDate={filterValue[0]}
			startDateId='start-date'
			endDate={filterValue[1]}
			endDateId='end-date'
			onDatesChange={onClickDateChange}
			focusedInput={focusedInput}
			onFocusChange={onFocusChange}
			isOutsideRange={() => false}
		/>
	);
};

CalenderOption.propTypes = {column: PropTypes.object.isRequired};

export default CalenderOption;
