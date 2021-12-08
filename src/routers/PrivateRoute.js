import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';
import React from 'react';
import AUTH_USER from '../reducers/api/Auth/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {isLoggedIn, companyId} = useSelector(AUTH_USER.selector);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname:
								'/login/' +
								(companyId
									? companyId
									: localStorage.getItem('companyId')),
							// eslint-disable-next-line react/prop-types
							state: {from: props.location},
						}}
					/>
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.elementType,
};
export default PrivateRoute;
