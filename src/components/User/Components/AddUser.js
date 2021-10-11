import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {SubTitle} from '../../../styles/components/style';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Form from '../../../utils/Form';
import * as yup from 'yup';
import Input from '../../../utils/Form/Input';

const AddUser = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const schema = yup.object().shape({
		id: yup.string().min(2).max(10, 'content').required(),
		name: yup.string().required(),
		email: yup.string().email().required(),
		telephone: yup.string().required(),
		mobile: yup.string().required(),
	});

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
					<button form={'add-user-form'} type={'submit'}>
						사용자 생성
					</button>
					<button onClick={onClickCancelAddUser}>취소</button>
				</div>
			</SubTitle>
			<Form
				id={'add-user-form'}
				schema={schema}
				onSubmit={onSubmitAddUser}
			>
				<Input name={'id'} placeholder={'id'} />
				<Input name={'name'} placeholder={'name'} />
				<Input name={'email'} placeholder={'email'} />
				<Input name={'telephone'} placeholder={'telephone'} />
				<Input name={'mobile'} placeholder={'mobile'} />
			</Form>
		</>
	);
};
export default AddUser;
