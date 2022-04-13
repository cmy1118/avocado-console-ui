import React, {useState} from 'react';

import AddTagToUser from '../Components/Create/AddTagToUser';
import AssignRoleToUser from '../Components/Create/AssignRoleToUser';
import AddUserToGroup from '../Components/Create/AddUserToGroup';
import AddUser from '../Components/Create/AddUser';
import UserPreviewDialogBox from '../../../DialogBoxs/Preview/UserPreviewDialogBox';
import {
	AddPageContainer,
	AddSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {Header} from '../../../../styles/components/iam/iam';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/users', label: '사용자'},
	{url: '/users/add', label: '사용자 추가'},
];

const CreateUserSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<AddSpaceContainer>
			<CurrentPathBar paths={paths} />
			<Header>사용자 추가</Header>

			<AddPageContainer>
				<AddUser setIsOpened={setIsOpened} />
				<AddUserToGroup />
				<AssignRoleToUser />
				<AddTagToUser />
			</AddPageContainer>

			<UserPreviewDialogBox
				isOpened={isOpened}
				setIsOpened={setIsOpened}
			/>
		</AddSpaceContainer>
	);
};

export default CreateUserSpace;
