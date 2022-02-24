import React, {forwardRef, memo, useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../RecycleComponents/New/CheckBox';
import {tableKeys} from '../../../Constants/Table/keys';

// eslint-disable-next-line react/display-name
const TableAllCheckbox = ({
	row,
	cell,
	tableKey,
	setChildCheck,
	isAllCheck = false,
}) => {
	const checkInput = useRef();
	const [check, setCheck] = useState(false);
	const [inputs, setInputs] = useState({
		id: '',
		target: '',
	});
	const {id, target} = inputs; // 비구조화 할당을 통해 값 추출

	const handleOnChange = useCallback((e) => {
		setCheck(true);
	}, []);

	//checkboc check시 이벤트 헨들러
	const handleOnClick = useCallback(
		(e) => {
			//자식이 하나라도 누르지 않았으면 전체 선택 해제
			if (!e.target.checked) {
				console.log('🟪자식클림됨 ChildCheck:false');
				setChildCheck(false);
			}
			setCheck(!check);
			// setChildCheck(true);
			const element = e.target.parentNode.parentNode.parentNode.querySelector(
				`.${tableKey}[type='checkbox']`,
			);
			const allElement = e.target.parentNode.parentNode.parentNode.querySelectorAll(
				`input[type="checkbox"]:not(.${tableKey})`,
			);

			// console.log('전체체크 :', element);
			// console.log('전체체크 상태:', element.checked);
			console.log('🔶자식체크 상태:', e.target.checked);
			console.log('🔶자식체크 상태:', e.element);
			console.log('🔶자식체크 상태:', e.target);

			if (element.checked === check) {
				element.click();
				// setChildCheck(false);
			}
			console.log('🔶allElement:', allElement);

			// if (allElement) {
			// 	let UncheckedNum = 0;
			// 	allElement.forEach((checkbox) => {
			// 		//체크 되지 않은것들
			// 		if (!checkbox.checked) {
			// 			UncheckedNum++;
			// 		}
			// 		// setChildCheck(true);
			// 	});
			// 	console.log('🔴현재체크되지않은 child 개수 :', UncheckedNum);
			// 	console.log('🔴부모 전체체크 상태  :', element.checked);
			// 	if (element.checked && UncheckedNum === 1) {
			// 		setChildCheck(false);
			// 	} else {
			// 		setChildCheck(true);
			// 	}
			// 	UncheckedNum = 0;
			// }
			console.log('present:', e.target.parentNode.parentNode.parentNode);
			// setChildCheck(true);
		},
		[check, setChildCheck, tableKey],
	);

	const handleClick = useCallback((e) => {}, []);

	return (
		// <div style={{'text-align': 'center'}}>
		// 	<input
		// 		className={check}
		// 		ref={checkInput}
		// 		onChange={(e) => {
		// 			handleOnChange(e);
		// 		}}
		// 		onClick={(e) => {
		// 			handleOnClick(e);
		// 		}}
		// 		type='checkbox'
		// 	/>
		// </div>
		<CheckBox
			// className={`${rest.id}`}
			className={tableKeys}
			checked={check}
			// indeterminate={indeterminate}
			onClick={(e) => handleOnClick(e)}
			label={''}
		/>
	);
};

TableAllCheckbox.propTypes = {
	row: PropTypes.object,
	cell: PropTypes.object,
	isAllCheck: PropTypes.bool,
	tableKey: PropTypes.string,
	setChildCheck: PropTypes.bool,
};

export default memo(TableAllCheckbox);
