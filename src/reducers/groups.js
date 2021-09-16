import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'groups',
	initialState: {
		groupTypeIndex: 0,
		groupIndex: 0,

		groupTypes: [
			{
				id: 'groupType1',
				name: '사용자 레벨',
				description: '사용자 권한 레벨을 분류하기 위한 유형',
				creationDate: '2021.03.02 15:55:32',
			},
			{
				id: 'groupType2',
				name: '직무',
				description: '사용자의 직무 유형',
				creationDate: '2021.03.02 15:55:32',
			},
		],

		groups: [
			{
				id: 'group1',
				name: 'User',
				clientGroupTypeId: 'groupType1',
				members: [],
				roles: [],
				parentId: null,
				path: '/group1',
				creationDate: '2021.05.02 15:55:32',
			},
			{
				id: 'group2',
				name: 'Manager',
				clientGroupTypeId: 'groupType1',
				members: [],
				roles: [],
				parentId: null,
				path: '/group2',
				creationDate: '2021.05.02 15:55:32',
			},
			{
				id: 'group3',
				name: 'Admin',
				clientGroupTypeId: 'groupType1',
				members: [],
				roles: [],
				parentId: null,
				path: '/group3',
				creationDate: '2021.05.02 15:55:32',
			},
			{
				id: 'group4',
				name: 'Develop',
				clientGroupTypeId: 'groupType2',
				members: [],
				roles: [],
				parentId: null,
				path: '/group4',
				creationDate: '2021.05.02 15:55:32',
			},
			{
				id: 'group5',
				name: 'Operation',
				clientGroupTypeId: 'groupType2',
				members: [],
				roles: [],
				parentId: null,
				path: '/group5',
				creationDate: '2021.05.02 15:55:32',
			},
			{
				id: 'group6',
				name: '전략실',
				clientGroupTypeId: 'groupType3',
				members: [],
				roles: [],
				parentId: null,
				path: '/group6',
				creationDate: '2021.05.02 15:55:32',
			},
			{
				id: 'group7',
				name: '경영',
				clientGroupTypeId: 'groupType3',
				members: [],
				roles: [],
				parentId: null,
				path: '/group7',
				creationDate: '2021.05.02 15:55:32',
			},
		],
	},
	reducers: {
		addGroup: (state, action) => {
			state.groups.unshift({
				id: 'group_' + state.groupIndex.toString(),
				name: action.payload.name,
				clientGroupTypeId: action.payload.type,
				members: [],
				roles: [],
				parentId: null,
				creationDate: String(new Date()),
			});
			state.groupIndex++;
		},

		addGroupType: (state, action) => {
			state.groups.unshift({
				id: 'groupType_' + state.groupTypeIndex.toString(),
				name: action.payload.name,
				description: action.payload.description,
				creationDate: String(new Date()),
			});
			state.groupTypeIndex++;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.groupTypeIndex,
	(state) => state.groupIndex,
	(state) => state.groupTypes,
	(state) => state.groups,

	(groupTypeIndex, groupIndex, groupTypes, groups) => {
		return {
			groupTypeIndex,
			groupIndex,
			groupTypes,
			groups,
		};
	},
);

export const groupsSelector = {
	all: (state) => selectAllState(state[GROUPS]),
};
export const GROUPS = slice.name;
export const groupsReducer = slice.reducer;
export const groupsAction = slice.actions;
