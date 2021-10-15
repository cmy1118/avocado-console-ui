import React, {forwardRef, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	const selectedArr = currentTarget[rest.tablekey] || [];

	const customRest = {
		...rest,
		checked:
			rest.title === 'Toggle All Current Page Rows Selected'
				? rest.checked
				: selectedArr.includes(rest.row?.id),
	};

	const handleClick = (e) => {
		// e.stopPropagation();
	};

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<input
			type='checkbox'
			onClick={handleClick}
			ref={resolvedRef}
			{...customRest}
		/>
	);
});

TableCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
