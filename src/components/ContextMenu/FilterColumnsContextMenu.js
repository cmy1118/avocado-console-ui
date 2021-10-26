import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';
import CheckBoxContainer from '../RecycleComponents/CheckBoxContainer';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: 230px;
	height: 440px;
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: solid 1px #e3e5e5;
	background: white;
`;

const _CheckboxContainer = styled.div`
	width: 40px;
	height: 32px;
`;

const FilterColumnsContextMenu = ({
	isOpened,
	setIsOpened,
	allColumns,
	getToggleHideAllColumnsProps,
}) => {
	const ref = useRef();

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	return isOpened ? (
		<_Container ref={ref} alignEnd>
			<div>
				표시되는 열선택
				<span>
					{' '}
					<button onClick={onClickCloseContextMenu}>{'❎'}</button>
				</span>
				<_CheckboxContainer>
					<CheckBoxContainer
						title={'모두 선택'}
						indeterminate={
							allColumns.length >
								allColumns.filter((v) => !v.isVisible).length &&
							allColumns.filter((v) => !v.isVisible).length > 0
						}
					>
						<input
							type='checkbox'
							{...getToggleHideAllColumnsProps()}
						/>
					</CheckBoxContainer>
				</_CheckboxContainer>
				{allColumns.map(
					(column) =>
						column.id !== 'selection' && (
							<_CheckboxContainer key={column.id}>
								<CheckBoxContainer title={column.Header}>
									<input
										type='checkbox'
										{...column.getToggleHiddenProps()}
									/>
								</CheckBoxContainer>
							</_CheckboxContainer>
						),
				)}
				<br />
			</div>
		</_Container>
	) : (
		<></>
	);
};
FilterColumnsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	getToggleHideAllColumnsProps: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
};
export default FilterColumnsContextMenu;
