import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _Input = styled.input`
	outline: none;
	border: none;
	background: transparent;
`;

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
		isFocus && !value && ref.current.focus();
	}, [isFocus, value]);

	useEffect(() => {
		setValue(cell.value);
	}, [cell.value]);
	//
	return (
		<_Input
			autoFocus
			ref={ref}
			className={`${cell.tableKey} TableTextBox`}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

TableTextBox.propTypes = {
	cell: PropTypes.object.isRequired,
	isFocus: PropTypes.bool,
};

export default TableTextBox;
