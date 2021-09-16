import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import useInput from '../../../hooks/useInput';
import {usersAction} from '../../../reducers/users';
import {useDispatch} from 'react-redux';
import {Form} from '../../../styles/components/form';

const AddUser = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [id, onChangeId, setId] = useInput('');
	const [name, onChangeName, setName] = useInput('');
	const [email, onChangeEmail, setEmail] = useInput('');
	const [telephone, onChangeTelephone, setTelephone] = useInput('');
	const [mobile, onChangeMobile, setMobile] = useInput('');

	const onClickCancelAddUser = useCallback(() => {
		history.push('/user');
	}, []);

	const onSubmitAddUser = useCallback(
		(e) => {
			e.preventDefault();
			console.log(id, name, email, telephone, mobile);

			dispatch(
				usersAction.addUser({
					id: id,
					name: name,
					email: email,
					telephone: telephone,
					mobile: mobile,
				}),
			);

			setId('');
			setName('');
			setEmail('');
			setTelephone('');
			setMobile('');
		},
		[id, name, email, telephone, mobile],
	);

	return (
		<>
			<div>사용자 기본 정보</div>

			<div>
				<button form={'add-user-form'} type={'submit'}>
					사용자 생성
				</button>
				<button onClick={onClickCancelAddUser}>취소</button>
			</div>

			<Form id={'add-user-form'} onSubmit={onSubmitAddUser}>
				<input
					type='text'
					value={id}
					onChange={onChangeId}
					placeholder={'사용자 계정 ID'}
					required
				/>
				<input
					type='text'
					value={name}
					onChange={onChangeName}
					placeholder={'사용자 명'}
					required
				/>
				<input
					type='email'
					value={email}
					onChange={onChangeEmail}
					placeholder={'이메일 주소'}
					required
				/>
				<input
					type='tel'
					value={telephone}
					onChange={onChangeTelephone}
					pattern='[0]{0,1}[0-9]{2}-[0-9]{4}-[0-9]{4}'
					placeholder={'전화번호 형식: +82-(0)70-4469-6801'}
					required
				/>
				<input
					type='tel'
					value={mobile}
					onChange={onChangeMobile}
					pattern='[0]{0,1}[0-9]{2}-[0-9]{4}-[0-9]{4}'
					placeholder={'모바일전화번호 형식: +82-(0)70-4469-6801'}
					required
				/>
			</Form>
		</>
	);
};
export default AddUser;