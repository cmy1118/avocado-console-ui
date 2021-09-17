import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {usersSelector} from '../../../reducers/users';
import {statusReader} from '../../../utils/reader';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserDescriptionSpace = ({userId}) => {
	const history = useHistory();

	const {users} = useSelector(usersSelector.all);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	// if userId does not exist, direct to 404 page
	useEffect(() => {
		if (userId && !user) {
			history.push('/404');
		}
	}, [userId, user]);

	return (
		<IamContainer>
			<div>
				<PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/user'>사용자</Link>
					<div>{' > '}</div>
					<Link to={`/user/${userId}`}>{user?.id}</Link>
				</PathContainer>
			</div>
			<_Title>
				<div>요약 [ {user?.id} ]</div>
				<button>삭제</button>
			</_Title>

			<ul>
				<li>사용자 : {user?.name}</li>
				<li>사용자 계정 상태 : {statusReader(user?.status)}</li>
				<li>마지막 콘솔 로그인 : {user?.lastConsoleLogin}</li>
				<li>생성 일시 : {user?.creationDate}</li>
				<li>계정 사용기간 : ??</li>
				<li>비밀번호 사용기간 :??</li>
			</ul>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
