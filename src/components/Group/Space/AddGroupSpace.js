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
import {NaviLink} from '../../../styles/components/link';
import {FOLD_DATA} from '../../../utils/data';

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<IamContainer>
			<AppBarNavi>
				<PathContainer>
					<NaviLink to='/iam'>IAM</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups'>사용자 그룹</NaviLink>
					<div style={{padding: '0px 5px'}}>{' > '}</div>
					<NaviLink to='/groups/add'>사용자 그룹 생성</NaviLink>
				</PathContainer>
			</AppBarNavi>
			<AddGroup setIsOpened={setIsOpened} />
			<UsersIncludedInGroup
				space={'UsersIncludedInGroup'}
				isFold={isTableFold}
				setIsFold={setIsTableFold}
			/>
			<AssignRoleToGroup
				space={'AssignRoleToGroup'}
				isFold={isTableFold}
				setIsFold={setIsTableFold}
			/>
			<AddTagToGroup
				space={'AddTagToGroup'}
				isFold={isTableFold}
				setIsFold={setIsTableFold}
			/>
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</IamContainer>
	);
};

export default AddGroupSpace;
