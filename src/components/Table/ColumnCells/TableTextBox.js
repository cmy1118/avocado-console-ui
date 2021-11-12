import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const TableTextBox = ({cell, isFocus}) => {
	const [value, setValue] = useState(cell.value);
	const ref = useRef(null);
	const [isOpened, setIsOpened] = useState(!value);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		cell.updateMyData(cell.row.index, cell.column.id, value);
	};

	useEffect(() => {
		isFocus && !value && ref.current;
	}, [isFocus, value]);

	useEffect(() => {
		setValue(cell.value);
	}, [cell.value]);
	//
	return (
		<input ref={ref} value={value} onChange={onChange} onBlur={onBlur} />
	);
};

TableTextBox.propTypes = {
	cell: PropTypes.object.isRequired,
	isFocus: PropTypes.bool,
};

export default TableTextBox;
