import React, {useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckBox from '../RecycleComponents/ReactHookForm/CheckBox';

const _CheckboxContainer = styled.div`
	height: 32px;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;
// eslint-disable-next-line react/display-name
const SearchOptionsContextMenu = ({allColumns}) => {
	const allOptions = useMemo(() => {
		return allColumns.filter(
			(v) =>
				Object.prototype.hasOwnProperty.call(v, 'filter') &&
				v.isVisible === true,
		);
	}, [allColumns]);

	return (
		<>
			{allOptions.map((column) => (
				<_CheckboxContainer key={column.id}>
					<CheckBox
						name={'searchFilters'}
						value={column.id}
						label={column.Header}
					/>
				</_CheckboxContainer>
			))}
		</>
	);
};
SearchOptionsContextMenu.propTypes = {
	allColumns: PropTypes.array.isRequired,
};
export default SearchOptionsContextMenu;
