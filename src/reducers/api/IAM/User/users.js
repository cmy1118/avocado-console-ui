import {createSelector, createSlice} from '@reduxjs/toolkit';
import faker from 'faker';
const slice = createSlice({
	name: 'users',
	initialState: {
		userIndex: 0,
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		users: [],
		userTags: [
			{
				uid: 'user1',
				name: 'abc',
				value: 'abc',
				permissions: ['a', 'b', 'c'],
			},
			{
				uid: 'user1',
				name: 'a',
				value: 'a',
				permissions: ['a'],
			},
		],
	},
	reducers: {
		loadUsers: (state, action) => {
			state.users.push(
				...Array(30)
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
						passwordExpiryTime: String(faker.date.future()),
						// passwordExpiryTime: 1,
						tags: [],
						lastConsoleLogin: String(faker.date.past()),
						creationDate: String(faker.date.past()),
					})),
			);
			state.columns;
		},
		addUser: (state, action) => {
			state.users.unshift({
				uid: action.payload.id + '_' + state.userIndex.toString(),
				id: action.payload.id,
				name: action.payload.name,
				email: action.payload.email,
				telephone: action.payload.telephone,
				mobile: action.payload.mobile,
				groups: [],
				status: 5,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: String(faker.date.future()),
				tags: [],
				lastConsoleLogin: null,
				creationDate: String(new Date()),
			});
			state.userIndex++;
		},
		/******************************************/
		/* roberto : Table_update 삭제 기능추가
		/*
        /******************************************/

		deleteUser: (state, action) => {
			let users = state.users;
			action.payload.currentTarget.map((target) => {
				users = onDeleteUser(users, target);
			});
			state.users = users;
		},
		/******************************************/
	},
});

/******************************************/
/* roberto : Table_update 삭제 기능추가
/*
/******************************************/
function onDeleteUser(users, target) {
	users.map((u, index) => {
		u.id === target.id ? users.splice(index, 1) : '';
	});
	return users;
}
/******************************************/

const selectAllState = createSelector(
	(state) => state.users,
	(state) => state.userTags,
	(users, userTags) => {
		return {
			users,
			userTags,
		};
	},
);

export const usersSelector = {
	all: (state) => selectAllState(state[USERS]),
};
export const USERS = slice.name;
export const usersReducer = slice.reducer;
export const usersAction = slice.actions;
