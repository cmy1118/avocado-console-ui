import React from 'react';
import {Link} from 'react-router-dom';
import {CurrentPathBar} from '../../../../styles/components/currentPathBar';
import {IamContainer} from '../../../../styles/components/iam/iam';
import AddPolicy from '../Components/AddPolicy';
import {AddPageContainer} from '../../../../styles/components/iam/addPage';
import AddPolicyDescription from '../Components/PolicyDescription';

const AddRolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathBar>
				<Link to='/iam'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/policies'>정책</Link>
				<div>{' > '}</div>
				<Link to='/policies/add'>정책 추가</Link>
			</CurrentPathBar>

			<AddPageContainer>
				<AddPolicy />
				<AddPolicyDescription />
			</AddPageContainer>
		</IamContainer>
	);
};

export default AddRolicySpace;
