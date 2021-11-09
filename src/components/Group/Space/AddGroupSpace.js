import React, {useState} from 'react';
import {IamContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import {FOLD_DATA} from '../../../utils/data';

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<IamContainer>
			<CurrentPathContainer>
				<AppBarLink to='/iam'>IAM</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/groups'>사용자 그룹</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/groups/add'>사용자 그룹 생성</AppBarLink>
			</CurrentPathContainer>

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
