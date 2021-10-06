import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const EditableCell = ({
	value: initialValue,
	row: {index},
	column: {id},
	updateData,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		console.log();
		setValue(e.target.value);
	};
	const onBlur = () => {
		// updateFunc(index, id, value);
		console.log(value);
		console.log(initialValue, index, id);
		// updateData();
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

EditableCell.propTypes = {
	value: PropTypes.any,
	row: PropTypes.any,
	column: PropTypes.any,
	updateData: PropTypes.func,
};

export default EditableCell;
