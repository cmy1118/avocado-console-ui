import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'DIALOG_BOX',
	initialState: {
		alert: {open: false},
		form: {open: true, key: 'default'},
	},
	reducers: {
		// openAlert: (state, action) => {
		// 	state.alert = {open: true, key: action.payload.key};
		// },
		// closeAlert: (state) => {
		// 	state.alert = {open: false};
		// },
		openForm: (state, action) => {
			state.form = {open: true, key: action.payload.key};
		},
		closeForm: (state) => {
			state.form = {open: false};
		},
	},
});

const selectAllState = createSelector(
	(state) => state.alert,
	(state) => state.form,
	(alert, form) => {
		return {alert, form};
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
