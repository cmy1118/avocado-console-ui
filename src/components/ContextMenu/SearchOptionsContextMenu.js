import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../styles/components/buttons';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: 460px;
	background: lightblue;
`;

const SearchOptionsContextMenu = ({
	isOpened,
	setIsOpened,
	allOptions,
	selectedOptions,
	setSelectedOptions,
	filters,
	setAllFilters,
}) => {
	const ref = useRef();
	const [tempSelectedOptions, setTempSelectedOptions] = useState(
		selectedOptions,
	);

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onChangeSelectFilterOption = useCallback(
		(v) => () => {
			if (tempSelectedOptions.includes(v))
				setTempSelectedOptions(
					tempSelectedOptions.filter((val) => val !== v),
				);
			else setTempSelectedOptions([...tempSelectedOptions, v]);
		},
		[setTempSelectedOptions, tempSelectedOptions],
	);

	const onClickApplyFilters = useCallback(() => {
		setSelectedOptions(tempSelectedOptions);
		setAllFilters(
			filters.filter((v) => tempSelectedOptions.includes(v.id)),
		);
		onClickCloseContextMenu();
	}, [setSelectedOptions, tempSelectedOptions, onClickCloseContextMenu]);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	return (
		<_Container ref={ref} alignEnd>
			<div> 조회 필터 추가</div>
			<div>
				{allOptions.map((column) => (
					<div key={column.accessor}>
						<label>
							<input
								type='checkbox'
								checked={tempSelectedOptions.includes(
									column.accessor,
								)}
								onChange={onChangeSelectFilterOption(
									column.accessor,
								)}
							/>{' '}
							{column.Header}
						</label>
					</div>
				))}
				<br />
			</div>
			<div>
				<TransparentBorderButton onClick={onClickCloseContextMenu}>
					취소
				</TransparentBorderButton>
				<NormalBorderButton onClick={onClickApplyFilters}>
					확인
				</NormalBorderButton>
			</div>
		</_Container>
	);
};
SearchOptionsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	allOptions: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	setSelectedOptions: PropTypes.func.isRequired,
	filters: PropTypes.array.isRequired,
	setAllFilters: PropTypes.func.isRequired,
};
export default SearchOptionsContextMenu;
