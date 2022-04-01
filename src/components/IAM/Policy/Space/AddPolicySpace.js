import React from 'react';
import {IamContainer} from '../../../../styles/components/iam/iam';
import AddPolicy from '../Components/AddPolicy';
import {AddPageContainer} from '../../../../styles/components/iam/addPage';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import {useLocation} from 'react-router-dom';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/policies', label: '정책'},
	{url: '/policies/add', label: '정책 추가'},
];

/**************************************************
 * ambacc244 - 새로운 정책을 추가를 위한 정보를 조합하는 컴포넌트
 **************************************************/
const AddPolicySpace = () => {
	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<AddPageContainer>
				<AddPolicy />
			</AddPageContainer>
		</IamContainer>
	);
};

export default AddPolicySpace;
