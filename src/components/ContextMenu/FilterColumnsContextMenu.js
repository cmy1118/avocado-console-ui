import React, {useCallback, useMemo, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';
import CheckBoxContainer from '../RecycleComponents/CheckBoxContainer';
import {
	DefaultButton,
	NormalBorderButton,
	TransparentBorderButton,
	TransparentButton,
} from '../../styles/components/buttons';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: 230px;
	// height: 440px;
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: solid 1px #e3e5e5;
	background: white;
`;

const _CheckboxContainer = styled.div`
	height: 32px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
`;

const _SelectAllContainer = styled(_CheckboxContainer)`
	margin-top: 8px;
	border-bottom: 1px solid #e3e5e5;
`;

const _Header = styled.div`
	height: 41px;
	display: flex;
	align-items: center;
	padding: 0px 16px;
	font-family: NotoSansCJKKR;
	font-size: 14px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.14px;
	color: #212121;
	border-bottom: 1px solid #e3e5e5;
`;
const _Body = styled.div`
	width: 100%;
`;
const _Footer = styled.div`
	height: 60px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-top: 1px solid #e3e5e5;
`;

const FilterColumnsContextMenu = ({
	isOpened,
	setIsOpened,
	allColumns,
	setHiddenColumns,
}) => {
	const ref = useRef();

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onClickHandleCheck = useCallback(
		(columns) => (e) => {
			e.stopPropagation();
			if (Array.isArray(columns)) {
				if (columns.find((v) => !v.isVisible)) {
					setHiddenColumns([]);
				} else {
					setHiddenColumns(columns.map((v) => v.id));
				}
			} else {
				if (e.target.type !== 'checkbox') {
					const checkInput = e.target.firstChild?.childNodes[0];
					if (checkInput.type === 'checkbox') {
						checkInput.click();
					}
				}
			}
		},
		[setHiddenColumns],
	);

	const filteredList = useMemo(() => {
		return allColumns.filter((v) => !v.disableChangeVisible);
	}, [allColumns]);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	return isOpened ? (
		<_Container ref={ref} alignEnd>
			<_Header>
				<span>표시되는 열</span>
			</_Header>
			<_Body>
				<_SelectAllContainer onClick={onClickHandleCheck(filteredList)}>
					<CheckBoxContainer
						title={'모두 선택'}
						indeterminate={
							filteredList.length !==
								filteredList.filter((v) => v.isVisible)
									.length &&
							0 < filteredList.filter((v) => v.isVisible).length
						}
					>
						<input
							type='checkbox'
							checked={
								filteredList.length ===
								filteredList.filter((v) => v.isVisible).length
							}
							readOnly
						/>
					</CheckBoxContainer>
				</_SelectAllContainer>
				{filteredList.map((column) => (
					<_CheckboxContainer
						onClick={onClickHandleCheck(column)}
						key={column.id}
					>
						<CheckBoxContainer title={column.Header}>
							<input
								type='checkbox'
								{...column.getToggleHiddenProps()}
							/>
						</CheckBoxContainer>
					</_CheckboxContainer>
				))}
			</_Body>
			<_Footer>
				<TransparentBorderButton onClick={onClickCloseContextMenu}>
					취소
				</TransparentBorderButton>
				<NormalBorderButton onClick={onClickCloseContextMenu}>
					확인
				</NormalBorderButton>
			</_Footer>
		</_Container>
	) : (
		<></>
	);
};
FilterColumnsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	getToggleHideAllColumnsProps: PropTypes.func.isRequired,
	setHiddenColumns: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
};
export default FilterColumnsContextMenu;
