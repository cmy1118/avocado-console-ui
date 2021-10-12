import React, {useCallback, useEffect, useState} from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

const TableTextBox = ({obj}) => {
	const [value, setValue] = useState(obj.value);

	const onChange = useCallback(
		(e) => {
			setValue(e.target.value);
		},
		[setValue],
	);

	const onBlur = useCallback(
		(e) => {
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
		},
		[obj],
	);

	useEffect(() => {
		setValue(obj.value);
	}, [obj]);

	return (
		<input
			type={typeof obj.value}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

TableTextBox.propTypes = {
	obj: PropTypes.object.isRequired,
};

export default TableTextBox;
