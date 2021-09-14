import React from 'react';

import PropTypes from 'prop-types';
import User from '../../pages/User';
import {Route} from 'react-router-dom';

const RouteWithLayout = ({layout, component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				React.createElement(
					layout,
					props,
					React.createElement(component, props),
				)
			}
		/>
	);
};

RouteWithLayout.propTypes = {
	layout: PropTypes.elementType,
	component: PropTypes.elementType,
};

export default RouteWithLayout;
