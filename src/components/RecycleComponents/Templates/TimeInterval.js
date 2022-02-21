import React from 'react';
import PropTypes from 'prop-types';

const TimeInterval = ({title}) => {
	return (
		<div>
			<div>
				<input type='checkbox' />
				<p>월</p>
			</div>
			<div>
				<input type='text' /> :
				<input type='text' /> ~
				<input type='text' /> :
				<input type='text' />
			</div>
		</div>
	);
};

TimeInterval.propTypes = {
	title: PropTypes.string,
};

export default TimeInterval;
