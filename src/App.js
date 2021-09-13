import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Main, User, Group, Role, Policy, NotFound} from './pages';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Main} />

				<Route path='/user/add' exact component={User} />
				<Route path='/user/:id' component={User} />
				<Route path='/user' component={User} />

				<Route path='/group/add' exact component={Group} />
				<Route path='/group/:id' component={Group} />
				<Route path='/group' component={Group} />

				<Route path='/role/add' exact component={Role} />
				<Route path='/role/:id' component={Role} />
				<Route path='/role' component={Role} />

				<Route path='/policy/add' exact component={Policy} />
				<Route path='/policy/:id' component={Policy} />
				<Route path='/policy' component={Policy} />

				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
