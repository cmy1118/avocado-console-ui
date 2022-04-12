import React, {useCallback, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import AUTH from './reducers/api/Auth/auth';
import {useIdleTimer} from 'react-idle-timer';
import TemplateExample from './pages/TemplateExample';
import FormExample from './pages/FormExample';
import {removeCookies} from './utils/cookies';
import setAuthorizationToken from './utils/setAuthorizationToken';

setAuthorizationToken();

const App = () => {
	const dispatch = useDispatch();
	const {isLoggedIn, userAuth} = useSelector(AUTH.selector);

	const logout = useCallback(() => {
		if (isLoggedIn) {
			dispatch(AUTH.asyncAction.logoutAction());
		}
	}, [dispatch, isLoggedIn]);

	const refreshToken = useCallback(() => {
		if (isLoggedIn) {
			reset(); // 사용자 감지동안은 timeout 1시간 유지
			const remainingTime =
				userAuth.expires_in -
				Math.ceil(
					(Date.now() - Date.parse(userAuth.create_date)) / 1000,
				);

			if (remainingTime < 60 * 10) {
				//10min = 10min * 60sec
				dispatch(AUTH.asyncAction.refreshTokenAction());
			}
		}
	}, [isLoggedIn, userAuth, dispatch]);

	const {reset, pause} = useIdleTimer({
		timeout: userAuth?.expires_in * 1000,
		onActive: logout,
		onAction: refreshToken,
		debounce: 5 * 60 * 100, //5min = 5min * 60sec * default(100)
	});

	useEffect(() => {
		if (isLoggedIn) {
			reset();
		} else {
			pause();
		}
	}, [isLoggedIn]);

	useEffect(() => {
		return () => {
			// removeCookies('refresh_token');
			// localStorage.removeItem('access_token');
		};
	}, []);

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
				{/*<PrivateRouteWithLayout*/}
				{/*	path='/roles/add'*/}
				{/*	component={Role}*/}
				{/*	layout={IamLayout}*/}
				{/*/>*/}

				<PrivateRouteWithLayout
					path='/policies/add'
					exact
					component={Policy}
					layout={IamLayout}
				/>

				<PrivateRouteWithLayout
					path='/policies/:type/:id'
					component={Policy}
					layout={IamLayout}
				/>
				<PrivateRouteWithLayout
					path='/policies'
					component={Policy}
					layout={IamLayout}
				/>
				{/* todo : 템플릿 예시 (TemplateExample) 삭제예정 */}
				<PrivateRouteWithLayout
					path='/template'
					component={TemplateExample}
					layout={IamLayout}
				/>
				{/* todo : formik 예시 (FormExample) 삭제예정 */}
				<PrivateRouteWithLayout
					path='/form'
					component={FormExample}
					layout={IamLayout}
				/>

				<PublicRoute path='/login/:companyId' component={Login} />
				<PublicRoute
					path={'/altauthredirect/google'}
					component={AltAuthRedirect}
				/>
				<PublicRoute
					path={'/altauthredirect/naver'}
					component={AltAuthRedirect}
				/>
				<PublicRoute
					path={'/altauthredirect/kakao'}
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
