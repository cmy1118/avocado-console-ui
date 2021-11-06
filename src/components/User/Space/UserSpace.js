import React, {useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {
	AppBarButtons,
	AppBarContents,
	AppBarNavi,
	IamContainer,
	PathContainer,
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
import {NaviLink} from '../../../styles/components/link';
import TableOptionsBar from '../../Table/TableOptionsBar';
import TableContainer from '../../Table/TableContainer';

const UserSpace = () => {
	const history = useHistory();

	const [select, setSelect] = useState({});
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);

	const data = useMemo(() => {
		return users.map((v) => ({
			...v,
			groups: groupsConverter(
				v.groups.map(
					(val) => groups.find((val2) => val2.id === val).name,
				),
			),
			passwordExpired: passwordExpiredConverter(v.passwordExpired),
			tags: tagsConverter(v.tags),
		}));
	}, [users, groups]);

	const onClickLinkToAddUserPage = useCallback(() => {
		history.push('/users/add');
	}, [history]);

	/******************************************/
	/* roberto : Table_update
    /******************************************/
	const onClickDeleteUsers = useCallback(() => {}, [select]);
	/******************************************/

	return (
		<IamContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM </NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/users'>사용자 </NaviLink>
				</PathContainer>
				{/*<HoverIconButton onClick={onClickCloseAside}>*/}
				{/*	{errorIcon}*/}
				{/*</HoverIconButton>*/}
			</AppBarNavi>

			<AppBarContents>
				<div>사용자 :{users.length}</div>
				<AppBarButtons>
					<NormalButton onClick={onClickLinkToAddUserPage}>
						사용자 생성
					</NormalButton>
					<TransparentButton onClick={onClickDeleteUsers}>
						삭제
					</TransparentButton>
				</AppBarButtons>
			</AppBarContents>

			<TableContainer
				tableKey={tableKeys.users.basic}
				columns={tableColumns[tableKeys.users.basic]}
				data={data}
			>
				<TableOptionsBar isSearchFilterable />
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
