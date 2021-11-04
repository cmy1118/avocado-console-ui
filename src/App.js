import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Main, User, Group, Role, Policy, NotFound, Login} from './pages';
import RouteWithLayout from './components/Layouts/RouteWithLayout';
import IamLayout from './components/Layouts/IamLayout';
import ConfirmDialogBox from './components/DialogBoxs/Alert/ConfirmDialogBox';
import DeleteDialogBox from './components/DialogBoxs/Alert/DeleteDialogBox';

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
					path='/users/add'
					exact
					component={User}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/users/:id'
					component={User}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/users'
					component={User}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/groups/add'
					exact
					component={Group}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/groups/types'
					exact
					component={Group}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/groups/:id'
					component={Group}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/groups'
					component={Group}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/roles/add'
					exact
					component={Role}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/roles/:id'
					component={Role}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/roles'
					component={Role}
					layout={IamLayout}
				/>

				<RouteWithLayout
					path='/policies/add'
					exact
					component={Policy}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/policies/:id'
					component={Policy}
					layout={IamLayout}
				/>
				<RouteWithLayout
					path='/policies'
					component={Policy}
					layout={IamLayout}
				/>
				<Route path='/login/:companyId' component={Login} />
				<Route component={NotFound} />
			</Switch>

			<ConfirmDialogBox />
			<DeleteDialogBox />
		</BrowserRouter>
	);
};

export default App;
