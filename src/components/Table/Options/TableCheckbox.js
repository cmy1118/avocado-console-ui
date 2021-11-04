import React, {forwardRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../RecycleComponents/New/CheckBox';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const checkboxes = document.querySelectorAll(
		`.${rest.tablekey}[type='checkbox']`,
	);

	const handleClick = useCallback(
		(e) => {
			if (e.target.isBetween) {
				delete e.target.isBetween;
				return;
			}
			if (e.shiftKey) {
				// todo : 마지막 체크값이 존재하는지 검사
				let isLastChecked = false;
				checkboxes.forEach((checkbox) => {
					if (checkbox.lastChecked) isLastChecked = true;
				});

				// todo : 마지막 체크값이 존재하는 경우
				if (isLastChecked) {
					// todo : 마지막 체크값이 전체선택 체크박스인 경우 return
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

					// todo : 현재 선택한 값이 마지막 체크된 체크박스가 아닌 경우들만
					if (!e.target.lastChecked) {
						// todo : checked ::: [ false => true ] 사이에 해당되는 친구들은 모두 true
						if (e.target.checked) {
							let isBetween = false;
							checkboxes.forEach((checkbox) => {
								if (
									checkbox.lastChecked ||
									checkbox === e.target
								) {
									console.log('open / close');
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
									console.log('open / close');
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
				} else {
					//
				}
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
			className={`${rest.tablekey} ${rest.row && rest.row.id} `}
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
