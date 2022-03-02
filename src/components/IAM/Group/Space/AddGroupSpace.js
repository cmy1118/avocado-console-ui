import React, {useState} from 'react';
import AddGroup from '../Components/AddGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';
import {FOLD_DATA} from '../../../../utils/data';
import {
	AddPageContainer,
	AddSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import CurrentPathBarTemp from '../../../Header/CurrentPathBarTemp';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/groups', label: '사용자 그룹'},
	{url: '/groups/add', label: '사용자 그룹 생성'},
];

const AddGroupSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);
	const [values, setValues] = useState({
		type: '',
		parentId: '',
		name: '',
	});
	const [groupMembers, setGroupMembers] = useState([]);

	return (
		<AddSpaceContainer>
			<CurrentPathBarTemp paths={paths} />

			<AddPageContainer>
				<AddGroup
					setIsOpened={setIsOpened}
					values={values}
					groupMembers={groupMembers}
					setValues={setValues}
				/>
				<UsersIncludedInGroup
					space={'UsersIncludedInGroup'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
					setValue={setGroupMembers}
				/>
				{/*<AssignRoleToGroup*/}
				{/*	space={'AssignRoleToGroup'}*/}
				{/*	isFold={isTableFold}*/}
				{/*	setIsFold={setIsTableFold}*/}
				{/*/>*/}
				<AddTagToGroup
					space={'AddTagToGroup'}
					isFold={isTableFold}
					setIsFold={setIsTableFold}
				/>
			</AddPageContainer>
			<ReadOnly isOpened={isOpened} setIsOpened={setIsOpened} />
		</AddSpaceContainer>
	);
};

export default AddGroupSpace;
