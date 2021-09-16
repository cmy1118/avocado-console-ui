import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import {usersSelector} from '../../../reducers/users';
import SettingsCheckbox from '../settings/SettingsCheckbox';
import PropTypes from 'prop-types';
// import {IconButton} from '../../../styles/components/icon';
// import {DialogBoxHeader} from '../../../styles/components/disalogBox';

const _DialogBox = styled.div`
	z-index: 99;
	position: absolute;
	top: 30%;
	left: 80%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	width: 460px;
`;

const SelectColumnDialogBox = ({allColumns, getToggleHideAllColumnsProps}) => {
	const dispatch = useDispatch();
	const {form} = useSelector(dialogBoxSelector.all);
	const onClickCloseDialogBox = useCallback(async () => {
		await dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	return form.open && form.key === 'hideColumn' ? (
		<_DialogBox style={{background: 'lightblue'}}>
			<div>
				표시되는 열선택
				<span>
					{' '}
					<button onClick={onClickCloseDialogBox}>{'❎'}</button>
				</span>
				<div>
					<SettingsCheckbox {...getToggleHideAllColumnsProps()} />{' '}
					전체선택
				</div>
				{allColumns.map((column) => (
					<div key={column.id}>
						<label>
							<input
								type='checkbox'
								{...column.getToggleHiddenProps()}
							/>{' '}
							{column.id}
						</label>
					</div>
				))}
				<br />
			</div>
		</_DialogBox>
	) : (
		false
	);
};
SelectColumnDialogBox.propTypes = {
	allColumns: PropTypes.array.isRequired,
	getToggleHideAllColumnsProps: PropTypes.array.isRequired,
};
export default SelectColumnDialogBox;