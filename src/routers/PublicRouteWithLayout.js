import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';
import React from 'react';
import AUTH from '../reducers/api/Auth/auth';

const PublicRouteWithLayout = ({layout, component, ...rest}) => {
	const {isLoggedIn} = useSelector(AUTH.selector);

	return (
		<Route
			{...rest}
			render={(props) =>
				!isLoggedIn ? (
					React.createElement(
						layout,
						props,
						React.createElement(component, props),
					)
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
