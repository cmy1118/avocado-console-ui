import React, {useState} from 'react';
import {IamContainer} from '../../../styles/components/style';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';
import ReadOnly from '../Components/ReadOnly';
import {
	AppBarLink,
	CurrentPathContainer,
	NextPath,
} from '../../../styles/components/currentPath';
import {FOLD_DATA} from '../../../utils/data';

const AddUserSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<IamContainer>
			<CurrentPathContainer>
				<AppBarLink to='/iam'>IAM</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/users'>사용자</AppBarLink>
				<NextPath>{' > '}</NextPath>
				<AppBarLink to='/users/add'>사용자 추가</AppBarLink>
			</CurrentPathContainer>

			<AddUser setIsOpened={setIsOpened} />
			<AddUserToGroup
				space={'AddUserToGroup'}
				isFold={isTableFold}
				setIsFold={setIsTableFold}
			/>
			<AssignRoleToUser
				space={'AssignRoleToUser'}
				isFold={isTableFold}
				setIsFold={setIsTableFold}
			/>
			<AddTagToUser
				space={'AddTagToUser'}
				isFold={isTableFold}
				setIsFold={setIsTableFold}
			/>
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</IamContainer>
	);
};

export default AddUserSpace;
