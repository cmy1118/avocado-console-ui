import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'SETTING',
	initialState: {
		theme: 'light', // light, dark
		language: 'ko-KR', // language ko-KR - korean, en-US - english
		data1: [
			{
				id: 'id1',
				name: 'name1',
			},
			{
				id: 'id2',
				name: 'name2',
			},
			{
				id: 'id3',
				name: 'name3',
			},
			{
				id: 'id4',
				name: 'name4',
			},
		],
		data2: [
			{
				id: 'id5',
				name: 'name5',
			},
			{
				id: 'id6',
				name: 'name6',
			},
			{
				id: 'id7',
				name: 'name7',
			},
			{
				id: 'id8',
				name: 'name8',
			},
		],
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		changeTable: (state, action) => {
			console.log(action.payload);
			if (action.payload.start === 'table1') {
				const data = state.data1.find(
					(v) => v.id === action.payload.id,
				);
				console.log(JSON.stringify(data));
				state.data2.push(data);
				state.data1 = state.data1.filter(
					(x) => x.id !== action.payload.id,
				);
			} else if (action.payload.start === 'table2') {
				const data = state.data2.find(
					(v) => v.id === action.payload.id,
				);
				console.log(JSON.stringify(data));

				state.data1.push(data);
				state.data2 = state.data2.filter(
					(x) => x.id !== action.payload.id,
				);
			}
		},
	},
});

const selectAllState = createSelector(
	(state) => state.theme,
	(state) => state.language,
	(state) => state.data1,
	(state) => state.data2,
	(theme, language, data1, data2) => {
		return {
			theme,
			language,
			data1,
			data2,
		};
	},
);

// NAME 의 value 값으로 변수명 선언
const SETTING = {
	name: slice.name,
	reducer: slice.reducer,
	selector: (state) => selectAllState(state[slice.name]),
	action: slice.actions,
	asyncAction: {},
};

export default SETTING;
