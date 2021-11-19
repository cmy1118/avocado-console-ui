import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {
	Group,
	Iam,
	Login,
	Main,
	NotFound,
	Policy,
	Role,
	User,
	AltAuthRedirect,
} from './pages';
import RouteWithLayout from './components/Layouts/RouteWithLayout';
import IamLayout from './components/Layouts/IamLayout';
import ConfirmDialogBox from './components/DialogBoxs/Alert/ConfirmDialogBox';
import DeleteDialogBox from './components/DialogBoxs/Alert/DeleteDialogBox';
import Layout from './components/Layouts/Layout';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<RouteWithLayout
					path='/'
					exact
					component={Main}
					layout={Layout}
				/>

				<RouteWithLayout
					path='/iam'
					exact
					component={Iam}
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
				<Route path={'/altauthredirect'} component={AltAuthRedirect} />
				<Route component={NotFound} />
			</Switch>

			<ConfirmDialogBox />
			<DeleteDialogBox />
		</BrowserRouter>
	);
};

export default App;
