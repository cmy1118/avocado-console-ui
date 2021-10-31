import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DropdownBtnContainer from '../RecycleComponents/DropdownBtnContainer';
import NewCheckBox from '../RecycleComponents/New/NewCheckBox';

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
			direction={'left'}
		>
			<NewCheckBox
				onClick={onClickSetCheck(filteredList)}
				label={'모두 선택'}
				indeterminate={
					check.length !== 0 && check.length < filteredList.length
				}
				checked={check.length === filteredList.length}
				readOnly
			/>
			{/*<div*/}
			{/*	style={{width: '100%', height: '1px', background: '#e3e5e5'}}*/}
			{/*/>*/}
			{filteredList.map((column) => (
				<NewCheckBox
					onClick={onClickSetCheck(column)}
					key={column.id}
					label={column.Header}
					checked={check.includes(column.id)}
					readOnly
				/>
			))}
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
