import React from 'react';
import useSelection from '../../hooks/table/useSelection';

const useSelectColumn = (column) => {
	const [select, selectionColumn] = useSelection();
	let returnColumn = [selectionColumn, ...column];

	return [select, returnColumn];
};

export default useSelectColumn;
