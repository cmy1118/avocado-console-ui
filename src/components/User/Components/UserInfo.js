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
					사용자 ID: <input value={user.id} />
				</li>
				<li>
					사용자 이름: <input value={user.name} />
				</li>
				<li>
					사용자 비밀번호 : <input value={'**********'} />
					<button onClick={onClickChangePassword}>
						비밀번호 변경
					</button>
				</li>
				<li>
					이메일 주소 : <input value={user.email} />
				</li>
				<li>
					전화번호 :<input value={user.telephone} />
				</li>
				<li>
					모바일 번호 : <input value={user.mobile} />
				</li>
			</ul>
		</div>
	);
};

UserInfo.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfo;
