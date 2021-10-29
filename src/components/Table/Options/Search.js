import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../../RecycleComponents/SearchInput';

function Search({tableKey}) {
	const [value, setValue] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('api');
		console.log({tableKey, value});
	};

	const onChangeSetValue = useCallback((e) => {
		setValue(e.target.value);
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<SearchInput value={value} onChange={onChangeSetValue} />
		</form>
	);
}
Search.propTypes = {
	tableKey: PropTypes.string,
};
export default Search;
