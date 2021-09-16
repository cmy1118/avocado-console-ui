import {createSelector, createSlice} from '@reduxjs/toolkit';
import faker from 'faker';
import {useMemo} from 'react';
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
				passwordExpiryTime: String(faker.date.future()),
				// passwordExpiryTime: 1,
				tags: [],
				lastConsoleLogin: String(faker.date.past()),
				creationDate: String(faker.date.past()),
			})),

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
			console.log('faker.date.future():', faker.date.future());
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
						passwordExpiryTime: String(faker.date.future()),
						// passwordExpiryTime: 1,
						tags: [],
						lastConsoleLogin: String(faker.date.past()),
						creationDate: String(faker.date.past()),
					})),
			);
			state.columns;
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
