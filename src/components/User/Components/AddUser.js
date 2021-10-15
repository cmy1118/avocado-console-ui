import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {SubTitle} from '../../../styles/components/style';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Form from '../../RecycleComponents/Form';
import * as yup from 'yup';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import {formKeys} from '../../../utils/data';

const AddUser = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	// 이부분은 만들어서 넣어주면 됩니다.
	const phoneRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;

	const schema = {
		id: yup.string().min(2).max(10, 'content').required(),
		name: yup.string().required(),
		email: yup.string().email().required(),
		telephone: yup.string().matches(phoneRegex, 'invalid phone').required(),
		mobile: yup.string().matches(phoneRegex, 'invalid phone').required(),
	};

	const onClickCancelAddUser = useCallback(() => {
		history.push('/users');
	}, [history]);

	const onSubmitAddUser = useCallback(
		(data) => {
			console.log(data);
			dispatch(IAM_USER.action.addUser(data));
		},
		[dispatch],
	);

	return (
		<>
			<SubTitle>
				<div>사용자 기본 정보</div>

				<div>
					<button form={formKeys.addUserForm} type={'submit'}>
						사용자 생성
					</button>
					<button onClick={onClickCancelAddUser}>취소</button>
				</div>
			</SubTitle>
			{/*<form id={formKeys.addUserForm} onSubmit={}></form>*/}
			<Form
				id={formKeys.addUserForm}
				schema={schema}
				onSubmit={onSubmitAddUser}
			>
				<FormTextBox name={'id'} placeholder={'id'} />
				<FormTextBox name={'name'} placeholder={'name'} />
				<FormTextBox name={'email'} placeholder={'email'} />
				<FormTextBox name={'telephone'} placeholder={'telephone'} />
				<FormTextBox name={'mobile'} placeholder={'mobile'} />
			</Form>
		</>
	);
};
export default AddUser;
