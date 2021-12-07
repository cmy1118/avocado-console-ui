import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store, {persistor} from './store/configureStore';
import './styles/default.scss';
import {PersistGate} from 'redux-persist/integration/react';
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
