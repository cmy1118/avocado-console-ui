import React, {useCallback, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';
import CheckBoxContainer from '../RecycleComponents/CheckBoxContainer';
import {
	NormalBorderButton,
	TransparentBorderButton,
} from '../../styles/components/buttons';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: 230px;
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

	const filteredList = useMemo(() => {
		return allColumns.filter((v) => !v.disableChangeVisible);
	}, [allColumns]);

	const [check, setCheck] = useState(
		filteredList.filter((v) => v.isVisible).map((v) => v.id),
	);

	const onClickCloseContextMenu = useCallback(() => {
		setCheck(filteredList.filter((v) => v.isVisible).map((v) => v.id));
		setIsOpened(false);
	}, [filteredList, setIsOpened]);

	const onClickSaveCheckedList = useCallback(() => {
		setHiddenColumns(
			filteredList.filter((v) => !check.includes(v.id)).map((v) => v.id),
		);
		setIsOpened(false);
	}, [check, filteredList, setHiddenColumns]);

	const onClickSetCheck = useCallback(
		(columns) => (e) => {
			e.stopPropagation();
			if (Array.isArray(columns)) {
				if (columns.length === check.length) setCheck([]);
				else setCheck(columns.map((v) => v.id));
			} else {
				console.log(columns);
				if (check.includes(columns.id))
					setCheck(check.filter((v) => v !== columns.id));
				else setCheck([...check, columns.id]);
			}
		},
		[check],
	);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	return isOpened ? (
		<_Container ref={ref} alignEnd>
			<_Header>
				<span>표시되는 열</span>
			</_Header>
			<_Body>
				<_SelectAllContainer onClick={onClickSetCheck(filteredList)}>
					<CheckBoxContainer
						title={'모두 선택'}
						indeterminate={
							check.length !== 0 &&
							check.length < filteredList.length
						}
					>
						<input
							type='checkbox'
							checked={check.length === filteredList.length}
							readOnly
						/>
					</CheckBoxContainer>
				</_SelectAllContainer>
				{filteredList.map((column) => (
					<_CheckboxContainer
						onClick={onClickSetCheck(column)}
						key={column.id}
					>
						<CheckBoxContainer title={column.Header}>
							<input
								type='checkbox'
								checked={check.includes(column.id)}
								readOnly
							/>
						</CheckBoxContainer>
					</_CheckboxContainer>
				))}
			</_Body>
			<_Footer>
				<TransparentBorderButton onClick={onClickCloseContextMenu}>
					취소
				</TransparentBorderButton>
				<NormalBorderButton onClick={onClickSaveCheckedList}>
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
