import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'PAGINATION',
	initialState: {
		page: {},
		initialPage: 'elements=0-100',
	},
	reducers: {
		setPage: (state, {payload}) => {
			state.page[payload.tableKey] = payload.element;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.page,
	(state) => state.initialPage,
	(page, initialPage) => {
		return {
			page,
			initialPage,
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
