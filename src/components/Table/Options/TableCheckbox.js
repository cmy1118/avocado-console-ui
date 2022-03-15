import React, {forwardRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../RecycleComponents/New/CheckBox';

/**************************************************
 * seob - Table CheckBox column을 위한 컴포넌트
 *
 * indeterminate : 체크박스 부분 선택 유무
 * rest : tablekey를 포함하여 input관련 나머지 props들
 ***************************************************/
const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const checkboxes = document.querySelectorAll(
		`.${rest.tablekey}[type='checkbox']`,
	);

	/**************************************************
	 * seob - 체크박스 클릭 이벤트 처리함수
	 ***************************************************/
	const handleClick = useCallback(
		(e) => {
			// 현재 클릭한 타겟이 기존 마지막에 클릭한 타겟과 현재 클릭한 타겟 사이의 체크박스였던 경우
			if (e.target.isBetween) {
				delete e.target.isBetween;
				return;
			}
			// shiftKey를 누른경우
			if (e.shiftKey) {
				// todo : 마지막 체크값이 존재하는지 검사
				let isLastChecked = false;
				// console.log(checkboxes);
				// 마지막 클릭을 확인하는 속성 제거
				checkboxes.forEach((checkbox) => {
					if (checkbox.lastChecked) isLastChecked = true;
				});

				// 마지막 체크값이 존재하는 경우
				if (isLastChecked) {
					// 마지막 체크값이 전체선택 체크박스인 경우 return
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

					// 현재 선택한 값이 마지막 체크된 체크박스가 아닌 경우들만
					if (!e.target.lastChecked) {
						// [ false => true ] 사이에 해당되는 체크박스들은 모두 true
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
							// [ true => false ] 사이에 해당되는 체크박스들은 모두 false
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
										// console.log('checkbox :: ', checkbox);
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
											// console.log(
											// 	'checkbox :: ',
											// 	checkbox,
											// );
											checkbox.click();
										}
									}
								}
							});
						}
					}
				}
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

			// todo : 현재 타겟의 마지막 체크 true
			checkboxes.forEach((checkbox) => {
				delete checkbox.lastChecked;
				delete e.target.isBetween;
			});
			e.target.lastChecked = true;
		},
		[checkboxes],
	);

	return (
		<CheckBox
			className={`${rest.tablekey}`}
			indeterminate={indeterminate}
			onClick={handleClick}
			{...rest}
			label={''}
		/>
	);
});

TableCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
