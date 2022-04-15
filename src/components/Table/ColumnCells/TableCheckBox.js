import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../../icons/icons';
import {DRAGGABLE_KEY} from '../../../Constants/Table/keys';

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
	cursor: ${(props) => props.disabled && `default`};
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
 * seob - shiftKey를 누르고 체크박스를 클릭한 경우 이전 클릭과 현재 클릭 사이의 체크박스를 핸들링 하기위한 처리 과정
 ***************************************************/
const PROCESS_STATE = {
	READY: 'ready', // 처리 준비
	RUNNING: 'running', // 처리 중
	WAITING: 'waiting', // 마지막 값 처리 중
	TERMINATED: 'terminated', // 처리 완료
};

/**************************************************
 * seob - 이전 클릭과 현재 클릭사이 체크박스를 핸들링 하기위한 처리의 키(시작점)가 되는 변수
 ***************************************************/
const START_KEY = {
	LAST: 'last', // 이전 키
	CURRENT: 'current', // 현재 키
};

/**************************************************
 * seob - 테이블 컬럼의 Cell 컴포넌트
 *
 * cell : 테이블 셀
 * setData : 테이블 정보를 수정할 setData
 * refs : 체크박스 element를 가져오기 위한 ref 배열
 * allCheckKey : 컬럼중 전체 선택 체크박스 accessor
 * lastCheckedKey : 마지막에 클릭한 ref.current의 키 값
 * setLastCheckedKey : lastCheckedKey set 함수
 ***************************************************/
