import React from 'react';
import PropTypes from 'prop-types';

const ColumnFilter = ({onClickOpenSelectColumn}) => {
	return <button onClick={onClickOpenSelectColumn}>{'✅'}</button>;
};

ColumnFilter.propTypes = {
	onClickOpenSelectColumn: PropTypes.func.isRequired,
};

export default ColumnFilter;
