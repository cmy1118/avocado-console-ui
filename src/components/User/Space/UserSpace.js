import React, {useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {
	AppBarButtons,
	SubHeader,
	IamContainer,
} from '../../../styles/components/style';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {
	groupsConverter,
	passwordExpiredConverter,
	tagsConverter,
} from '../../../utils/tableDataConverter';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import Table from '../../Table/Table';
import {tableColumns} from '../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {tableKeys} from '../../../Constants/Table/keys';
import {
	CurrentPathContainer,
	PathLink,
	NextPath,
} from '../../../styles/components/currentPath';
import TableOptionsBar from '../../Table/TableOptionsBar';
import TableContainer from '../../Table/TableContainer';
import styled from 'styled-components';

const _IamContainer = styled(IamContainer)`
	height: 0;
`;

const UserSpace = () => {
	const history = useHistory();

	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);

	const [select, setSelect] = useState({});

	const userData = useMemo(() => {
		return users.map((v) => ({
			...v,
			groups: groupsConverter(
				v.groups.map(
					(val) => groups.find((val2) => val2.id === val).name,
				),
			),
			passwordExpiryTime: passwordExpiredConverter(v.passwordExpired),
			tags: tagsConverter(v.tags),
		}));
	}, [users, groups]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	const onClickDeleteUsers = useCallback(() => {}, []);

	return (
		<_IamContainer>
			<CurrentPathContainer>
				<PathLink to='/iam'>IAM </PathLink>
				<NextPath>{' > '}</NextPath>
				<PathLink to='/users'>사용자 </PathLink>
			</CurrentPathContainer>

			<SubHeader>
				<div>사용자 : {users.length}</div>
				<AppBarButtons>
					<NormalButton onClick={onClickLinkToAddUserPage}>
						사용자 생성
					</NormalButton>
					<TransparentButton
						margin={'0px 0px 0px 5px'}
						onClick={onClickDeleteUsers}
					>
						삭제
					</TransparentButton>
				</AppBarButtons>
			</SubHeader>

			<TableContainer
				tableKey={tableKeys.users.basic}
				columns={tableColumns[tableKeys.users.basic]}
				data={userData}
			>
				<TableOptionsBar isSearchFilterable />
				<Table setSelect={setSelect} />
			</TableContainer>
		</_IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
