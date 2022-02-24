import React from 'react';
import TableCheckbox from './Options/TableCheckbox';
import PropTypes from 'prop-types';

/**************************************************
 * seob717 - 테이블의 체크 박스 column
 **************************************************/
const checkboxColumn = ({
	id,
	accessor,
	header = null,
	tableKey,
	disabled = false,
	allCheck,
	setAllCheck,
	// 자식이 선택되었는 지 유무 state
	childCheck = true,
	setChildCheck,
}) => {
	console.log('🟣checkboxColumn-childCheck:', childCheck);
	return {
		accessor: accessor ? accessor : 'isDefault',
		id: id ? id : 'selection',
		Header: header
			? header
			: // eslint-disable-next-line react/prop-types,react/display-name
			  ({getToggleAllPageRowsSelectedProps}) => {
					return (
						<TableCheckbox
							{...getToggleAllPageRowsSelectedProps()}
							disabled={disabled}
							tablekey={tableKey}
						/>
					);
			  },
		// eslint-disable-next-line react/prop-types,react/display-name
		Cell: ({row}) => {
			// console.log('✅:', row);
			return (
				<TableCheckbox
					// eslint-disable-next-line react/prop-types,react/display-name
					{...row.getToggleRowSelectedProps()}
					row={row}
					disabled={disabled}
					tablekey={tableKey}
					allCheck={allCheck}
					setAllCheck={setAllCheck}
					childCheck={childCheck}
					setChildCheck={setChildCheck}
				/>
			);
		},
		customWidth: 40,
	};
};

checkboxColumn.propTypes = {
	id: PropTypes.object,
	accessor: PropTypes.string,
	header: PropTypes.string,
	tableKey: PropTypes.object,
	disabled: PropTypes.bool,
	allCheck: PropTypes.bool,
	setAllCheck: PropTypes.func,
	childCheck: PropTypes.bool,
	setChildCheck: PropTypes.func,
};

export default checkboxColumn;
