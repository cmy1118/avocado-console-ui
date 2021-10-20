import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const checkboxes = document.querySelectorAll(`.${rest.tablekey}`);
	// console.log(`.${rest.tablekey} input[type='checkbox']`);

	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	const handleClick = useCallback(
		(e) => {
			let inBetween = false;

			checkboxes.forEach((checkbox) => {
				if (checkbox.lastChecked)
					console.log('Last Target!!:::', e.target);
			});
			if (e.shiftKey && e.target.checked) {
				checkboxes.forEach((checkbox) => {
					if (
						checkbox === e.target ||
						checkbox.lastChecked === true
					) {
						inBetween = !inBetween;
					}
					if (inBetween) {
						console.log('in Between!!:::', checkbox);
						if (
							checkbox !== e.target &&
							checkbox.lastChecked !== true
						) {
							checkbox.isBetween = true;
							checkbox.click();
						}
					}
					delete checkbox.lastChecked;
				});
			}
			if (!e.target.isBetween) e.target.lastChecked = true;
			delete e.target.isBetween;
		},
		[checkboxes],
	);

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<input
			className={rest.tablekey}
			type='checkbox'
			onClick={handleClick}
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
