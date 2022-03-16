import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';

const _Container = styled.div`
	z-index: 0;
	margin: ${(props) => props.margin || 'auto'};
	display: flex !important;
	align-items: center;
	width: ${(props) => props.label === '' && '15px'};
	cursor: pointer;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
	width: 15px;
`;

const InputContainer = styled.div`
	line-height: 17px !important;
	width: 15px;
	height: 15px;
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

const TableCheckBox = ({
	cell,
	setData,
	refs,
	allCheckKey,
	lastChecked,
	setLastChecked,
}) => {
	// 부분선택 유무 (현재는 사용하지 않음)
	const [indeterminate, setIndeterminate] = useState(false);

	/**************************************************
	 * seob - click에 따른 setData를 처리하는 이벤트 함수
	 ***************************************************/
	const handleSetData = useCallback(() => {
		// rowChecks : 전체 check input을 제회한 나머지 check input의 dom element
		const rowChecks = Object.entries(refs.current)
			.filter(
				([key, value]) =>
					// row에 포함된 refs들 중
					key.split('/')[0] === cell.row.original.id &&
					key.split('/')[1] !== allCheckKey,
			)
			.map(([key, value]) => value);

		// memo - 전체 선택을 누른경우
		if (cell.column.id === allCheckKey) {
			// memo - 전체 선택이 되어있는 경우
			if (cell.value) {
				for (let v of rowChecks) {
					v.click();
				}
			}
			// memo - 전체 선택이 되어있지 않은 경우
			else {
				for (let v of rowChecks) {
					// 체크되지 않은 input만 click
					!v.checked && v.click();
				}
			}
			// memo - lastChecked 수정
			if (cell.column.id === allCheckKey) {
				setLastChecked(
					refs.current[`${cell.row.original.id}/${cell.column.id}`],
				);
			}
		}
		// memo - 이외의 체크박스를 누른 경우
		else {
			// excludedCurrentEle : row의 check input ele중에서 전체 체크에 대한 ele, 현재 ele를 제외한 엘리먼트들
			const excludedCurrentEle = rowChecks.filter(
				(v) =>
					v !==
					refs.current[`${cell.row.original.id}/${cell.column.id}`],
			);

			// isExcludedTrue : 전체 input, 현재 input을 제외한 나머지가 전부 true인지 체크
			const isExcludedTrue = !excludedCurrentEle
				.map((v) => v.checked)
				.includes(false);

			// memo - 기존에 나머지 체크박스 value가 전부 true인 경우
			if (isExcludedTrue && cell.value) {
				console.log('기존에 나머지 체크박스 value가 전부 true인 경우');
				// 전체 체크박스, 현재 체크박스 해제
				setData((data) =>
					data.map((v) => {
						if (v.id === cell.row.original.id) {
							return {
								...v,
								[cell.column.id]: !v[cell.column.id],
								[allCheckKey]: !v[allCheckKey],
							};
						} else return v;
					}),
				);
			}
			// memo - 현재 체크박스 클릭시 전체 체크박스가 true가 되는경우
			else if (isExcludedTrue && !cell.value) {
				console.log(
					'현재 체크박스 클릭시 전체 체크박스가 true가 되는경우',
				);

				// 전체 체크박스, 현재 체크박스 체크
				setData((data) =>
					data.map((v) => {
						if (v.id === cell.row.original.id) {
							return {
								...v,
								[cell.column.id]: !v[cell.column.id],
								[allCheckKey]: !v[allCheckKey],
							};
						} else return v;
					}),
				);
			}
			// memo - 그 외 나머지의 경우
			else {
				console.log('그 외 나머지의 경우');
				// 현재 input에 해당하는 ele만 체크 및 해제
				setData((data) =>
					data.map((v) => {
						if (v.id === cell.row.original.id) {
							return {
								...v,
								[cell.column.id]: !v[cell.column.id],
							};
						} else return v;
					}),
				);
			}
		}
	}, [
		allCheckKey,
		cell.column.id,
		cell.row.original.id,
		cell.value,
		refs,
		setData,
		setLastChecked,
	]);

	/**************************************************
	 * seob - 체크박스 클릭 이벤트 처리함수
	 ***************************************************/
	const handleClick = useCallback(
		(e) => {
			// memo - shiftKey를 누른 대상이 전체 체크 input인 경우 ( 나머지 input은 shiftKey 적용 X )
			if (e.shiftKey) {
				if (cell.column.id === allCheckKey) {
					// memo - lastChecked 값이 존재하는 경우
					if (lastChecked) {
						const currentColumnInputs = Object.entries(refs.current)
							.filter(
								([key, value]) =>
									key.split('/')[1] === cell.column.id,
							)
							.map(([key, value]) => value);
						console.log(currentColumnInputs);
						let isBetween = false;
						for (let v of currentColumnInputs) {
							if (
								v === lastChecked ||
								v ===
									refs.current[
										`${cell.row.original.id}/${cell.column.id}`
									]
							) {
								isBetween = !isBetween;
							}
							if (isBetween) {
								console.log(v);
							}
						}
					}
					// memo - lastChecked 값이 존재하지 않는 경우
					else {
						handleSetData();
					}
				}
			}
			// memo - shiftKey를 누르지 않은경우
			else {
				console.log(' memo - shiftKey를 누르지 않은경우');
				handleSetData();
			}
		},
		[allCheckKey, cell.column.id, handleSetData, lastChecked, refs],
	);

	const handleChange = useCallback(() => {
		// input에서 checked를 사용하면 onChange가 있어야 하므로 우선 함수만 생성했습니다.
	}, []);

	// memo - indeterminate 작업 필요시 진행 예정
	// console.log('indeterminate => ', indeterminate);
	//
	// useEffect(() => {
	// 	console.log(cell.value);
	// 	const rowChecks = Object.entries(refs.current)
	// 		.filter(
	// 			([key, value]) =>
	// 				// row에 포함된 refs들 중
	// 				key.split('/')[0] === cell.row.original.id &&
	// 				key.split('/')[1] !== allCheckKey,
	// 		)
	// 		.map(([key, value]) => value);
	// 	// memo - true, false가 섞여있는 경우 (부분 체크된 경우) indeterminate => true
	// 	if (
	// 		rowChecks.map((v) => v.checked).includes(false) &&
	// 		rowChecks.map((v) => v.checked).includes(true) &&
	// 		cell.column.id === allCheckKey
	// 	) {
	// 		setIndeterminate(true);
	// 	}
	// 	// memo - 전체 선택이거나 전체 해제인 경우 indeterminate => false
	// 	else if (
	// 		(!rowChecks.map((v) => v.checked).includes(false) &&
	// 			cell.column.id === allCheckKey) ||
	// 		(!rowChecks.map((v) => v.checked).includes(true) &&
	// 			cell.column.id === allCheckKey)
	// 	) {
	// 		setIndeterminate(false);
	// 	}
	// }, [allCheckKey, cell.column.id, cell.row.original.id, cell.value, refs]);

	return (
		<_Container
			// opacity={disabled.toString()}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type='checkbox'
				checked={cell.value}
				onChange={handleChange}
				onClick={handleClick}
				// checked={checked} {...props}
				{...(refs && {
					ref: (ele) =>
						(refs.current[
							`${cell.row.original.id}/${cell.column.id}`
						] = ele),
				})}
			/>
			{indeterminate ? (
				<InputContainer
					type={'indeterminate'}
					// disabled={disabled}
					className='state'
				>
					{indeterminateIcon}
				</InputContainer>
			) : cell.value ? (
				<InputContainer type={'check'} className='state'>
					{checkIcon}
				</InputContainer>
			) : (
				<InputContainer type={'checkout'} className='state'>
					{checkOutlineIcon}
				</InputContainer>
			)}
		</_Container>
	);
};

TableCheckBox.propTypes = {
	cell: PropTypes.object,
	setData: PropTypes.func,
	refs: PropTypes.object,
	allCheckKey: PropTypes.string,
	lastChecked: PropTypes.object,
	setLastChecked: PropTypes.func,
};

export default TableCheckBox;
