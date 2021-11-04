import React, {useState} from 'react';
import {
	AppBarNavi,
	IamContainer,
	PathContainer,
} from '../../../styles/components/style';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';
import ReadOnly from '../Components/ReadOnly';
import {NaviLink} from '../../../styles/components/link';

const AddUserSpace = () => {
	const TableFold={
		AddUserToGroup : false,
		AssignRoleToUser: false,
		AddTagToUser : false,
	}
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState({
		AddUserToGroup : false,
		AssignRoleToUser: false,
		AddTagToUser : false,
	});

	return (
		<IamContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/users'>사용자</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/users/add'>사용자 추가</NaviLink>
				</PathContainer>
				{/*<HoverIconButton onClick={onClickCloseAside}>*/}
				{/*	{errorIcon}*/}
				{/*</HoverIconButton>*/}
			</AppBarNavi>

			<AddUser setIsOpened={setIsOpened} />
			<AddUserToGroup space={'AddUserToGroup'} isFold={isTableFold} setIsFold={setIsTableFold}/>
			<AssignRoleToUser space={'AssignRoleToUser'} isFold={isTableFold} setIsFold={setIsTableFold}/>
			<AddTagToUser space={'AddTagToUser'} isFold={isTableFold} setIsFold={setIsTableFold}/>
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</IamContainer>
	);
};

export default AddUserSpace;
