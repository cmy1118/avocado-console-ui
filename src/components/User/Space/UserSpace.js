import React, {useCallback, useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
	IamContainer,
	PathContainer,
	SubTitle,
} from '../../../styles/components/style';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {
	groupsConverter,
	passwordExpiryTimeConverter,
	tagsConverter,
} from '../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import Table from '../../Table/Table';
import {getColumnsAsKey} from '../../../utils/TableColumns';
import {tableKeys} from '../../../utils/data';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';

const UserSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);

	const data = useMemo(() => {
		return users.map((v) => ({
			...v,
			groups: groupsConverter(
				v.groups.map(
					(val) => groups.find((val2) => val2.id === val).name,
				),
			),
			passwordExpiryTime: passwordExpiryTimeConverter(
				v.passwordExpiryTime,
			),
			tags: tagsConverter(v.tags),
		}));
	}, [users, groups]);

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
					<NormalButton onClick={onClickLinkToAddUserPage}>
						사용자 생성
					</NormalButton>
					<TransparentButton onClick={onClickDeleteUsers}>
						삭제
					</TransparentButton>
				</div>
			</SubTitle>
			<Table
				tableKey={tableKeys.users}
				columns={getColumnsAsKey[tableKeys.users]}
				data={data}
				isSearchFilterable
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
			/>
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
