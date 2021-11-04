import React, {useCallback, useEffect, useRef} from 'react';
import TextBox from '../components/RecycleComponents/New/TextBox';
import Form from '../components/RecycleComponents/New/Form';
import {NormalButton} from '../styles/components/buttons';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import USER from '../reducers/api/Auth/user';
import {useHistory} from 'react-router-dom';
import {account} from '../utils/auth';

const Login = ({match}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {user} = useSelector(USER.selector);

	const formRef = useRef(null);

	const onClickLogin = useCallback(
		(v) => {
			dispatch(
				USER.asyncAction.loginAction({
					username: v.id,
					password: v.password,
					companyId: match.params.companyId,
				}),
			);
		},
		[dispatch, match],
	);

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, [history, user]);

	useEffect(() => {
		if (
			match.params.companyId !== account.KT.companyId &&
			match.params.companyId !== account.SAMSUNG.companyId
		) {
			history.push('/404');
		}
	}, [history, match.params.companyId]);

	return (
		<div>
			<div>Login page</div>
			<Form
				initialValues={{
					id: '',
					password: '',
				}}
				onSubmit={onClickLogin}
				innerRef={formRef}
			>
				<TextBox
					name={'id'}
					placeholder={'사용자 계정 ID'}
					direction={'row'}
				/>
				<TextBox
					name={'password'}
					placeholder={'사용자 비밀번호'}
					direction={'row'}
				/>

				<NormalButton type='submit'>Login</NormalButton>
			</Form>
		</div>
	);
};

Login.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			companyId: PropTypes.string,
		}),
	}),
};

export default Login;
