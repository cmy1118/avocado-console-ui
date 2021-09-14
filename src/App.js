import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Main, User, Group, Role, Policy, NotFound} from './pages';
import RouteWithLayout from './components/Layouts/RouteWithLayout';
import IamLayout from './components/Layouts/IamLayout';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<RouteWithLayout
					path='/'
					exact
					component={Main}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/user/add'
					exact
					component={User}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/user/:id'
					component={User}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/user'
					component={User}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/group/add'
					exact
					component={Group}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/group/:id'
					component={Group}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/group'
					component={Group}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/role/add'
					exact
					component={Role}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/role/:id'
					component={Role}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/role'
					component={Role}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/policy/add'
					exact
					component={Policy}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/policy/:id'
					component={Policy}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/policy'
					component={Policy}
					layout={IamLayout}
				/>

				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