const TableCheckBox = ({
	cell,
	setData,
	refs,
	allCheckKey,
	lastCheckedKey,
	setLastCheckedKey,
}) => {
	// 부분선택 유무 (현재는 사용하지 않음)
	const [indeterminate, setIndeterminate] = useState(false);

	/**************************************************
	 * seob - click에 따른 setData를 처리하는 이벤트 함수
	 ***************************************************/
	const handleSetData = useCallback(() => {
		if (cell.value === null) return;
		// allCheckKey prop이 없는경우 기본 클릭동작
		if (!allCheckKey) {
			setData((data) =>
				data.map((v) => {
					if (v[DRAGGABLE_KEY] === cell.row.original[DRAGGABLE_KEY]) {
						return {
							...v,
							[cell.column.id]: !v[cell.column.id],
						};
					} else return v;
				}),
			);
			return;
		}

		// rowChecks : 전체 check input을 제회한 나머지 check input의 dom element
		const rowChecks = Object.entries(refs.current)
			.filter(
				([key, value]) =>
					// row에 포함된 refs들 중
					key.split('/')[0] === cell.row.original[DRAGGABLE_KEY] &&
					key.split('/')[1] !== allCheckKey,
			)
			.map(([key, value]) => value);

		// 전체 선택을 누른경우
		if (cell.column.id === allCheckKey) {
			// 전체 선택이 되어있는 경우
			if (cell.value) {
				for (let v of rowChecks) {
					v.click();
				}
			}
			// 전체 선택이 되어있지 않은 경우
			else {
				for (let v of rowChecks) {
					// 체크되지 않은 input만 click
					!v.checked && v.click();
				}
			}
			// lastCheckedKey 수정
			if (cell.column.id === allCheckKey) {
				setLastCheckedKey(`${cell.row.index}/${cell.column.id}`);
			}
		}
		// 이외의 체크박스를 누른 경우
		else {
			// excludedCurrentEle : row의 check input ele중에서 전체 체크에 대한 ele, 현재 ele를 제외한 엘리먼트들
			const excludedCurrentEle = rowChecks.filter(
				(v) =>
					v !== refs.current[`${cell.row.index}/${cell.column.id}`],
			);

			// isExcludedTrue : 전체 input, 현재 input을 제외한 나머지가 전부 true인지 체크
			const isExcludedTrue = !excludedCurrentEle
				.map((v) => v.checked)
				.includes(false);

			// 기존에 나머지 체크박스 value가 전부 true인 경우
			if (isExcludedTrue && cell.value) {
				// 전체 체크박스, 현재 체크박스 해제
				setData((data) =>
					data.map((v) => {
						if (
							v[DRAGGABLE_KEY] ===
							cell.row.original[DRAGGABLE_KEY]
						) {
							return {
								...v,
								[cell.column.id]: !v[cell.column.id],
								[allCheckKey]: !v[allCheckKey],
							};
						} else return v;
					}),
				);
			}
			// 현재 체크박스 클릭시 전체 체크박스가 true가 되는경우
			else if (isExcludedTrue && !cell.value) {
				// 전체 체크박스, 현재 체크박스 체크
				setData((data) =>
					data.map((v) => {
						if (
							v[DRAGGABLE_KEY] ===
							cell.row.original[DRAGGABLE_KEY]
						) {
							return {
								...v,
								[cell.column.id]: !v[cell.column.id],
								[allCheckKey]: !v[allCheckKey],
							};
						} else return v;
					}),
				);
			}
			// 그 외 나머지의 경우
			else {
				// 현재 input에 해당하는 ele만 체크 및 해제
				setData((data) =>
					data.map((v) => {
						if (
							v[DRAGGABLE_KEY] ===
							cell.row.original[DRAGGABLE_KEY]
						) {
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
		cell.row.original,
		cell.value,
		refs,
		setData,
		setLastCheckedKey,
	]);

	/**************************************************
	 * seob - 체크박스 클릭 이벤트 처리함수
	 ***************************************************/
	const handleClick = useCallback(
		(e) => {
			if (cell.value === null) return;

			// shiftKey를 누른 대상이 전체 체크 input인 경우 ( 나머지 input은 shiftKey 적용 X )
			if (e.shiftKey) {
				if (!allCheckKey) return;
				if (cell.column.id === allCheckKey) {
					// lastCheckedKey 값이 존재하는 경우
					if (lastCheckedKey) {
						// currentKey : 현재 체크박스의 ref.current 키
						const currentKey = `${cell.row.index}/${cell.column.id}`;

						if (lastCheckedKey === currentKey) {
							handleSetData();
						} else {
							// currentColumnInputs : refs.current에서 현재 컬럼의 element들 (전체선택 input element 리스트)
							const currentColumnInputs = Object.entries(
								refs.current,
							).filter(
								([key, value]) =>
									key.split('/')[1] === cell.column.id,
							);
							// startKey : isBetween이 running상태가 되는 과정에서
							// 현재 클릭값에 의해 변경되었는지 이전에 클릭한 값에 의해 변경되었는지에 대한 변수
							// 이전에 클릭한 값에의해 변경된 경우 last 현재 클릭한 값에의해 변경된 경우 current
							let startKey = null;
							// process : 현재 클릭한 input과 이전에 클릭한 input사이의 값을 핸들링 하기 위한 처리 상태 변수
							let process = PROCESS_STATE.READY;
							// currentInputChecked : 현재 input element의 체크 유무
							const currentInputChecked =
								refs.current[
									`${cell.row.index}/${cell.column.id}`
								].checked;
							// 현재 컬럼에 속한 전체 체크박스를 순회하며 중간에 위치한 input을 클릭하기 위한 반복문
							for (let [key, value] of currentColumnInputs) {
								// 컬럼 element 리스트중 key값이 이전에 저장한 lastKey와 동일할 경우 혹은,
								// value가 현재 클릭한 체크박스 element인 경우
								// 이전에 클릭한 element와 현재 element 중간에 위치한 input 핸들링
								if (
									key === lastCheckedKey ||
									value ===
										refs.current[
											`${cell.row.index}/${cell.column.id}`
										]
								) {
									// 현재 클릭과 마지막 클릭 사이에 진입하기 전인경우
									// 현재 처리단계가 대기중인경우
									if (process === PROCESS_STATE.READY) {
										// 이전에 클릭한 요소에 의해 처리가 시작된 경우
										if (key === lastCheckedKey) {
											startKey = START_KEY.LAST;
										}
										// 현재 클릭한 요소에 의해 처리가 시작된 경우
										else {
											startKey = START_KEY.CURRENT;
										}
										// 처리 단계 실행중으로 변경
										process = PROCESS_STATE.RUNNING;
									}
									// 현재 처리 단계가 실행중인경우
									else if (
										process === PROCESS_STATE.RUNNING
									) {
										// 단계를 마지막 값 처리중으로 변경
										process = PROCESS_STATE.WAITING;
									}
								}
								// 처리가 시작되면
								if (process === PROCESS_STATE.RUNNING) {
									// 이전 값에 의해 처리가 시작된 경우
									if (startKey === START_KEY.LAST) {
										// 현재 input이 체크되어 있는경우
										if (currentInputChecked) {
											// 체크되지 않은값들만 클릭
											!value.checked && value.click();
										}
										// 현재 input이 체크되어있지 않은경우
										else {
											// 체크된 값들만 클릭
											value.checked && value.click();
										}
									}
									// 현재 값에 의해 처리가 시작된 경우
									else if (startKey === START_KEY.CURRENT) {
										// 반복문 value의 key가 현재 key와 동일한 경우
										if (key === currentKey) {
											value.click();
										}
										// key가 현재키가 아니고, 현재 input이 체크되어 있는경우
										else if (currentInputChecked) {
											!value.checked && value.click();
										}
										// key가 현재키가 아니고, 현재 input이 체크되어있지 않은경우
										else {
											value.checked && value.click();
										}
									}
								}
								// 처리단계가 마지막인경우
								else if (process === PROCESS_STATE.WAITING) {
									// 이전 값에 의해 처리가 시작된 경우
									if (startKey === START_KEY.LAST) {
										// 현재 input이 체크되어 있는경우
										if (currentInputChecked) {
											// 체크된 값들만 클릭
											value.checked && value.click();
										} else {
											// 체크되지 않은값들만 클릭
											!value.checked && value.click();
										}
									}
									// 현재 값에 의해 처리가 시작된 경우
									else if (startKey === START_KEY.CURRENT) {
										// 반복문 value의 key가 현재 key와 동일한 경우
										if (key === currentKey) {
											value.click();
										}
										// key가 현재키가 아니고, 현재 input이 체크되어 있는경우
										else if (currentInputChecked) {
											!value.checked && value.click();
										}
										// key가 현재키가 아니고, 현재 input이 체크되어있지 않은경우
										else {
											value.checked && value.click();
										}
									}
									// lastCheckedKey 수정
									if (cell.column.id === allCheckKey) {
										setLastCheckedKey(
											`${cell.row.index}/${cell.column.id}`,
										);
									}
									// 처리 과정 종료로 변경
									process = PROCESS_STATE.TERMINATED;
								}
								// 처리 과정이 종료되면 반복문 break;
								if (process === PROCESS_STATE.TERMINATED) break;
							}
						}
					}
					// lastCheckedKey 값이 존재하지 않는 경우
					else {
						handleSetData();
					}
				}
			}
			// shiftKey를 누르지 않은경우
			else {
				handleSetData();
			}
		},
		[
			allCheckKey,
			cell.column.id,
			cell.row.original,
			cell.value,
			handleSetData,
			lastCheckedKey,
			refs,
			setLastCheckedKey,
		],
	);

	const handleChange = useCallback(() => {
		// input에서 checked를 사용하면 onChange가 있어야 하므로 우선 함수만 생성했습니다.
	}, []);

	// todo : indeterminate 작업 필요시 진행 예정
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
	// 	// true, false가 섞여있는 경우 (부분 체크된 경우) indeterminate => true
	// 	if (
	// 		rowChecks.map((v) => v.checked).includes(false) &&
	// 		rowChecks.map((v) => v.checked).includes(true) &&
	// 		cell.column.id === allCheckKey
	// 	) {
	// 		setIndeterminate(true);
	// 	}
	// 	// 전체 선택이거나 전체 해제인 경우 indeterminate => false
	// 	else if (
	// 		(!rowChecks.map((v) => v.checked).includes(false) &&
	// 			cell.column.id === allCheckKey) ||
	// 		(!rowChecks.map((v) => v.checked).includes(true) &&
	// 			cell.column.id === allCheckKey)
	// 	) {
	// 		setIndeterminate(false);
	// 	}
	// }, [allCheckKey, cell.column.id, cell.row.original.id, cell.value, refs]);

	return cell.value === null ? (
		<_Container
			// opacity={disabled.toString()}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<InputContainer type={'indeterminate'} disabled className='state'>
				{indeterminateIcon}
			</InputContainer>
		</_Container>
	) : (
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
							`${cell.row.index}/${cell.column.id}`
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
	lastCheckedKey: PropTypes.string,
	setLastCheckedKey: PropTypes.func,
};

export default TableCheckBox;
