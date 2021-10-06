import React, {Component, memo} from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import {selectedPageSize} from '../../settings/SettingsPage';

const SelectColumn = ({onClickOpenSelectColumn}) => {
	return (
		<span>
			<button onClick={onClickOpenSelectColumn}>{'✅'}</button>
		</span>
	);
};

SelectColumn.propTypes = {
	onClickOpenSelectColumn: PropTypes.func.isRequired,
};

export default memo(SelectColumn);
