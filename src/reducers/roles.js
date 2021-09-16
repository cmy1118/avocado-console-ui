import {createSelector, createSlice} from '@reduxjs/toolkit';
import faker from 'faker';
const slice = createSlice({
	name: 'roles',
	initialState: {
		roleIndex: 0,
		roles: [],
	},
	reducers: {},
});

const selectAllState = createSelector(
	(state) => state.roles,

	(roles) => {
		return {
			roles,
		};
	},
);

export const rolesSelector = {
	all: (state) => selectAllState(state[ROLES]),
};
export const ROLES = slice.name;
export const rolesReducer = slice.reducer;
export const rolesAction = slice.actions;
