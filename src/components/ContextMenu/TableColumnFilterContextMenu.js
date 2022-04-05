import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DropdownBtnContainer from '../RecycleComponents/DropdownBtnContainer';
import CheckBox from '../RecycleComponents/New/CheckBox';
import styled from 'styled-components';

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

const TableColumnFilterContextMenu = ({
	isOpened,
	setIsOpened,
	allColumns,
	setHiddenColumns,
	selectedOptions,
	setSelectedOptions,
	filters,
	setAllFilters,
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

		setSelectedOptions(
			selectedOptions.filter((v) => !check.includes(v.id)),
		);
		setAllFilters(filters.filter((v) => check.includes(v.id)));
		setIsOpened(false);
	}, [
		setHiddenColumns,
		filteredList,
		setSelectedOptions,
		selectedOptions,
		setAllFilters,
		filters,
		setIsOpened,
		check,
	]);

	const onClickSetCheck = useCallback(
		(columns) => (e) => {
			e.stopPropagation();
			if (Array.isArray(columns)) {
				if (columns.length === check.length) setCheck([]);
				else setCheck(columns.map((v) => v.id));
			} else {
				if (check.includes(columns.id))
					setCheck(check.filter((v) => v !== columns.id));
				else setCheck([...check, columns.id]);
			}
		},
		[check],
	);

	return isOpened ? (
		// <DropdownBtnContainer
		// 	title={'표시되는 열'}
		// 	isOpened={isOpened}
		// 	onClickOkBtn={onClickOkBtn}
		// 	onClickCancelBtn={onClickCancelBtn}
		// 	direction={'left'}
		// >
		<>
			<_CheckboxContainer>
				<CheckBox
					margin={'inherit'}
					onClick={onClickSetCheck(filteredList)}
					label={'모두 선택'}
					indeterminate={
						check.length !== 0 && check.length < filteredList.length
					}
					checked={check.length === filteredList.length}
					readOnly
				/>
			</_CheckboxContainer>
			<div
				style={{width: '100%', height: '1px', background: '#e3e5e5'}}
			/>
			{filteredList.map((column) => (
				<_CheckboxContainer
					onClick={onClickSetCheck(column)}
					key={column.id}
				>
					<CheckBox
						margin={'inherit'}
						label={column.Header}
						checked={check.includes(column.id)}
						readOnly
					/>
				</_CheckboxContainer>
			))}

			{/*</DropdownBtnContainer>*/}
		</>
	) : (
		<></>
	);
};
TableColumnFilterContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	getToggleHideAllColumnsProps: PropTypes.func.isRequired,
	setHiddenColumns: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	setSelectedOptions: PropTypes.func.isRequired,
	filters: PropTypes.array.isRequired,
	setAllFilters: PropTypes.func.isRequired,
};
export default TableColumnFilterContextMenu;
