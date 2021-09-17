import React, {forwardRef, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const SettingsCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<input type='checkbox' ref={resolvedRef} {...rest} />
		</>
	);
});

SettingsCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

SettingsCheckbox.displayName = 'SettingsCheckbox';

export default SettingsCheckbox;
