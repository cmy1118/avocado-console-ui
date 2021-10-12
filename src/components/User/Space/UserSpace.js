import React, {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';

import TableContainer from '../../Table/TableContainer';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import CURRENT_TARGET from '../../../reducers/currentTarget';

const UserSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {users} = useSelector(IAM_USER.selector);
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	/******************************************/
	/* roberto : Table_update
    /******************************************/
	const onClickDeleteUsers = useCallback(() => {
		dispatch(IAM_USER.action.deleteUser({currentTarget}));
	}, [dispatch, currentTarget]);
	/******************************************/

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/users'>사용자</Link>
			</PathContainer>

			<SubTitle>
				<div>사용자: {users.length}</div>
				<div>
					<button onClick={onClickLinkToAddUserPage}>
						사용자 생성
					</button>
					<button onClick={onClickDeleteUsers}>삭제</button>
				</div>
			</SubTitle>
			<TableContainer
				tableKey='users'
				isPageable={true}
				isNumberOfRowsAdjustable={true}
				isColumnFilterable={true}
				isSortable={true}
				isSelectable={true}
			/>
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
