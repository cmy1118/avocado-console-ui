import React, {forwardRef, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = useRef();

	const [selectedRowIds, setSelectedRowIds] = useState([]);
	const [lastId, setLastId] = useState(null);

	const [value, setValue] = useState(false);
	// console.log(rest?.row); // index, isSelected
	// console.log(rest.selected);

	const resolvedRef = ref || defaultRef;

	// console.log(selectedRowIds);

	useEffect(() => {
		const index = selectedRowIds.filter((v, i) => {
			if (rest.selected[i] !== v) return i;
		});

		if (index) {
			// console.log(index);
			setSelectedRowIds(rest.selected);
		}
	}, [rest.selected, selectedRowIds]);

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<input
			type='checkbox'
			// onClick={handleClick}
			ref={resolvedRef}
			{...rest}
		/>
	);
});

TableCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
