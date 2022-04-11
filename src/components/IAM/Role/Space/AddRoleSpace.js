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

	const [usage , setUsage] = useState('restrict');
	const [maxGrants , setMaxGrants] = useState(0);

	return (
		<AddSpaceContainer>
			<CurrentPathBar paths={paths} />
			<AddPageContainer>
				<AddRole
					setIsOpened={setIsOpened}
					setUsage = {setUsage}
					setMaxGrants = {setMaxGrants}
				/>
				<ConnectPolicyToRole space={'ConnectPolicyToRole'}
									 isFold={isTableFold}
									 setIsFold={setIsTableFold}/>

				<ConnectUserToRole space={'ConnectUserToRole'}
									 isFold={isTableFold}
									 setIsFold={setIsTableFold}
								   	 usage = {usage}
								     maxGrants = {maxGrants}
				/>

				<ConnectGroupToRole space={'ConnectGroupToRole'}
								    isFold={isTableFold}
								    setIsFold={setIsTableFold}
									usage = {usage}
									maxGrants = {maxGrants}
				/>

				<RolePreviewDialogBox setIsOpened={setIsOpened} isOpened={isOpened}/>
			</AddPageContainer>
		</AddSpaceContainer>
	);
};

export default AddRoleSpace;
