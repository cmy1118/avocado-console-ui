import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useState,} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckBox from '../RecycleComponents/New/CheckBox';

const _CheckboxContainer = styled.div`
	height: 32px;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;
// eslint-disable-next-line react/display-name
const SearchOptionsContextMenu = forwardRef(
	(
		{
			allColumns,
			selectedOptions, //선택된 필터 옵션들
			setSelectedOptions,
			filters, // 필터링될 값
			setAllFilters,
		},
		ref,
	) => {
		const [tempSelectedOptions, setTempSelectedOptions] = useState(
			selectedOptions,
		);
		const allOptions = useMemo(() => {
			return allColumns.filter(
				(v) =>
					Object.prototype.hasOwnProperty.call(v, 'filter') &&
					v.isVisible === true,
			);
		}, [allColumns]);

		//columns : 현재 선택된 컬럼 id
		const onClickSelectFilter = useCallback(
			(columns) => (e) => {
				e.stopPropagation();
				//필터 설정값 두번 클릭할시 기존 선택된 요소 제거
				if (tempSelectedOptions.includes(columns))
					setTempSelectedOptions(
						tempSelectedOptions.filter((v) => v !== columns),
					);
				else setTempSelectedOptions([...tempSelectedOptions, columns]);
			},
			[tempSelectedOptions],
		);

		// 필더 추가 확인 버튼 이벤트 핸들러
		const onClickApplyFilters = useCallback(() => {
			setSelectedOptions(tempSelectedOptions);
			setAllFilters(
				filters.filter((v) => tempSelectedOptions.includes(v.id)),
			);
		}, [
			setSelectedOptions,
			tempSelectedOptions,
			setAllFilters,
			filters,
		]);
		useImperativeHandle(ref, () => ({
			onClickApplyFilters
		}));

		return (
			<>
				{allOptions.map((column) => (
					<_CheckboxContainer
						key={column.id}
						onClick={onClickSelectFilter(column.id)}
					>
						<CheckBox
							margin={'inherit'}
							label={column.Header}
							checked={tempSelectedOptions.includes(column.id)}
							readOnly
						/>
					</_CheckboxContainer>
				))}
			</>
		);
	},
);
SearchOptionsContextMenu.propTypes = {
	// isOpened: PropTypes.bool.isRequired,
	// setIsOpened: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	setSelectedOptions: PropTypes.func.isRequired,
	filters: PropTypes.array.isRequired,
	setAllFilters: PropTypes.func.isRequired,
};
export default SearchOptionsContextMenu;
