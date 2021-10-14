import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'CURRENT_TARGET',
	initialState: {
		user: {
			data: [],
			groups: [],
			roles: [],
			tags: [
				{name: 'level', value: 'Admin', roles: [1, 2, 3]},
				{name: 'type', value: 'white', roles: [1]},
			],
		},
		group: {data: [], users: [], roles: [], tags: []},
		role: {},
		currentTarget: {},
	},

	reducers: {
		changeSelectedRows: (state, action) => {
			state.currentTarget[action.payload.tableKey] =
				action.payload.selected;
		},

		setSelectedRows: (state, action) => {
			delete state.currentTarget[action.payload.tableKey];
		},

		addRolesToUser: (state, action) => {
			state.user.roles = state.user.roles.concat(
				state.currentTarget[action.payload.from],
			);
		},

		deletedRolesFromUser: (state, action) => {
			state.user.roles = state.user.roles.filter(
				(v) => !state.currentTarget[action.payload.from].includes(v),
			);
		},

		// tags
		addTagData: (state) => {
			const newData = {
				name: '',
				value: '',
				roles: [],
			};
			state.user.tags.push(newData);
		},
		deleteTagData: (state, {payload}) => {
			for (let value of payload) {
				state.user.tags.splice(value, 1);
			}
		},
		saveTagData: (state, {payload}) => {
			state.user.tags = payload;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.currentTarget,
	(state) => state.user,
	(state) => state.group,
	(state) => state.role,
	(currentTarget, user, group, role) => {
		return {
			currentTarget,
			user,
			group,
			role,
		};
	},
);

const CURRENT_TARGET = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default CURRENT_TARGET;
