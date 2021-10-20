import React, {forwardRef, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const checkboxes = document.querySelectorAll(`.${rest.tablekey}`);
	// console.log(`.${rest.tablekey} input[type='checkbox']`);

	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	const handleClick = useCallback(
		async (e) => {
			let inBetween = false;

			// checkboxes.forEach((checkbox) => {
			// 	if (checkbox.lastChecked && checkbox !== e.target) {
			// 		console.log('Last Target!!:::', checkbox);
			// 	}
			// });
			if (e.shiftKey) {
				await checkboxes.forEach((checkbox) => {
					if (checkbox === e.target || checkbox.lastChecked) {
						console.log('open/close');
						inBetween = !inBetween;
					}

					if (inBetween) {
						if (e.target.lastChecked) {
							console.log('in Between!! & lastChecked!!');
							inBetween = !inBetween;
						} else {
							console.log('in Between!!:::', checkbox);
							if (checkbox.lastChecked)
								console.log('last checked', checkbox);
							if (
								checkbox !== e.target &&
								!checkbox.lastChecked
							) {
								checkbox.isBetween = true;
								checkbox.click();
								// if (!checkbox.checked) {
								// 	checkbox.click();
								// }
							}
						}
					}
				});
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
