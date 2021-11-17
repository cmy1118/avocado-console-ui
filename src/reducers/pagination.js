import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'PAGINATION',
	initialState: {
		page: {},
	},
	reducers: {
		setPage: (state, {payload}) => {
			state.page[payload.tableKey] = payload.element;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.page,
	(page) => {
		return {
			page,
		};
	},
);

// NAME 의 value 값으로 변수명 선언
const PAGINATION = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default PAGINATION;
