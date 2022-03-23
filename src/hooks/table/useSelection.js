import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import TableCheckBox from '../../components/Table/ColumnCells/TableCheckBox';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../icons/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {DRAGGABLE_KEY} from '../../Constants/Table/keys';
import {setIn} from 'formik';

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

const SelectionCheckBox = ({
	cell,
	refs,
	setSelect,
	select,
	lastCheckedKey,
	setLastCheckedKey,
}) => {
	const [indeterminate, setIndeterminate] = useState(false);
	const [checked, setChecked] = useState(false);

	const selectFunc = useCallback(() => {
		setSelect((prev) =>
			prev
				.map((p) => p[DRAGGABLE_KEY])
				.includes(cell.row.original[DRAGGABLE_KEY])
				? prev.filter(
						(p) =>
							p[DRAGGABLE_KEY] !==
							cell.row.original[DRAGGABLE_KEY],
				  )
				: cell.rows
						.map((r) => r.original)
						.filter(
							(o) =>
								o[DRAGGABLE_KEY] ===
									cell.row.original[DRAGGABLE_KEY] ||
								prev
									.map((p) => p[DRAGGABLE_KEY])
									.includes(o[DRAGGABLE_KEY]),
						),
		);
	}, [cell, setSelect]);

	const handleClick = useCallback(
		(e) => {
			// 전체 선택이 아닌경우
			if (cell.row) {
				if (e.shiftKey) {
					if (lastCheckedKey) {
						if (
							lastCheckedKey === cell.row.original[DRAGGABLE_KEY]
						) {
							selectFunc();
						} else {
							let process = PROCESS_STATE.READY;
							const checkList = [];

							for (let v of cell.rows.map((c) => c.original)) {
								if (
									v[DRAGGABLE_KEY] ===
										cell.row.original[DRAGGABLE_KEY] ||
									v[DRAGGABLE_KEY] === lastCheckedKey
								) {
									if (process === PROCESS_STATE.READY) {
										process = PROCESS_STATE.RUNNING;
									} else if (
										process === PROCESS_STATE.RUNNING
									) {
										process = PROCESS_STATE.WAITING;
									}
								}
								if (process === PROCESS_STATE.RUNNING) {
									checkList.push(v);
								} else if (process === PROCESS_STATE.WAITING) {
									checkList.push(v);
									process = PROCESS_STATE.TERMINATED;
								}
								if (process === PROCESS_STATE.TERMINATED) {
									break;
								}
							}
							// 기존에 체크가 되어있던 경우
							if (
								select
									.map((s) => s[DRAGGABLE_KEY])
									.includes(cell.row.original[DRAGGABLE_KEY])
							) {
								setSelect((prev) =>
									prev.filter(
										(p) =>
											!checkList
												.map((c) => c[DRAGGABLE_KEY])
												.includes(p[DRAGGABLE_KEY]),
									),
								);
							}
							// 기존에 체크되어있지 않은경우
							else {
								setSelect((prev) =>
									cell.rows
										.map((r) => r.original)
										.filter(
											(o) =>
												prev
													.map(
														(p) => p[DRAGGABLE_KEY],
													)
													.includes(
														o[DRAGGABLE_KEY],
													) ||
												checkList
													.map(
														(c) => c[DRAGGABLE_KEY],
													)
													.includes(o[DRAGGABLE_KEY]),
										),
								);
							}
						}
					} else {
						selectFunc();
					}
				} else {
					selectFunc();
				}

				setLastCheckedKey(cell.row.original[DRAGGABLE_KEY]);
			}
			// 전체 선택인 경우
			else {
				if (indeterminate) {
					setSelect(cell.rows.map((v) => v.original));
				} else {
					if (checked) {
						setSelect([]);
					} else {
						setSelect(cell.rows.map((v) => v.original));
					}
				}
			}
		},
		[
			cell,
			checked,
			indeterminate,
			lastCheckedKey,
			select,
			selectFunc,
			setLastCheckedKey,
			setSelect,
		],
	);

	const handleChange = useCallback(() => {
		// input에서 checked를 사용하면 onChange가 있어야 하므로 우선 함수만 생성했습니다.
	}, []);

	useEffect(() => {
		if (cell.row) {
			if (
				select
					.map((s) => s[DRAGGABLE_KEY])
					.includes(cell.row.original[DRAGGABLE_KEY])
			) {
				setChecked(true);
			} else {
				setChecked(false);
			}
		} else {
			if (select.length) {
				if (select.length === cell.rows.length) {
					setIndeterminate(false);
					setChecked(true);
				} else {
					setIndeterminate(true);
					setChecked(false);
				}
			} else {
				setIndeterminate(false);
				setChecked(false);
			}
		}
	}, [cell, select]);

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
			) : checked ? (
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

SelectionCheckBox.propTypes = {
	cell: PropTypes.object,
	setSelect: PropTypes.func,
	select: PropTypes.array,
	refs: PropTypes.object,
	lastCheckedKey: PropTypes.string,
	setLastCheckedKey: PropTypes.func,
};

const useSelection = () => {
	const [select, setSelect] = useState([]);
	const [lastCheckedKey, setLastCheckedKey] = useState(null);
	const refs = useRef([]);

	const selectionColumn = useMemo(
		() => ({
			id: 'selection',
			accessor: 'selection',
			Header: function Component(cell) {
				return (
					<SelectionCheckBox
						cell={cell}
						// refs={refs}
						lastCheckedKey={lastCheckedKey}
						setLastCheckedKey={setLastCheckedKey}
						setSelect={setSelect}
						select={select}
					/>
				);
			},
			Cell: function Component(cell) {
				return (
					<SelectionCheckBox
						cell={cell}
						refs={refs}
						lastCheckedKey={lastCheckedKey}
						setLastCheckedKey={setLastCheckedKey}
						setSelect={setSelect}
						select={select}
					/>
				);
			},
			width: 40,
		}),
		[lastCheckedKey, select],
	);

	return [select, selectionColumn];
};

export default useSelection;
