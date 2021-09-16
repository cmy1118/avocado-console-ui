import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import UserSpace from '../components/User/Space/UserSpace';
import AddUserSpace from '../components/User/Space/AddUserSpace';
import UserDescriptionSpace from '../components/User/Space/UserDescriptionSpace';
import IamLayout from '../components/Layouts/IamLayout';
import {useDispatch, useSelector} from 'react-redux';
import {usersAction, usersSelector} from '../reducers/users';

const User = ({match}) => {
	const dispatch = useDispatch();
	const {users, columns} = useSelector(usersSelector.all);
	/*****************************************************/
	//  칼럼설정
	/*****************************************************/
	// const columns = useMemo(
	// 	() => [
	// 		// accessor : 해당 열을 data 객체의 어느 속성을 읽어야하는지를 명시
	// 		// Header   : 테이블 헤더에 보여줄 텍스트를 명시
	// 		{
	// 			accessor: 'id',
	// 			Header: '사용자계정',
	// 		},
	// 		{
	// 			accessor: 'name',
	// 			Header: '이름',
	// 		},
	// 		{
	// 			accessor: 'groups',
	// 			Header: '그룹',
	// 		},
	// 		{
	// 			accessor: 'status',
	// 			Header: '계정상태',
	// 		},
	// 		{
	// 			accessor: 'authType',
	// 			Header: '인증유형',
	// 		},
	// 		{
	// 			accessor: 'MFA',
	// 			Header: 'MFA',
	// 		},
	// 		{
	// 			accessor: '비밀번호 수명',
	// 			Header: '비밀번호 수명',
	// 		},
	// 		{
	// 			accessor: 'tags',
	// 			Header: '태그',
	// 		},
	// 		{
	// 			accessor: '마지막 콘솔 로그인',
	// 			Header: '마지막 콘솔 로그인',
	// 		},
	// 		{
	// 			accessor: 'day',
	// 			Header: '생성 일시',
	// 		},
	// 	],
	// 	[],
	// );
	/*****************************************************/

	/*****************************************************/
	//  칼럼설정
	/*****************************************************/
	useEffect(() => {
		dispatch(usersAction.loadUsers());
	}, []);
	useEffect(() => {
		console.log('users data', users, columns);
	}, [users, columns]);
	/*****************************************************/

	// const data = useMemo(
	// 	() =>
	// 		Array(20)
	// 			.fill()
	// 			.map(() => ({
	// 				id: faker.datatype.uuid(),
	// 				name: faker.name.findName(),
	// 				groups: [],
	// 				status: 0,
	// 				authType: 'ID/PW',
	// 				MFA: null,
	// 				passwordExpiryTime: faker.date.future(),
	// 				tags: [],
	// 				lastConsoleLogin: faker.date.past(),
	// 				creationDate: faker.date.past(),
	// 			})),
	// 	[],
	// );

	return (
		<IamLayout>
			{match.path === '/user/add' ? (
				<AddUserSpace />
			) : match.params?.id ? (
				<UserDescriptionSpace userId={match.params.id} />
			) : (
				<UserSpace />
			)}
		</IamLayout>
	);
};

User.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};

export default User;
