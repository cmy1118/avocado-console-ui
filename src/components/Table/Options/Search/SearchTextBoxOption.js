import React, {useCallback} from 'react';

import PropTypes from 'prop-types';

const placeholders = {
	passwordExpiryTime: '비밀번호 수명',
};

const SearchTextBoxOption = ({column: {filterValue, setFilter, id}}) => {
	const onChangeOption = useCallback(
		(e) => {
			if (e.target.value === '') setFilter(undefined);
			else setFilter(e.target.value);
		},
		[setFilter],
	);

	return (
		<div>
			<input
				type='number'
				placeholder={placeholders[id]}
				value={filterValue || ''}
				onChange={onChangeOption}
			/>
			일전
		</div>
	);
};

SearchTextBoxOption.propTypes = {column: PropTypes.object.isRequired};

export default SearchTextBoxOption;
