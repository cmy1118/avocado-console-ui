import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Form} from '../../../styles/components/form';
import {SubTitle} from '../../../styles/components/style';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';

import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';

const regex = {
	email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
	telephone: /^\d{2,3}-\d{3,4}-\d{4}$/,
	mobile: /^\d{3}-\d{3,4}-\d{4}$/,
};

const AddUser = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm({criteriaMode: 'all'});

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
			<Form id={'add-user-form'} onSubmit={handleSubmit(onSubmitAddUser)}>
				<input
					value={'user'}
					required
					placeholder={'사용자 계정 ID'}
					{...register('id', {
						required: 'id is required',
						minLength: {
							value: 4,
							message: "It's shorter than the minimum length",
						},
						maxLength: {
							value: 10,
							message: "It's longer than the maximum length.",
						},
					})}
				/>
				<ErrorMessage errors={errors} name='id'>
					{({messages}) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p key={type}>{message}</p>
						))
					}
				</ErrorMessage>
				<input
					value={'테스트'}
					required
					placeholder={'사용자 명'}
					{...register('name', {
						required: 'name is required',
					})}
				/>
				<ErrorMessage errors={errors} name='name'>
					{({messages}) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p key={type}>{message}</p>
						))
					}
				</ErrorMessage>
				<input
					value={'avocado@netand.co.kr'}
					required
					placeholder={'이메일 주소'}
					{...register('email', {
						required: 'email is required',
						pattern: {
							value: regex.email,
							message: 'invalid email address',
						},
					})}
				/>
				<ErrorMessage errors={errors} name='email'>
					{({messages}) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p key={type}>{message}</p>
						))
					}
				</ErrorMessage>
				<input
					value={'02-1234-5678'}
					required
					placeholder={'전화번호 형식: +82-(0)70-4469-6801'}
					{...register('telephone', {
						pattern: {
							value: regex.telephone,
							message: 'invalid telephone number',
						},
					})}
				/>
				<ErrorMessage errors={errors} name='telephone'>
					{({messages}) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p key={type}>{message}</p>
						))
					}
				</ErrorMessage>
				<input
					value={'010-1234-1410'}
					required
					placeholder={'모바일전화번호 형식: +82-(0)70-4469-6801'}
					{...register('mobile', {
						required: 'mobile number is required',
						pattern: {
							value: regex.mobile,
							message: 'invalid mobile number',
						},
					})}
				/>{' '}
				<ErrorMessage errors={errors} name='mobile'>
					{({messages}) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p key={type}>{message}</p>
						))
					}
				</ErrorMessage>
			</Form>
		</>
	);
};
export default AddUser;
