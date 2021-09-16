import {createSelector, createSlice} from '@reduxjs/toolkit';
import faker from 'faker';
const slice = createSlice({
	name: 'users',
	initialState: {
		user_index: 0,
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		users: Array(20)
			.fill()
			.map(() => ({
				uid: faker.datatype.uuid(),
				id: faker.datatype.uuid(),
				name: faker.name.findName(),
				email: faker.internet.email(),
				telephone: faker.phone.phoneNumber(),
				mobile: faker.phone.phoneNumber(),
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
					.map(() => ({
						uid: faker.datatype.uuid(),
						id: faker.datatype.uuid(),
						name: faker.name.findName(),
						email: faker.internet.email(),
						telephone: faker.phone.phoneNumber(),
						mobile: faker.phone.phoneNumber(),
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
		addUser: (state, action) => {
			state.users.push({
				uid: action.payload.id + '_' + state.user_index.toString(),
				id: action.payload.id,
				name: action.payload.name,
				email: action.payload.email,
				telephone: action.payload.telephone,
				mobile: action.payload.mobile,
				groups: [],
				status: 5,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: faker.date.future(),
				tags: [],
				lastConsoleLogin: null,
				creationDate: new Date(),
			});
			state.user_index++;
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
