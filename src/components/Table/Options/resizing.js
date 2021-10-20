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
		async (e) => {
			let inBetween = false;

			if (e.shiftKey) {
				await checkboxes.forEach((checkbox) => {
					if (checkbox === e.target) {
						if (!inBetween) console.log('open / e.target');
						if (inBetween) console.log('close / e.target');
						inBetween = !inBetween;
						// if (!checkbox.checked) inBetween = false;
					}
					if (checkbox.lastChecked) {
						if (!inBetween) console.log('open / last');
						if (inBetween) console.log('close / last');
						inBetween = !inBetween;
						// if (!checkbox.checked) inBetween = false;
					}
					if (inBetween) {
						if (checkbox === e.target) {
							console.log(
								'in Between - checkbox === e.target :::',
								checkbox,
							);
							// checkbox.isBetween = true;
							// inBetween = !inBetween;
							// checkbox.click();
						} else if (checkbox.lastChecked) {
							console.log(
								'in Between - lastChecked :::',
								checkbox,
							);
							if (checkbox.isShift) {
								if (checkbox === e.target) {
									checkbox.click();
									delete checkbox.lastChecked;
								} else if (!checkbox.checked) {
									checkbox.click();
									// inBetween = !inBetween;
								}
								delete checkbox.isShift;
							} else {
								console.log(
									'in Between - lastChecked - no shift :::',
									checkbox,
								);
							}
						} else {
							console.log('just in Between!!:::', checkbox);
							checkbox.isBetween = true;
							// if (!checkbox.checked)
							checkbox.click();
						}
					} else {
						if (checkbox.lastChecked) {
							console.log(checkbox.isShift);
							if (checkbox.isShift) {
								if (checkbox === e.target) {
									checkbox.click();
									delete checkbox.lastChecked;
								} else if (!checkbox.checked) checkbox.click();
								delete checkbox.isShift;
							} else {
								console.log('out Between last!! :::', checkbox);
								// checkbox.click();
							}
							delete checkbox.lastChecked;
						} else if (checkbox === e.target) {
							console.log('checkbox is e.target!!');
							console.log('checkbox is e.target!!');
							console.log('checkbox is e.target!!');
						} else {
							console.log(checkbox);
						}
					}
				});
				let isLastChecked = false;
				checkboxes.forEach((checkbox) => {
					if (checkbox.lastChecked) isLastChecked = true;
				});
				if (isLastChecked) e.target.isShift = true;
			}
			if (!e.target.isBetween) {
				await checkboxes.forEach((checkbox) => {
					delete checkbox.lastChecked;
				});
				e.target.lastChecked = true;
			}
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
