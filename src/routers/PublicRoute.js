import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';
import React from 'react';
import AUTH_USER from '../reducers/api/Auth/auth';

const PublicRouteWithLayout = ({component: Component, ...rest}) => {
	const {isLoggedIn} = useSelector(AUTH_USER.selector);

	return (
		<Route
			{...rest}
			render={(props) =>
				!isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							// eslint-disable-next-line react/prop-types
							state: {from: props.location},
						}}
					/>
				)
			}
		/>
	);
};

PublicRouteWithLayout.propTypes = {
	layout: PropTypes.elementType,
	component: PropTypes.elementType,
};
export default PublicRouteWithLayout;
