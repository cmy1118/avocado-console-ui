import React, {useState} from 'react';
import {
	AppBarNavi,
	IamContainer,
	PathContainer,
} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';
import {HoverIconButton} from '../../../styles/components/icons';
import {onClickCloseAside} from '../../Aside/Aside';
import {errorIcon} from '../../../icons/icons';
import {NaviLink} from '../../../styles/components/link';

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<IamContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups'>사용자 그룹</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups/add'>사용자 그룹 생성</NaviLink>
				</PathContainer>
				{/*<HoverIconButton onClick={onClickCloseAside}>*/}
				{/*	{errorIcon}*/}
				{/*</HoverIconButton>*/}
			</AppBarNavi>
			<AddGroup setIsOpened={setIsOpened} />
			<UsersIncludedInGroup />
			<AssignRoleToGroup />
			<AddTagToGroup />
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</IamContainer>
	);
};

export default AddGroupSpace;
