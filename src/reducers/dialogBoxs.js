import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'dialogBox',
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

export const dialogBoxSelector = {
	all: (state) => selectAllState(state[DIALOG_BOX]),
};

export const DIALOG_BOX = slice.name;
export const dialogBoxReducer = slice.reducer;
export const dialogBoxAction = slice.actions;
