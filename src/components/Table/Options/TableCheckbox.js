import React, {forwardRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../RecycleComponents/New/CheckBox';

/***************************************************************************
 * ⭐ seob - Table checkbox column 을 위한 컴포넌트
 *
 * indeterminate: ⭐️
 * disabled: checkbox 기능 사용 유무
 * ...rest : 나머지 props 정보
 ***************************************************************************/
const TableCheckbox = forwardRef(
	({indeterminate, disabled, childCheck, ...rest}, ref) => {
		const tableKey = rest.tablekey;
		//checkboxes: checkbox input 정보들을 포함한 dom 저장 변수
		const checkboxes = document.querySelectorAll(
			`.${rest.tablekey}[type='checkbox']`,
		);
		console.log('🔴childCheck:', childCheck);

		/***************************************************************************
		 * roberto - 전체석택시 가로 행 child 요소 체크 이벤트 핸들러
		 ***************************************************************************/
		const isCheckedChildRowsHandler = useCallback(
			(e) => {
				if (!childCheck) {
					const element = e.target.parentNode.parentNode.parentNode.querySelectorAll(
						`input[type="checkbox"]:not(.${tableKey})`,
					);
					console.log('🔵e.childCheck:', e.childCheck);
					if (!e.childCheck) {
						element?.forEach((checkbox) => {
							//클릭 됬을때
							if (e.target.checked) {
								if (!checkbox.checked) {
									checkbox.click();
								}
							}
							//클릭 안됬을때
							if (!e.target.checked) {
								if (checkbox.checked) {
									checkbox.click();
								}
							}
						});
					}
				}
			},
			[childCheck, tableKey],
		);

		/***************************************************************************
		 * roberto - 가로 행 전체 선택 이벤트 핸들러
		 ***************************************************************************/
		const rowClickHandler = useCallback(
			(e) => {
				if (!e.shiftKey) {
					//선택한 요소를 제외한 체크박스 가로행 체크박스들
					const element = e.target.parentNode.parentNode.parentNode.querySelectorAll(
						`input[type="checkbox"]:not(.${tableKey})`,
					);
					console.log('🔴element:', element);
					element?.forEach((checkbox) => {
						isCheckedChildRowsHandler(e, checkbox);
					});
					// 현재 타겟의 마지막 체크 true
					element.forEach((checkbox) => {
						delete checkbox.lastChecked;
						delete e.target.isBetween;
					});
					e.target.lastChecked = true;
				}
			},
			[isCheckedChildRowsHandler, tableKey],
		);

		/***************************************************************************
		 * seob - shift 클릭 핸들러
		 ***************************************************************************/
		const shiftClickHandler = useCallback(
			(e) => {
				const element = e?.target.parentNode.parentNode.parentNode.querySelectorAll(
					`input[type="checkbox"]:not(.${tableKey})`,
				);
				// 마지막 체크값이 존재하는지 검사
				let isLastChecked = false;
				checkboxes.forEach((checkbox) => {
					if (checkbox.lastChecked) isLastChecked = true;
				});

				//마지막 체크값이 존재하는 경우
				if (isLastChecked) {
					//마지막 체크값이 전체선택 체크박스인 경우 return
					let isAllCheck = false;
					checkboxes.forEach((checkbox) => {
						if (
							checkbox.title ===
								'Toggle All Current Page Rows Selected' &&
							checkbox.lastChecked
						)
							isAllCheck = true;
					});
					if (isAllCheck) return;

					//현재 선택한 값이 마지막 체크된 체크박스가 아닌 경우들만
					if (!e.target.lastChecked) {
						//⭐checked ::: [ false => true ] 사이에 해당되는 친구들은 모두 true
						if (e.target.checked) {
							let isBetween = false;
							checkboxes.forEach((checkbox) => {
								if (
									checkbox.lastChecked ||
									checkbox === e.target
								) {
									if (!checkbox.checked) {
										checkbox.isBetween = true;
										checkbox.click();
									}
									isBetween = !isBetween;
								} else {
									if (isBetween) {
										if (!checkbox.checked) {
											checkbox.isBetween = true;
											checkbox.click();
										}
									}
								}
							});
							// todo : checked ::: [ true => false ] 사이에 해당되는 친구들은 모두 false
						} else {
							let isBetween = false;
							checkboxes.forEach((checkbox) => {
								if (
									checkbox.lastChecked ||
									checkbox === e.target
								) {
									isBetween = !isBetween;
									if (isBetween) {
										if (
											checkbox.lastChecked &&
											checkbox.checked
										) {
											checkbox.click();
										}
										console.log('checkbox :: ', checkbox);
									} else {
										if (
											checkbox.lastChecked &&
											checkbox.checked
										)
											checkbox.click();
									}
								} else {
									if (isBetween) {
										if (checkbox.checked) {
											checkbox.isBetween = true;
											console.log(
												'checkbox :: ',
												checkbox,
											);
											checkbox.click();
										}
									}
								}
							});
						}
					}
				}
				// 현재 타겟의 마지막 체크 true
				checkboxes.forEach((checkbox) => {
					delete checkbox.lastChecked;
					delete e.target.isBetween;
					isCheckedChildRowsHandler(e, checkbox);
				});
				e.target.lastChecked = true;
			},

			[checkboxes, isCheckedChildRowsHandler, tableKey],
		);

		/***************************************************************************
		 * seob,roberto - checkbox click 이벤트 처리함수
		 ***************************************************************************/
		const handleClick = useCallback(
			(e) => {
				if (disabled) return;
				e.stopPropagation();
				if (!e.shiftKey) {
					rowClickHandler(e);
				}
				if (e.shiftKey) {
					shiftClickHandler(e);
				} else {
					// if (!e.target.isBetween) {
					// 	checkboxes.forEach((checkbox) => {
					// 		checkbox.title !==
					// 			'Toggle All Current Page Rows Selected' &&
					// 			checkbox.checked &&
					// 			checkbox.click();
					// 	});
					// 	e.target.click();
					// }
				}
			},
			[disabled, rowClickHandler, shiftClickHandler],
		);
		return (
			<CheckBox
				className={`${rest.tablekey}`}
				indeterminate={indeterminate}
				onClick={handleClick}
				{...rest}
				disabled={disabled}
				label={''}
			/>
		);
	},
);

TableCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
	disabled: PropTypes.bool,
	childCheck: PropTypes.bool,
};

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
