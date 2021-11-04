import React, {useCallback, useMemo, useRef, useState} from 'react';
import ComboBox from '../RecycleComponents/New/ComboBox';
import Form from '../RecycleComponents/New/Form';
import {userIcon} from '../../icons/icons';
import {HoverIconButton} from '../../styles/components/icons';
import {useDispatch} from 'react-redux';
import USER from '../../reducers/api/Auth/user';

const AccountContextMenu = () => {
	const dispatch = useDispatch();

	const [values, setValues] = useState({account: null});
	const formRef = useRef(null);

	const options = useMemo(() => [{value: 'logout', label: 'logout'}], []);

	const onClickAccountAction = useCallback((v) => {
		if (v.account === 'logout') {
			dispatch(USER.asyncAction.logoutAction());
		}
	}, []);

	return (
		<Form
			initialValues={values}
			onSubmit={onClickAccountAction}
			innerRef={formRef}
		>
			<ComboBox
				innerRef={formRef}
				name='account'
				header={<HoverIconButton>{userIcon}</HoverIconButton>}
				type='drop'
				options={options}
			/>
		</Form>
	);
};

export default AccountContextMenu;
