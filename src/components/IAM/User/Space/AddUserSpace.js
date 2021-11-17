import React, {useState} from 'react';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';
import UserPreviewDialogBox from '../../../DialogBoxs/Preview/UserPreviewDialogBox';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import {FOLD_DATA} from '../../../../utils/data';
import {
	AddSpaceContainer,
	AddPageContainer,
} from '../../../../styles/components/iam/addPage';

const AddUserSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<AddSpaceContainer>
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/users'>사용자</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/users/add'>
					사용자 추가
				</CurrentPathBarLink>
			</CurrentPathBar>

			<AddPageContainer>
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
			</AddPageContainer>

			{/*<UserPreviewDialogBox*/}
			{/*	isOpened={isOpened}*/}
			{/*	setIsOpened={setIsOpened}*/}
			{/*/>*/}
		</AddSpaceContainer>
	);
};

export default AddUserSpace;
