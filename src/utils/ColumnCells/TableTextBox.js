import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

const TableTextBox = ({cell}) => {
	const ref = useRef(null);

	// const [isOpenInput, setIsOpenInput] = useState(!props.value);
	const [value, setValue] = useState(cell.row.original.value);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handlePressEnter = useCallback(
		(e) => {
			if (e.keyCode === 13) {
				console.log(e.target.value);
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

	// const onChange = useCallback(
	// 	(e) => {
	// setValue(e.target.value);
	// },
	// [setValue],
	// );

	// const onBlur = useCallback(
	// 	(e) => {
	// 		const originalData = props.data;
	// 		const index = originalData.findIndex(
	// 			(v) => v.id === props.row.original.id,
	// 		);
	// 		const editedData = {
	// 			...props.row.original,
	// 			[props.column.id]: e.target.value,
	// 		};
	// 		const changedData = originalData.slice();
	// 		changedData.splice(index, 1, editedData);
	// 		console.log(changedData);
	// 		dispatch(onSubmit(changedData));
	// 		setIsOpenInput(false);
	// 	},
	// 	[props, dispatch, onSubmit],
	// );

	// useEffect(() => {
	// 	setValue(props.value);
	// 	!props.value && setIsOpenInput(true);
	// }, [props]);
	//
	// useEffect(() => {
	// 	if (props.column.Header === props.columns[0].Header) {
	// 		todo : table 의 첫번째 input cell 에 focus 되어야 함.
	// 		if (!props.value) {
	// ref.current?.focus();
	// }
	// }, [props]);
	return (
		<input
			type='text'
			value={value}
			onKeyUp={handlePressEnter}
			onBlur={handleBlur}
			onChange={handleChange}
		/>
	);

	// return isOpenInput ? (
	// 	<input
	// 		ref={ref}
	// 		type={typeof props.value}
	// 		value={value}
	// 		onChange={onChange}
	// 		onBlur={onBlur}
	// />
	// ) : (
	// 	<div onDoubleClick={() => setIsOpenInput(true)}>{value}</div>
	// );
};

TableTextBox.propTypes = {
	cell: PropTypes.object.isRequired,
	setData: PropTypes.func,
};

export default TableTextBox;
