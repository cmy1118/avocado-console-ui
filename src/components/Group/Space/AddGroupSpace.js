import React, {useState} from 'react';
import {IamContainer} from '../../../styles/components/style';
import AddGroup from '../Components/AddGroup';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';
import {
	CurrentPathContainer,
	PathLink,
	NextPath,
} from '../../../styles/components/currentPath';
import {FOLD_DATA} from '../../../utils/data';

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<IamContainer>
			<CurrentPathContainer>
				<PathLink to='/iam'>IAM</PathLink>
				<NextPath>{' > '}</NextPath>
				<PathLink to='/groups'>사용자 그룹</PathLink>
				<NextPath>{' > '}</NextPath>
				<PathLink to='/groups/add'>사용자 그룹 생성</PathLink>
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
