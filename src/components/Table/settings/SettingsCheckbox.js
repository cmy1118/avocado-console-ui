import React, {forwardRef, useEffect} from 'react';

// eslint-disable-next-line react/display-name,react/prop-types
const SettingsCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = React.useRef();
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

export default SettingsCheckbox;
