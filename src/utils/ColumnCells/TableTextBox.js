import React, {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const TableTextBox = ({cell}) => {
	const ref = useRef(null);
	const [value, setValue] = useState(cell.row.original[cell.column.id]);

	const handleChange = useCallback((e) => {
		setValue(e.target.value);
	}, []);

	const handlePressEnter = useCallback(
		(e) => {
			if (e.keyCode === 13) {
				cell.setData([
					...cell.data.filter((v) => v.id !== cell.row.original.id),
					{...cell.row.original, [cell.column.id]: e.target.value},
				]);
			}
		},
		[cell],
	);

	const handleBlur = useCallback(
		(e) => {
			cell.setData([
				...cell.data.filter((v) => v.id !== cell.row.original.id),
				{...cell.row.original, [cell.column.id]: e.target.value},
			]);
		},
		[cell],
	);

	// todo : 첫번째 input focus
	// useEffect(() => {
	// ref.current?.focus();
	// }, []);

	return (
		<input
			ref={ref}
			type='text'
			value={value}
			onKeyUp={handlePressEnter}
			onBlur={handleBlur}
			onChange={handleChange}
		/>
	);
};

TableTextBox.propTypes = {
	cell: PropTypes.object.isRequired,
};

export default TableTextBox;
