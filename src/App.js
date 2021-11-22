import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';

import {
	AltAuthRedirect,
	Group,
	Iam,
	Login,
	Main,
	NotFound,
	Policy,
	Role,
	User,
} from './pages';
import IamLayout from './components/Layouts/IamLayout';
import ConfirmDialogBox from './components/DialogBoxs/Alert/ConfirmDialogBox';
import DeleteDialogBox from './components/DialogBoxs/Alert/DeleteDialogBox';
import Layout from './components/Layouts/Layout';
import PrivateRouteWithLayout from './routers/PrivateRouteWithLayout';
import PublicRoute from './routers/PublicRoute';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRouteWithLayout
					path='/'
					exact
					component={Main}
					layout={Layout}
				/>

				<PrivateRouteWithLayout
					path='/iam'
					exact
					component={Iam}
					layout={IamLayout}
				/>

				<PrivateRouteWithLayout
					path='/users/add'
					exact
					component={User}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/users/:id'
					component={User}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/users'
					component={User}
					layout={IamLayout}
				/>

				<PrivateRouteWithLayout
					path='/groups/add'
					exact
					component={Group}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/groups/types'
					exact
					component={Group}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/groups/:id'
					component={Group}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/groups'
					component={Group}
					layout={IamLayout}
				/>

				<PrivateRouteWithLayout
					path='/roles/add'
					exact
					component={Role}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/roles/:id'
					component={Role}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/roles'
					component={Role}
					layout={IamLayout}
				/>

				<PrivateRouteWithLayout
					path='/policies/add'
					exact
					component={Policy}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/policies/:id'
					component={Policy}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/policies'
					component={Policy}
					layout={IamLayout}
				/>
				<PublicRoute path='/login/:companyId' component={Login} />
				<PublicRoute
					path={'/altauthredirect'}
					component={AltAuthRedirect}
				/>
				<PublicRoute component={NotFound} />
			</Switch>

			<ConfirmDialogBox />
			<DeleteDialogBox />
		</BrowserRouter>
	);
};

export default App;
