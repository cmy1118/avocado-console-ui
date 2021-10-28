import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckBoxContainer from '../RecycleComponents/CheckBoxContainer';
import DropdownBtnContainer from '../RecycleComponents/DropdownBtnContainer';

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
	border-bottom: 1px solid #e3e5e5;
`;

const FilterColumnsContextMenu = ({
	isOpened,
	setIsOpened,
	allColumns,
	setHiddenColumns,
}) => {
	const filteredList = useMemo(() => {
		return allColumns.filter((v) => !v.disableChangeVisible);
	}, [allColumns]);

	const [check, setCheck] = useState(
		filteredList.filter((v) => v.isVisible).map((v) => v.id),
	);

	const onClickCancelBtn = useCallback(() => {
		setCheck(filteredList.filter((v) => v.isVisible).map((v) => v.id));
		setIsOpened(false);
	}, [filteredList, setIsOpened]);

	const onClickOkBtn = useCallback(() => {
		setHiddenColumns(
			filteredList.filter((v) => !check.includes(v.id)).map((v) => v.id),
		);
		setIsOpened(false);
	}, [check, filteredList, setHiddenColumns, setIsOpened]);

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

	return isOpened ? (
		<DropdownBtnContainer
			title={'표시되는 열'}
			isOpened={isOpened}
			onClickOkBtn={onClickOkBtn}
			onClickCancelBtn={onClickCancelBtn}
		>
			<>
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
			</>
		</DropdownBtnContainer>
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
