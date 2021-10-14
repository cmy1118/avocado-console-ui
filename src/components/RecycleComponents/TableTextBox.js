import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

const TableTextBox = ({cellObj, onSubmit}) => {
	const dispatch = useDispatch();
	const ref = useRef(null);
	const [isOpenInput, setIsOpenInput] = useState(!cellObj.value);
	const [value, setValue] = useState(cellObj.value);

	const onChange = useCallback(
		(e) => {
			setValue(e.target.value);
		},
		[setValue],
	);

	const onBlur = useCallback(
		(e) => {
			const originalData = cellObj.data;
			const index = originalData.findIndex(
				(v) => v.id === cellObj.row.original.id,
			);
			const editedData = {
				...cellObj.row.original,
				[cellObj.column.id]: e.target.value,
			};
			const changedData = originalData.slice();
			changedData.splice(index, 1, editedData);
			dispatch(onSubmit(changedData));
			setIsOpenInput(false);
		},
		[cellObj, dispatch, onSubmit],
	);

	useEffect(() => {
		setValue(cellObj.value);
		!cellObj.value && setIsOpenInput(true);
	}, [cellObj]);

	useEffect(() => {
		if (cellObj.column.Header === cellObj.columns[0].Header)
			ref.current?.focus();
	}, [cellObj.column.Header, cellObj.columns]);

	return isOpenInput ? (
		<input
			ref={ref}
			type={typeof cellObj.value}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	) : (
		<div onDoubleClick={() => setIsOpenInput(true)}>{value}</div>
	);
};

TableTextBox.propTypes = {
	cellObj: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default TableTextBox;
