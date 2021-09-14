import {createSelector, createSlice} from '@reduxjs/toolkit';
import faker from 'faker';
const slice = createSlice({
	name: 'users',
	initialState: {
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		users: Array(20)
			.fill()
			.map((v, i) => ({
				id: faker.datatype.uuid(),
				name: faker.name.findName(),
				groups: [],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: faker.date.future(),
				tags: [],
				lastConsoleLogin: faker.date.past(),
				creationDate: faker.date.past(),
			})),
	},
	reducers: {
		loadUsers: (state, action) => {
			state.users.push(
				...Array(20)
					.fill()
					.map((v, i) => ({
						id: faker.datatype.uuid(),
						name: faker.name.findName(),
						groups: [],
						status: 0,
						authType: 'ID/PW',
						MFA: null,
						passwordExpiryTime: faker.date.future(),
						tags: [],
						lastConsoleLogin: faker.date.past(),
						creationDate: faker.date.past(),
					})),
			);
		},
	},
});

const selectAllState = createSelector(
	(state) => state.users,
	(users) => {
		return {
			users,
		};
	},
);

export const usersSelector = {
	all: (state) => selectAllState(state[USERS]),
};
export const USERS = slice.name;
export const usersReducer = slice.reducer;
export const usersAction = slice.actions;
