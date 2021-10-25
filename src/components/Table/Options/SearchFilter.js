import React from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({onClickOpen}) => {
	return <button onClick={onClickOpen}>{'✅'}</button>;
};

SearchFilter.propTypes = {
	onClickOpen: PropTypes.func.isRequired,
};

export default SearchFilter;
