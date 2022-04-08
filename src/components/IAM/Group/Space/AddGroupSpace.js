import React, {useState} from 'react';
import AddGroup from '../Components/AddGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';
import {
	AddPageContainer,
	AddSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/groups', label: '사용자 그룹'},
	{url: '/groups/add', label: '사용자 그룹 생성'},
];

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	const [groupMembers, setGroupMembers] = useState([]);
	const [groupRoles, setGroupRoles] = useState([]);
	const [groupTags, setGroupTags] = useState([]);

	return (
		<AddSpaceContainer>
			<CurrentPathBar paths={paths} />

			<AddPageContainer>
				<AddGroup
					setIsOpened={setIsOpened}
					groupMembers={groupMembers}
					groupRoles={groupRoles}
					groupTags={groupTags}
				/>
				<UsersIncludedInGroup setValue={setGroupMembers} />
				<AssignRoleToGroup setValue={setGroupRoles} />
				<AddTagToGroup setValue={setGroupTags} />
			</AddPageContainer>
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</AddSpaceContainer>
	);
};

export default AddGroupSpace;
