import React, {useState} from 'react';
import AddGroup from '../Components/AddGroup';
import AssignRoleToGroup from '../Components/AssignRoleToGroup';
import AddTagToGroup from '../Components/AddTagToGroup';
import UsersIncludedInGroup from '../Components/UsersIncludedInGroup';
import ReadOnly from '../Components/ReadOnly';
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
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups'>
					사용자 그룹
				</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups/add'>
					사용자 그룹 생성
				</CurrentPathBarLink>
			</CurrentPathBar>
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
