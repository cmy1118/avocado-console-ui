import React, {useState} from 'react';

import AddTagToUser from '../Components/AddTagToUser';
import AssignRoleToUser from '../Components/AssignRoleToUser';
import AddUserToGroup from '../Components/AddUserToGroup';
import AddUser from '../Components/AddUser';
import UserPreviewDialogBox from '../../../DialogBoxs/Preview/UserPreviewDialogBox';
import {FOLD_DATA} from '../../../../utils/data';
import {
	AddPageContainer,
	AddSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import CurrentPathBar from '../../../Header/CurrentPathBar';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/users', label: '사용자'},
	{url: '/users/add', label: '사용자 추가'},
];

const AddUserSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<AddSpaceContainer>
			<CurrentPathBar paths={paths} />

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

			<UserPreviewDialogBox
				isOpened={isOpened}
				setIsOpened={setIsOpened}
			/>
		</AddSpaceContainer>
	);
};

export default AddUserSpace;
