import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {SubTitle} from '../../../styles/components/style';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import Form from '../../RecycleComponents/Form';
import * as yup from 'yup';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import {formKeys} from '../../../utils/data';
import PropTypes from 'prop-types';

const AddUser = ({setAllData, setIsOpened}) => {
	const history = useHistory();
	const dispatch = useDispatch();

	// 이부분은 만들어서 넣어주면 됩니다.
	const telephoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
	const mobileRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;

	const schema = {
		id: yup
			.string()
			.min(10, '최소 길이는 10자 입니다.')
			.max(40, '최대 길이는 40자 입니다.')
			.required('아이디는 필수 입력 값입니다.'),
		name: yup
			.string()
			.max(30, '최대 길이는 30자 입니다.')
			.required('이름은 필수 입력 값입니다.'),
		email: yup
			.string()
			.email('올바른 이메일 형식이 아닙니다.')
			.required('이메일은 필수 입력 값입니다.'),
		telephone: yup
			.string()
			.required()
			.matches(telephoneRegex, '형식에 맞지 않습니다.'),
		mobile: yup
			.string()
			.required('핸드폰 번호는 필수 입력 값입니다.')
			.matches(mobileRegex, '형식에 맞지 않습니다.'),
	};

	const onClickCancelAddUser = useCallback(() => {
		history.push('/users');
	}, [history]);

	const onSubmitAddUser = useCallback(
		(data) => {
			setAllData({key: 'userInfo', data});
			setIsOpened(true);
		},
		[setAllData, setIsOpened],
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
				<FormTextBox
					name={'id'}
					defaultValue={'AvocadoGood'}
					placeholder={'id'}
				/>
				<FormTextBox
					name={'name'}
					defaultValue={'아보카도'}
					placeholder={'name'}
				/>
				<FormTextBox
					name={'email'}
					defaultValue={'avocado@netand.co.kr'}
					placeholder={'email'}
				/>
				<FormTextBox
					name={'telephone'}
					defaultValue={'02-1234-1234'}
					placeholder={'telephone'}
				/>
				<FormTextBox
					name={'mobile'}
					defaultValue={'010-1234-1234'}
					placeholder={'mobile'}
				/>
			</Form>
		</>
	);
};

AddUser.propTypes = {
	setAllData: PropTypes.func.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default AddUser;
