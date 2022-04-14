import React, {useState} from 'react';
import AddGroup from '../Components/Create/AddGroup';
import AddTagToGroup from '../Components/Create/AddTagToGroup';
import AddUsersToGroup from '../Components/Create/AddUsersToGroup';
import GroprupPreviewDialogBox from '../../../DialogBoxs/Preview/GroprupPreviewDialogBox';
import {
	CreatePageContainer,
	CreateSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import AssignRoleToGroup from '../Components/Create/AssignRoleToGroup';
import {IamContents, TitleBar} from '../../../../styles/components/iam/iam';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/groups', label: '사용자 그룹'},
	{url: '/groups/add', label: '사용자 그룹 생성'},
];

const CreateGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	const [groupMembers, setGroupMembers] = useState([]);
	const [groupRoles, setGroupRoles] = useState([]);
	const [groupTags, setGroupTags] = useState([]);

	return (
		<CreateSpaceContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>사용자 그룹 생성</TitleBar>

			<IamContents>
				<AddGroup
					setIsOpened={setIsOpened}
					groupMembers={groupMembers}
					groupRoles={groupRoles}
					groupTags={groupTags}
				/>
				<AddUsersToGroup setValue={setGroupMembers} />
				<AssignRoleToGroup setValue={setGroupRoles} />
				<AddTagToGroup setValue={setGroupTags} />
			</IamContents>
			<GroprupPreviewDialogBox
				isOpened={isOpened}
				setIsOpened={setIsOpened}
			/>
		</CreateSpaceContainer>
	);
};

export default CreateGroupSpace;
