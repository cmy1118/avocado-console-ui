import React, {useEffect, useState} from 'react';
import useSelection from '../../hooks/table/useSelection';

const useSelectColumn = (column, data) => {
	const [select, clear, selectionColumn] = useSelection();
	const [prevData, setPrevData] = useState([]);
	let returnColumn = [selectionColumn, ...column];

	useEffect(() => {
		if (prevData !== data) {
			setPrevData(data);
			clear();
		}
	}, [clear, data, prevData]);

	return [select, returnColumn, clear];
};

export default useSelectColumn;
