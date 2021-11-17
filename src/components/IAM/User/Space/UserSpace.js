import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER from '../../../../reducers/api/IAM/User/User/user';
import {
	groupsConverter,
	passwordExpiredConverter,
	statusConverter,
	tagsConverter,
} from '../../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import Table from '../../../Table/Table';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {tableKeys} from '../../../../Constants/Table/keys';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import TableOptionsBar from '../../../Table/TableOptionsBar';
import TableContainer from '../../../Table/TableContainer';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import PAGINATION from '../../../../reducers/pagination';

const UserSpace = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {page} = useSelector(PAGINATION.selector);
	const [select, setSelect] = useState({});

	const userData = useMemo(() => {
		return users.map((v) => ({
			...v,
			groupIds: groupsConverter(v.groupIds || []),
			status: statusConverter(v.status.code),
		}));
	}, [users]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	const onClickDeleteUsers = useCallback(() => {}, []);

	useEffect(() => {
		if (page[tableKeys.users.basic]) {
			dispatch(
				IAM_USER.asyncAction.findAllAction({
					range: page[tableKeys.users.basic],
				}),
			);
		}
	}, [dispatch, page]);

	return (
		<IamContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM </CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/users'>사용자 </CurrentPathBarLink>
			</CurrentPathBar>

			<TitleBar>
				<div>사용자 : {users.length}</div>
				<TitleBarButtons>
					<NormalButton onClick={onClickLinkToAddUserPage}>
						사용자 생성
					</NormalButton>
					<TransparentButton
						margin={'0px 0px 0px 5px'}
						onClick={onClickDeleteUsers}
					>
						삭제
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>

			<TableContainer
				tableKey={tableKeys.users.basic}
				columns={tableColumns[tableKeys.users.basic]}
				data={userData}
			>
				<TableOptionsBar isSearchFilterable />
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
