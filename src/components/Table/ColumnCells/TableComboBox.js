import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useComboBox from '../../../hooks/useComboBox';

/**************************************************
 * seob - 테이블 콤보박스
 *
 * cell : 테이블 cell
 * setData : 테이블 setData 함수
 * options : 콤보박스 옵션
 ***************************************************/
const TableComboBox = ({cell, options, setData}) => {
	const [prevValue, setPrevValue] = useState(null);
	const original = cell.row.original;
	const header = cell.row.original[cell.column.id]?.header;

	const [comboValue, ComboBox, setComboValue] = useComboBox({
		...(header && {header: header}),
		options: options,
	});

	const initialValue = cell.row.original[cell.column.id];

	useEffect(() => {
		initialValue && setComboValue(initialValue);
	}, [initialValue, setComboValue]); // 초기에 1번만 실행하므로 deps는 빈값입니다.

	// 콤보박스 값의 변화가 있으면 새로 바뀐 값을 setData
	useEffect(() => {
		setPrevValue(comboValue);
		if (prevValue && prevValue !== comboValue) {
			setData((prev) =>
				prev.map((v) =>
					v !== original
						? v
						: {
								...original,
								[cell.column.id]: comboValue,
						  },
				),
			);
		}
	}, [cell.column.id, comboValue, original, prevValue, setData]);

	return <div>{ComboBox()}</div>;
};

TableComboBox.propTypes = {
	cell: PropTypes.object,
	setData: PropTypes.func,
	options: PropTypes.array,
};

export default TableComboBox;
