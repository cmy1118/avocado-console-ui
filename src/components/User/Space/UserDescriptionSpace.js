import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {usersSelector} from '../../../reducers/users';
import {statusConverter} from '../../../utils/tableDataConverter';
import {Tab, TabItem} from '../../../styles/components/tab';
import UserInfo from '../Components/UserInfo';
import UserGroups from '../Components/UserGroups';
import queryString from 'querystring';

const _Title = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserDescriptionSpace = ({userId}) => {
	const history = useHistory();
	const {search} = useLocation();
	const {users} = useSelector(usersSelector.all);

	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: `/users/${userId}`,
				search: `tabs=${v}`,
			});
		},
		[],
	);

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
					<Link to='/users'>사용자</Link>
					<div>{' > '}</div>
					<Link to={`/users/${userId}`}>{user?.id}</Link>
				</PathContainer>
			</div>

			<div>
				<_Title>
					<div>요약 [ {user?.id} ]</div>
					<button>삭제</button>
				</_Title>

				<ul>
					<li>사용자 : {user?.name}</li>
					<li>사용자 계정 상태 : {statusConverter(user?.status)}</li>
					<li>마지막 콘솔 로그인 : {user?.lastConsoleLogin}</li>
					<li>생성 일시 : {user?.creationDate}</li>
					<li>계정 사용기간 : ??</li>
					<li>비밀번호 사용기간 :??</li>
				</ul>
			</div>

			<div>
				<Tab>
					<TabItem onClick={onClickChangeTab('user')}>정보</TabItem>
					<TabItem onClick={onClickChangeTab('group')}>그룹</TabItem>
					<TabItem onClick={onClickChangeTab('role')}>권한</TabItem>
					<TabItem onClick={onClickChangeTab('tag')}>태그</TabItem>
				</Tab>

				{queryString.parse(search).tabs === 'user' && (
					<UserInfo userId={userId} />
				)}
				{queryString.parse(search).tabs === 'group' && (
					<UserGroups userId={userId} />
				)}
				{queryString.parse(search).tabs === 'role' && <div>role</div>}
				{queryString.parse(search).tabs === 'tag' && <div>tag</div>}
			</div>
		</IamContainer>
	);
};

UserDescriptionSpace.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserDescriptionSpace;
