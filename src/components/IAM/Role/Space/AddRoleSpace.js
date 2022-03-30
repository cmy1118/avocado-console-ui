import React, {useState} from 'react';
import {AddPageContainer, AddSpaceContainer,} from '../../../../styles/components/iam/addPage';
import {FOLD_DATA} from '../../../../utils/data';
import ConnectPolicyToRole from '../Components/Add/ConnectPolicyToRole';
import ConnectUserToRole from '../Components/Add/ConnectUserToRole';

import AddRole from '../Components/Add/AddRole';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import ConnectGroupToRole from '../Components/Add/ConnectGroupToRole';
import RolePreviewDialogBox from "../../../DialogBoxs/Preview/RolePreviewDialogBox";

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
	{url: '/roles/add', label: '역할 추가'},
];

const AddRoleSpace = () => {
	const [isOpened, setIsOpened] = useState(false);

	const [isTableFold, setIsTableFold] = useState(FOLD_DATA);

	return (
		<AddSpaceContainer>
			<CurrentPathBar paths={paths} />

			<AddPageContainer>
				<AddRole setIsOpened={setIsOpened}/>
				<ConnectPolicyToRole space={'ConnectPolicyToRole'}
									 isFold={isTableFold}
									 setIsFold={setIsTableFold}/>

				<ConnectUserToRole space={'ConnectUserToRole'}
									 isFold={isTableFold}
									 setIsFold={setIsTableFold}/>

				<ConnectGroupToRole space={'ConnectGroupToRole'}
								   isFold={isTableFold}
								   setIsFold={setIsTableFold}/>

				<RolePreviewDialogBox setIsOpened={setIsOpened} isOpened={isOpened}/>
			</AddPageContainer>



			{/*<AddPageContainer>*/}
			{/*	<AddRole*/}
			{/*		setIsOpened={setIsOpened}*/}
			{/*		values={values}*/}
			{/*		groupMembers={groupMembers}*/}
			{/*		setValues={setValues}*/}
			{/*	/>*/}

			{/*	<ConnectPolicyToRole*/}
			{/*		space={'RolePolicyTab'}*/}
			{/*		isFold={isTableFold}*/}
			{/*		setIsFold={setIsTableFold}*/}
			{/*		setValue={setGroupMembers}*/}
			{/*	/>*/}
			{/*	<ConnectUserToRole*/}
			{/*		space={'RoleUserTab'}*/}
			{/*		isFold={isTableFold}*/}
			{/*		setIsFold={setIsTableFold}*/}
			{/*		setValue={setGroupMembers}*/}
			{/*	/>*/}
			{/*	<ConnectGroupToRole*/}
			{/*		space={'RoleGroupTab'}*/}
			{/*		isFold={isTableFold}*/}
			{/*		setIsFold={setIsTableFold}*/}
			{/*		setValue={setGroupMembers}*/}
			{/*	/>*/}
			{/*</AddPageContainer>*/}
		</AddSpaceContainer>
	);
};

export default AddRoleSpace;
