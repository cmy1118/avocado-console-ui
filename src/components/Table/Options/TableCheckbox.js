import React, {forwardRef, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = useRef();
	// console.log(rest);
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return <input type='checkbox' ref={resolvedRef} {...rest} />;
});

TableCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
