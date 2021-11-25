import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'DIALOG_BOX',
	initialState: {
		alert: {open: false},
	},
	reducers: {
		openAlert: (state, action) => {
			state.alert = {open: true, key: action.payload.key};
		},
		closeAlert: (state) => {
			state.alert = {open: false};
		},
	},
});

const selectAllState = createSelector(
	(state) => state.alert,
	(alert) => {
		return {alert};
	},
);

// NAME 의 value 값으로 변수명 선언
const DIALOG_BOX = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default DIALOG_BOX;
