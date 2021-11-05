import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import USER from '../reducers/api/Auth/user';
import {useHistory} from 'react-router-dom';
import {account} from '../utils/auth';
import LoginLayout from '../components/Layouts/LoginLayout';
import LoginForm from '../components/Form/LoginForm';

const Login = ({match}) => {
	const history = useHistory();
	const {user} = useSelector(USER.selector);

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
		<LoginLayout>
			<LoginForm />
		</LoginLayout>
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
