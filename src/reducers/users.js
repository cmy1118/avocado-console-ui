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
				groups: [],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime:
					'Sat Apr 30 2022 20:22:08 GMT+0900 (일본 표준시)',
				tags: [],
				lastConsoleLogin:
					'Tue Oct 20 2020 20:44:02 GMT+0900 (일본 표준시)',
				creationDate: 'Tue Oct 20 2020 20:44:02 GMT+0900 (일본 표준시)',
			},
			{
				uid: 'user2',
				id: 'seob717',
				name: '심유섭',
				email: 'seob717@netand.co.kr',
				telephone: '010-9688-5549',
				mobile: '010-9688-5549',
				groups: [],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime:
					'Sat Apr 30 2022 20:22:08 GMT+0900 (일본 표준시)',
				tags: [],
				lastConsoleLogin:
					'Tue Oct 20 2020 20:44:02 GMT+0900 (일본 표준시)',
				creationDate: 'Tue Oct 20 2020 20:44:02 GMT+0900 (일본 표준시)',
			},
			{
				uid: 'user3',
				id: 'roberto',
				name: '박건욱',
				email: 'roberto@netand.co.kr',
				telephone: '010-2225-1154',
				mobile: '010-2225-1154',
				groups: [],
				status: 0,
				authType: 'ID/PW',
				MFA: null,
				passwordExpiryTime:
					'Sat Apr 30 2022 20:22:08 GMT+0900 (일본 표준시)',
				tags: [],
				lastConsoleLogin:
					'Tue Oct 20 2020 20:44:02 GMT+0900 (일본 표준시)',
				creationDate: 'Tue Oct 20 2020 20:44:02 GMT+0900 (일본 표준시)',
			},
			...Array(50)
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
		],

		usersColumns: [
			// accessor : 해당 열을 data 객체의 어느 속성을 읽어야하는지를 명시
			// Header   : 테이블 헤더에 보여줄 텍스트를 명시
			{
				accessor: 'id',
				Header: '사용자계정',
			},
			{
				accessor: 'name',
				Header: '이름',
			},
			{
				accessor: 'groups',
				Header: '그룹',
			},
			{
				accessor: 'status',
				Header: '계정상태',
			},
			{
				accessor: 'authType',
				Header: '인증유형',
			},
			{
				accessor: 'MFA',
				Header: 'MFA',
			},
			{
				accessor: 'passwordExpiryTime',
				Header: '비밀번호 수명',
			},
			{
				accessor: 'tags',
				Header: '태그',
			},
			{
				accessor: 'lastConsoleLogin',
				Header: '마지막 콘솔 로그인',
			},
			{
				accessor: 'creationDate',
				Header: '생성 일시',
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
	},
});

const selectAllState = createSelector(
	(state) => state.users,
	(state) => state.usersColumns,
	(users, usersColumns) => {
		return {
			users,
			usersColumns,
		};
	},
);

export const usersSelector = {
	all: (state) => selectAllState(state[USERS]),
};
export const USERS = slice.name;
export const usersReducer = slice.reducer;
export const usersAction = slice.actions;
