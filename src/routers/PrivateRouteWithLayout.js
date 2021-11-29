import {useSelector} from 'react-redux';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import AUTH_USER from '../reducers/api/Auth/authUser';

const PrivateRouteWithLayout = ({layout, component, ...rest}) => {
	const {isLoggedIn, companyId} = useSelector(AUTH_USER.selector);
	console.log(isLoggedIn);
	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn ? (
					React.createElement(
						layout,
						props,
						React.createElement(component, props),
					)
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

PrivateRouteWithLayout.propTypes = {
	layout: PropTypes.elementType,
	component: PropTypes.elementType,
};
export default PrivateRouteWithLayout;
