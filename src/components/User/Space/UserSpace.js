import React, {useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
	AppBarButtons,
	AppBarContents,
	AppBarNavi,
	IamContainer,
	PathContainer,
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
import {tableColumns} from '../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {tableKeys} from '../../../Constants/Table/keys';
import {errorIcon} from '../../../icons/icons';
import {HoverIconButton} from '../../../styles/components/icons';
import {NaviLink} from '../../../styles/components/link';
import {onClickCloseAside} from '../../Aside/Aside';

const UserSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [select, setSelect] = useState([]);
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
		console.log(select);
		console.log('여기서 api 요청');
	}, [select]);
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

			<Table
				tableKey={tableKeys.users.basic}
				columns={tableColumns[tableKeys.users.basic]}
				data={data}
				isSearchFilterable
				isPageable
				isNumberOfRowsAdjustable
				isColumnFilterable
				isSortable
				isSelectable
				isSearchable
				setSelect={setSelect}
			/>
		</IamContainer>
	);
};
UserSpace.propTypes = {};
export default UserSpace;
