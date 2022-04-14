import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {checkIcon, checkOutlineIcon, indeterminateIcon} from '../icons/icons';

const Container = styled.div`
	display: flex;
`;

const CheckBox = styled.div`
	z-index: 0;
	margin: ${(props) => props.margin || 'auto'};
	display: flex !important;
	align-items: center;
	width: ${(props) => props.label === '' && '15px'};
	cursor: pointer;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const InputContainer = styled.div`
	line-height: 17px !important;
	svg {
		position: absolute !important;
		top: -2.5px !important;
		left: -2.5px !important;
		fill: ${(props) =>
			(props.type === 'indeterminate' && props.disabled && '#757575') ||
			(props.type === 'indeterminate' && !props.disabled && '#178082') ||
			(props.type === 'check' && '#178082') ||
			(props.type === 'checkout' && '#757575')};
		width: 15px !important;
		height: 15px !important;
		margin: 2.5px !important;
	}
`;

/**************************************************
 * seob - 체크박스 컴포넌트
 *
 * checkKey: 현재 체크박스의 key값
 * checked: 체크 상태
 * label: 체크박스 label
 * onCheck: 체크함수
 * disabled: 체크박스 disabled 여부
 ***************************************************/
const CheckComponent = ({checkKey, checked, label, onCheck, disabled}) => {
	return (
		<CheckBox
			opacity={disabled.toString()}
			label={label}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type='checkbox'
				checked={checked}
				onChange={() => onCheck(checkKey)}
			/>
			{disabled ? (
				<InputContainer
					type={'indeterminate'}
					disabled={disabled}
					className='state'
				>
					{indeterminateIcon}
					<label>{label}</label>
				</InputContainer>
			) : checked ? (
				<InputContainer type={'check'} className='state'>
					{checkIcon}
					<label>{label}</label>
				</InputContainer>
			) : (
				<InputContainer type={'checkout'} className='state'>
					{checkOutlineIcon}
					<label>{label}</label>
				</InputContainer>
			)}
		</CheckBox>
	);
};

CheckComponent.propTypes = {
	checked: PropTypes.bool,
	checkKey: PropTypes.string,
	label: PropTypes.string,
	onCheck: PropTypes.func,
	disabled: PropTypes.bool,
};

/**************************************************
 * seob - 체크박스 hook
 *
 * options: 체크박스의 label 과 key값을 객체로 갖는 배열 ex) [{label:A,value:a},{label:B,value:b},...]
 * disabled: 전체 체크박스 disabled 여부
 *
 * 
 *  * 사용예시) - 사용법 공유 이후 삭제하겠습니다.
 * 
 * const [checkedValue, CheckBox] = useCheckBox({
		options: [ // 필수항목
			{label: 'A', value: 'a'},
			{label: 'B', value: 'b'},
			{label: 'C', value: 'c'},
		],
		disabled: true, // 필수 아님
	});
 * 
 ***************************************************/
const useCheckBox = ({options, disabled = false}) => {
	// 체크된 아이템의 keys
	const [checkList, setCheckList] = useState([]);

	/**************************************************
	 * seob - 체크박스 아이템 클릭시 setCheckList하는 함수
	 *
	 * value: 클릭된 아이템의 key값
	 ***************************************************/
	const handleCheckClick = (key) => {
		checkList.includes(key)
			? // 포함되는 경우 제거
			  setCheckList((prev) => prev.filter((v) => v !== key))
			: // 포함되지 않는경우 추가
			  setCheckList((prev) => [...prev, key]);
	};

	/**************************************************
	 * seob - 체크박스 UI 컴포넌트 map으로 반환
	 ***************************************************/
	const renderChecks = () => {
		return (
			<Container>
				{options.map((c, i) => (
					<CheckComponent
						key={i}
						label={c.label}
						checkKey={c.value}
						// checkLists에 포함되는 경우 checked true
						checked={
							checkList ? checkList.includes(c.value) : false
						}
						onCheck={handleCheckClick}
						disabled={disabled}
					/>
				))}
			</Container>
		);
	};

	return [checkList, renderChecks, setCheckList];
};

useCheckBox.propTypes = {
	options: PropTypes.array.isRequired,
	disabled: PropTypes.bool,
};

export default useCheckBox;
