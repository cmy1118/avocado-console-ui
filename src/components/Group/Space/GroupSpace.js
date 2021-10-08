import React, {useCallback} from 'react';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import {Link, useHistory} from 'react-router-dom';
import TableContainer from '../../Table/TableContainer';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';

const GroupSpace = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {users} = useSelector(IAM_USER.selector);

	const onCLickLinkToAddGroup = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	return (
		<IamContainer>
			<PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/groups'>사용자 그룹</Link>
			</PathContainer>
			<SubTitle>
				<div>사용자 그룹: {groups.length} </div>
				<div>
					<button onClick={onCLickLinkToAddGroup}>그룹 생성</button>
					<button>삭제</button>
				</div>
			</SubTitle>
			<TableContainer tableKey='groups' />
		</IamContainer>
	);
};

export default GroupSpace;
