import React, {forwardRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../RecycleComponents/New/CheckBox';

const TableAllCheckbox = forwardRef(({row, ...rest}, ref) => {
	const checkboxes = document.querySelectorAll(
		`.${rest.tablekey}[type='checkbox']`,
	);

	const handleClick = useCallback((e) => {
		console.log(row);
		console.log(e.target);
	}, []);

	return (
		<div style={{'text-align': 'center'}}>
			<input
				onClick={() => {
					handleClick;
				}}
				type='checkbox'
				// defaultChecked={row.value == "Yes" ? true : false}
				defaultChecked={() => console.log('click-rowInfo:', row)}
				// onBlur={(event) => updateMyData(parseInt(row.row.id), row.column.id, event.target.checked ? "Yes" : "No")}
			/>
		</div>
		// <CheckBox
		//     className={`${rest.id}`}
		//     // indeterminate={indeterminate}
		//     onClick={handleClick}
		//     {...rest}
		//     label={''}
		// />
	);
});

TableAllCheckbox.propTypes = {
	row: PropTypes.object,
};

export default TableAllCheckbox;
