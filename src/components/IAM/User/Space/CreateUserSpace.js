import React, {useState} from 'react';

import AddTagToUser from '../Components/Create/AddTagToUser';
import AssignRoleToUser from '../Components/Create/AssignRoleToUser';
import AddUserToGroup from '../Components/Create/AddUserToGroup';
import AddUser from '../Components/Create/AddUser';
import UserPreviewDialogBox from '../../../DialogBoxs/Preview/UserPreviewDialogBox';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {
	IamContainer,
	IamContents,
	TitleBar,
} from '../../../../styles/components/iam/iam';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/users', label: '사용자'},
	{url: '/users/add', label: '사용자 추가'},
];

const CreateUserSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>사용자 생성</TitleBar>

			<IamContents>
				<AddUser setIsOpened={setIsOpened} />
				<AddUserToGroup />
				<AssignRoleToUser />
				<AddTagToUser />
			</IamContents>

			<UserPreviewDialogBox
				isOpened={isOpened}
				setIsOpened={setIsOpened}
			/>
		</IamContainer>
	);
};

export default CreateUserSpace;
