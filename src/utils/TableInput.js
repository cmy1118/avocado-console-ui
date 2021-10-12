import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

const TableInput = ({obj}) => {
	const [value, setValue] = useState(obj.value);
	console.log(obj);
	const onChange = (e) => {
		setValue(e.target.value);
	};
	const onBlur = (e) => {
		console.log(obj.column.id);
		console.log(obj.row.original);
		const originalData = obj.data;
		const index = originalData.findIndex(
			(v) =>
				v.id === obj.row.original.id &&
				v.name === obj.row.original.name,
		);
		const editedData = {
			...obj.row.original,
			[obj.column.id]: e.target.value,
		};
		originalData.splice(index, 1, editedData);
		console.log(originalData);
	};
	useEffect(() => {
		setValue(obj.value);
	}, [obj]);

	return (
		<input
			// style={{border: 'none'}}
			type={typeof obj.value}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

TableInput.propTypes = {
	obj: PropTypes.object.isRequired,
};

export default TableInput;
