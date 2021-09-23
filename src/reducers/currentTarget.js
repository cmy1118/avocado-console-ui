import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'currentTarget',
	initialState: {
		currentTarget: [''],
	},

	reducers: {
		setCurrentTarget: (state, action) => {
			state.currentTarget = action.payload;
		},
	},

	extraReducers: {},
});

const selectAllState = createSelector(
	(state) => state.currentTarget,

	(currentTarget) => {
		return {
			currentTarget,
		};
	},
);

export const currentTargetSelector = {
	all: (state) => selectAllState(state[CURRENT_TARGET]),
};
export const CURRENT_TARGET = slice.name;
export const currentTargetReducer = slice.reducer;
export const currentTargetAction = slice.actions;
