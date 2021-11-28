import React, {useCallback, useMemo, useRef, useState} from 'react';
import ComboBox from '../RecycleComponents/New/ComboBox';
import Form from '../RecycleComponents/New/Form';
import {userIcon} from '../../icons/icons';
import {HoverIconButton} from '../../styles/components/icons';
import {useDispatch} from 'react-redux';
import AUTH_USER from '../../reducers/api/Auth/authUser';

const options = {logout: {value: 'logout', label: 'logout'}};

const AccountContextMenu = () => {
	const dispatch = useDispatch();

	const [values, setValues] = useState({account: null});
	const formRef = useRef(null);

	const contextMenuOptions = useMemo(() => Object.values(options), []);

	const onClickAccountAction = useCallback(
		(v) => {
			if (v.account === options.logout.value) {
				dispatch(AUTH_USER.asyncAction.logoutAction());
			}
		},
		[dispatch],
	);

	return (
		<Form
			initialValues={values}
			onSubmit={onClickAccountAction}
			innerRef={formRef}
		>
			<ComboBox
				innerRef={formRef}
				name='account'
				header={<HoverIconButton color={'#D7D7D7'}>{userIcon}</HoverIconButton>}
				type='drop'
				options={contextMenuOptions}
			/>
		</Form>
	);
};

export default AccountContextMenu;
