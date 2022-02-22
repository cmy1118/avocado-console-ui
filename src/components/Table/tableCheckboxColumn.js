import React from 'react';
import TableCheckbox from './Options/TableCheckbox';

/**************************************************
 * seob717 - 테이블의 체크 박스 column
 **************************************************/
const checkboxColumn = ({
	id,
	accessor,
	header = null,
	tableKey,
	disabled = false,
	// 자식이 선택되었는 지 유무 state
	childCheck = false,
}) => {
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
					childCheck={childCheck}
				/>
			);
		},
		customWidth: 40,
	};
};

export default checkboxColumn;
