import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {selectedPageSize} from '../../settings/SettingsPage';

const PageSizing = ({pageSize, setPageSize}) => {
	return (
		<div>
			<select
				value={pageSize}
				onChange={(e) => {
					setPageSize(Number(e.target.value));
				}}
			>
				{selectedPageSize.map((pageSize) => (
					<option key={pageSize} value={pageSize}>
						Show {pageSize}
					</option>
				))}
			</select>
		</div>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default memo(PageSizing);
