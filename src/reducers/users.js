import {createSelector, createSlice} from '@reduxjs/toolkit';
import faker from 'faker';
const slice = createSlice({
	name: 'users',
	initialState: {
		userIndex: 0,
		//groups, authType, MFA, tags, lastConsoleLogin, creationDate는 다른 곳으로 빠질 예정 => 아직 다른 부분 생성 전이라 users에 추가
		users: [
			{
				uid: 'user1',
				id: 'ambacc244',
				name: '이영애',
				email: 'ambacc244@netand.co.kr',
				telephone: '010-9434-5272',
				mobile: '010-9434-5272',
				groups: ['group2', 'group4', 'group8'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2023.02.12 20:44:02',
				tags: [],
				lastConsoleLogin: '2020.05.12 20:44:02',
				creationDate: '2020.01.12 20:44:02',
			},
			{
				uid: 'user2',
				id: 'seob717',
				name: '심유섭',
				email: 'seob717@netand.co.kr',
				telephone: '010-9688-5549',
				mobile: '010-9688-5549',
				groups: ['group2', 'group4', 'group8'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2023.04.12 20:44:02',
				tags: [],
				lastConsoleLogin: '2020.06.12 20:44:02',
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user3',
				id: 'roberto',
				name: '박건욱',
				email: 'roberto@netand.co.kr',
				telephone: '010-2225-1154',
				mobile: '010-2225-1154',
				groups: ['group3', 'group4', 'group8'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.12.12 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user4',
				id: 'aaa',
				name: '에이',
				email: 'aaa@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group1'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.01.12 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user5',
				id: 'bbb',
				name: '비',
				email: 'bbb@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group1'],
				status: 4,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.03.12 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user6',
				id: 'ccc',
				name: '씨',
				email: 'ccc@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group1'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2021.12.24 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user7',
				id: 'ddd',
				name: '디',
				email: 'ddd@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group1', 'group5'],
				status: 1,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.05.03 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user8',
				id: 'eee',
				name: '이',
				email: 'eee@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group5'],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2023.04.12 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user9',
				id: 'fff',
				name: '에프',
				email: 'fff@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: [],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.07.09 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user10',
				id: 'ggg',
				name: '쥐',
				email: 'ggg@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group6'],
				status: 2,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.12.30 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
			{
				uid: 'user11',
				id: 'hhh',
				name: '에이치',
				email: 'hhh@netand.co.kr',
				telephone: '010-1111-1111',
				mobile: '010-1111-1111',
				groups: ['group6'],
				status: 2,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime: '2022.12.30 20:44:02',
				tags: [],
				lastConsoleLogin: null,
				creationDate: '2020.03.12 20:44:02',
			},
		],
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
