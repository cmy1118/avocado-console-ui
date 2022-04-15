import React, {useState} from 'react';
import {
	IamSectionContents,
	CreateSpaceContainer,
} from '../../../../styles/components/iam/addPage';
import ConnectPolicyToRole from '../Components/Add/ConnectPolicyToRole';
import ConnectUserToRole from '../Components/Add/ConnectUserToRole';
import ConnectGroupToRole from '../Components/Add/ConnectGroupToRole';
import AddRole from '../Components/Add/AddRole';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {
	IamContainer,
	IamContents,
	TitleBar,
} from '../../../../styles/components/iam/iam';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/roles', label: '역할'},
	{url: '/roles/add', label: '역할 추가'},
];

const AddRoleSpace = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [values, setValues] = useState({
		type: '',
		parentId: '',
		name: '',
	});
	const [groupMembers, setGroupMembers] = useState([]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />
			<TitleBar>정책 생성</TitleBar>

			<IamContents>
				<AddRole
					setIsOpened={setIsOpened}
					values={values}
					groupMembers={groupMembers}
					setValues={setValues}
				/>
				<ConnectPolicyToRole setValue={setGroupMembers} />
				<ConnectUserToRole setValue={setGroupMembers} />
				<ConnectGroupToRole setValue={setGroupMembers} />
			</IamContents>
		</IamContainer>
	);
};

export default AddRoleSpace;
