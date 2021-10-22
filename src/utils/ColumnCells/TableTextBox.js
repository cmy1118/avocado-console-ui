import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const TableTextBox = ({cell, isFocus = false}) => {
	const ref = useRef(null);
	const [value, setValue] = useState(cell.row.original[cell.column.id]);
	const [isOpened, setIsOpened] = useState(!value);

	const handleChange = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	const handlePressEnter = useCallback(
		(e) => {
			if (!e.target.value) return;
			if (e.keyCode === 13) {
				const data = cell.data;
				data.pop();
				data.push({
					...cell.row.original,
					[cell.column.id]: e.target.value,
				});
				if (!cell.setData) return;
				cell.setData(data);
				setIsOpened(false);
			}
		},
		[cell],
	);

	const handleBlur = useCallback(
		(e) => {
			if (!e.target.value) return;
			const data = cell.data;
			data.pop();
			data.push({
				...cell.row.original,
				[cell.column.id]: e.target.value,
			});
			if (!cell.setData) return;
			cell.setData(data);
			setIsOpened(false);
		},
		[cell],
	);

	// todo : 첫번째 input focus
	useEffect(() => {
		isFocus && value === '' && ref.current?.focus();
	}, []);

	return isOpened ? (
		<input
			ref={ref}
			type='text'
			value={value}
			onKeyUp={handlePressEnter}
			onBlur={handleBlur}
			onChange={handleChange}
		/>
	) : (
		<div onDoubleClick={() => setIsOpened(true)}>{value}</div>
	);
};

TableTextBox.propTypes = {
	cell: PropTypes.object.isRequired,
	isFocus: PropTypes.bool,
};

export default TableTextBox;
