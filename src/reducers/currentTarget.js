import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'CURRENT_TARGET',
	initialState: {
		user: {
			data: [],
			groups: [],
			roles: [],
			tags: [
				// 특정 유저가 존재하지 않는경우 임시로 데이터를 저장하기 위한 공간
				{name: 'level', value: 'Admin', permissions: [1, 2, 3]},
				{name: 'type', value: 'white', permissions: [1]},
			],
		},
		group: {
			data: [],
			users: [],
			roles: [],
			tags: [],
		},
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
		addTagDataOnAddUser: (state) => {
			const lastData = state.user.tags.slice().pop();
			console.log({...lastData});
			let isExistEmptyValue = false;
			Object.keys(lastData).forEach((v) => {
				// 권한, 권한 수는 policy가 완료되면 수정이 필요. 우선은 빈 값 체크에서 제외.
				if (!lastData[v] && v !== 'permissions') {
					isExistEmptyValue = true;
				}
			});

			if (isExistEmptyValue) {
				console.log('빈 값이 존재합니다.');
			} else {
				const newData = {
					name: '',
					value: '',
					permissions: [],
				};
				state.user.tags.push(newData);
			}
		},
		deleteTagDataOnAddUser: (state, {payload}) => {
			if (!payload) return;
			for (let value of payload) {
				state.user.tags.splice(value, 1);
			}
		},
		saveTagDataOnAddUser: (state, {payload}) => {
			state.user.tags = payload.map((v) => {
				return {
					name: v.name,
					value: v.value,
					permissions: v.permissions,
				};
			});
		},
		//
		addTagDataOnAddGroup: (state) => {
			const newData = {
				name: '',
				value: '',
				permissions: [],
			};
			state.group.tags.push(newData);
		},
		deleteTagDataOnAddGroup: (state, {payload}) => {
			if (!payload) return;
			for (let value of payload) {
				state.group.tags.splice(value, 1);
			}
		},
		saveTagDataOnAddGroup: (state, {payload}) => {
			state.group.tags = payload;
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
