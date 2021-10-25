import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {tableSearchSelectOptions} from '../../../../utils/data';

const placeholders = {
	status: '계정상태',
	authType: '인증유형',
	MFA: 'MFA',
};

const SearchSelectionOption = ({column: {filterValue, setFilter, id}}) => {
	const onChangeOption = useCallback(
		(e) => {
			setFilter(e.target.value);
		},
		[setFilter],
	);

	return (
		<select
			required
			value={filterValue}
			onChange={onChangeOption}
			defaultValue='defaultValue'
		>
			<option value='defaultValue' disabled hidden>
				{placeholders[id]}
			</option>
			{tableSearchSelectOptions[id].map((v, i) => (
				<option key={i} value={v.value}>
					{v.label}
				</option>
			))}
		</select>
	);
};

SearchSelectionOption.propTypes = {column: PropTypes.object.isRequired};

export default SearchSelectionOption;
