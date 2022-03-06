import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useComboBox from '../../../hooks/useComboBox';

/**************************************************
 * seob - 테이블 콤보박스
 *
 * cell : 테이블 cell
 * setData : 테이블 setData 함수
 *
 * 사용예시는 src/components/IAM/Policy/Components/Templates/UserSessionTemplate.js에 있습니다.
 ***************************************************/
const TableComboBox = ({cell, options, setData}) => {
	const [prevValue, setPrevValue] = useState(null);
	const original = cell.row.original;
	const header = cell.row.original[cell.column.id]?.header;

	const initialValue = cell.row.original[cell.column.id];
	const [comboValue, ComboBox, setComboValue] = useComboBox({
		...(header && {header: header}),
		options: options,
	});

	useEffect(() => {
		initialValue && setComboValue(initialValue);
	}, [initialValue, setComboValue]);

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
	}, [cell.column.id, comboValue, options, original, prevValue, setData]);

	return <div>{ComboBox()}</div>;
};

TableComboBox.propTypes = {
	cell: PropTypes.object,
	setData: PropTypes.func,
	options: PropTypes.array,
};

export default TableComboBox;
