import {useSelector} from 'react-redux';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import AUTH from '../reducers/api/Auth/auth';

const PrivateRouteWithLayout = ({layout, component, ...rest}) => {
	const {isLoggedIn, companyId} = useSelector(AUTH.selector);

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
