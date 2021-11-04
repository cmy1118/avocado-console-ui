import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';

import rootReducer from '../reducers';

const store = configureStore({
	reducer: rootReducer,
	// todo : 미들웨어 필요시 설치 및 설정
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({serializableCheck: false}),
	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
