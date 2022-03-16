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

const TableCheckBox = ({cell, setData, refs}) => {
	const indeterminate = false;

	const handleClick = useCallback(
		(e) => {
			if (e.shiftKey) {
				const currentColumnInputs = Object.entries(refs.current)
					.filter(
						([key, value]) => key.split('/')[1] === cell.column.id,
					)
					.map(([key, value]) => value);
				console.log(currentColumnInputs);
			} else {
				console.log(cell.row.original);
				console.log(cell.column.id);
				console.log(
					refs.current[`${cell.row.original.id}/${cell.column.id}`],
				);
				console.log(refs.current);

				// if (cell.column.id !== 'all') {
				// refs.current[
				// 	`${cell.row.original.id}/${cell.column.id}`
				// ].checked = !e.target.checked;
				// }
			}
		},
		[cell.column.id, cell.row.original, refs],
	);

	const handleChange = useCallback(
		(e) => {
			// memo - 전체 선택을 누른경우

			// rowChecks : 전체 check input을 제회한 나머지 check input의 dom element
			const rowChecks = Object.entries(refs.current)
				.filter(
					([key, value]) =>
						// row에 포함된 refs들 중
						key.split('/')[0] === cell.row.original.id &&
						key.split('/')[1] !== 'all',
				)
				.map(([key, value]) => value);
			if (cell.column.id === 'all') {
				// memo - 전체 선택이 되어있는 경우
				if (cell.value) {
					for (let v of rowChecks) {
						v.click();
					}
				}
				// memo - 전체 선택이 되어있지 않은 경우
				else {
					for (let v of rowChecks) {
						!v.checked && v.click();
					}
				}
			}
			// memo - 이외의 체크박스를 누른 경우
			else {
				console.log(
					'rowChecks.map((v) => v.checked) => ',
					rowChecks.map((v) => v.checked),
				);
				// isAllTrue : 전부 true인지 검사
				const isAllTrue = !rowChecks
					.map((v) => v.checked)
					.includes(false);

				// excludedCurrentEle : row의 check input ele중에서 전체 체크에 대한 ele, 현재 ele를 제외한 엘리먼트들
				const excludedCurrentEle = rowChecks.filter(
					(v) =>
						v !==
						refs.current[
							`${cell.row.original.id}/${cell.column.id}`
						],
				);

				// isExcludedTrue : 전체 input, 현재 input을 제외한 나머지가 전부 true인지 체크
				const isExcludedTrue = !excludedCurrentEle
					.map((v) => v.checked)
					.includes(false);

				console.log(isExcludedTrue);

				// memo - 기존에 나머지 체크박스 value가 전부 true인 경우
				if (isExcludedTrue && cell.value) {
					console.log(
						'기존에 나머지 체크박스 value가 전부 true인 경우',
					);
					// 전체 체크박스, 현재 체크박스 해제
					setData((data) =>
						data.map((v) => {
							if (v.id === cell.row.original.id) {
								return {
									...v,
									[cell.column.id]: !v[cell.column.id],
									all: !v.all,
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
					// 전체 체크박스, 현재 체크박스 해제
					setData((data) =>
						data.map((v) => {
							if (v.id === cell.row.original.id) {
								return {
									...v,
									[cell.column.id]: !v[cell.column.id],
									all: !v.all,
								};
							} else return v;
						}),
					);
				}
				// memo - 그 외 나머지의 경우
				else {
					console.log('그 외 나머지!');
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

			// // allInputs : 현재 row의 ref를 공유하는 모든 inputs
			// const allInputs = Object.entries(refs.current)
			// 	.filter(
			// 		([key, value]) =>
			// 			key.split('/')[0] === cell.row.original.id,
			// 	)
			// 	.map(([key, value]) => value);
			//
			// // excludedInputs : 현재 ref를 공유하는 row중, all 컬럼이 아닌 inputs
			// const excludedInputs = Object.entries(refs.current)
			// 	.filter(
			// 		([key, value]) =>
			// 			// row에 포함된 refs들 중
			// 			key.split('/')[0] === cell.row.original.id &&
			// 			key.split('/')[1] !== 'all',
			// 	)
			// 	.map(([key, value]) => value);
			//
			// //todo: 여기서부터 작업 ref.current에 직접 클릭하지 않은 경우 attribute를 추가해야 함
			//
			// const isAllTrue = !excludedInputs
			// 	.filter(
			// 		(v) =>
			// 			v !==
			// 			refs.current[
			// 				`${cell.row.original.id}/${cell.column.id}`
			// 			],
			// 	)
			// 	.map((v) => v.checked)
			// 	.includes(false);
			//
			// // 전체 선택 컬럼인경우
			// if (cell.column.id === 'all') {
			// 	// 전체 체크가 되어있는경우
			// 	if (!cell.value) {
			// 		for (let v of excludedInputs) {
			// 			!v.checked && v.click();
			// 		}
			// 	} else {
			// 		// if (
			// 		// 	!cell.value && !currentRowInputs.map((v) => v.checked).includes(false)
			// 		// ) {
			// 		console.log('isAllTrue => ', isAllTrue && e.target.checked);
			//
			// 		if (isAllTrue) {
			// 			for (let v of excludedInputs) {
			// 				v.click();
			// 			}
			// 		}
			// 		// }
			// 	}
			// } else {
			// 	if (e.target.checked) {
			// 		console.log('isAllTrue => ', isAllTrue && e.target.checked);
			//
			// 		if (isAllTrue) {
			// 			refs.current[
			// 				`${cell.row.original.id}/${'all'}`
			// 			].click();
			// 		}
			// 	} else {
			// 		if (
			// 			!excludedInputs
			// 				.filter(
			// 					(v) =>
			// 						v !==
			// 						refs.current[
			// 							`${cell.row.original.id}/${cell.column.id}`
			// 						],
			// 				)
			// 				.map((v) => v.checked)
			// 				.includes(false)
			// 		) {
			// 			refs.current[
			// 				`${cell.row.original.id}/${cell.column.id}`
			// 			].checked = true;
			// 			refs.current[
			// 				`${cell.row.original.id}/${'all'}`
			// 			].click();
			// 		}
			// 	}
			// }
		},
		[cell.column.id, cell.row.original.id, cell.value, refs, setData],
	);

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
};

export default TableCheckBox;
