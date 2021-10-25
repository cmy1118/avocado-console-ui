import React from 'react';
import PropTypes from 'prop-types';

function Search({onSubmit}) {
	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(event.target.elements.filter.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name='filter' />
			<button>Search</button>
		</form>
	);
}
Search.propTypes = {
	onSubmit: PropTypes.func,
};
export default Search;
