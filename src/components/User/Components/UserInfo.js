import React, {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import {usersSelector} from '../../../reducers/users';
import {TabContentsTitle} from '../../../styles/components/tab';

const UserInfo = ({userId}) => {
	const {users} = useSelector(usersSelector.all);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickChangeUser = useCallback(() => {}, []);

	const onClickChangePassword = useCallback(() => {});

	return (
		<div>
			<TabContentsTitle>
				기본 정보
				<button onClick={onClickChangeUser}>저장</button>
			</TabContentsTitle>

			<ul>
				<li>
					사용자 ID: <input value={user.id} readOnly />
				</li>
				<li>
					사용자 이름: <input value={user.name} readOnly />
				</li>
				<li>
					사용자 비밀번호 : <input value={'**********'} readOnly />
					<button onClick={onClickChangePassword}>
						비밀번호 변경
					</button>
				</li>
				<li>
					이메일 주소 : <input value={user.email} readOnly />
				</li>
				<li>
					전화번호 :<input value={user.telephone} readOnly />
				</li>
				<li>
					모바일 번호 : <input value={user.mobile} readOnly />
				</li>
			</ul>
		</div>
	);
};

UserInfo.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfo;
