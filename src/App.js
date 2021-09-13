import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Main, User, Group, Role, Policy, NotFound} from './pages';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Main} />
				<Route path='/user' component={User} />
				<Route path='/group' component={Group} />
				<Route path='/role' component={Role} />
				<Route path='/policy' component={Policy} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
