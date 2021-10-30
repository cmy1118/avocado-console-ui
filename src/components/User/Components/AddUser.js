import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {SubTitle} from '../../../styles/components/style';
import * as yup from 'yup';
import {formKeys} from '../../../utils/data';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import NewForm from '../../RecycleComponents/New/newForm';
import NewInput from '../../RecycleComponents/New/NewInput';

const AddUser = ({setIsOpened}) => {
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

	const onSubmitUserData = useCallback(
		(data) => {
			dispatch(
				CURRENT_TARGET.action.addReadOnlyData({
					title: 'user',
					data: data,
				}),
			);
			setIsOpened(true);
		},
		[dispatch, setIsOpened],
	);

	return (
		<>
			<SubTitle>
				<div>사용자 기본 정보</div>

				<div>
					<NormalButton form={formKeys.addUserForm} type={'submit'}>
						사용자 생성
					</NormalButton>
					<TransparentButton onClick={onClickCancelAddUser}>
						취소
					</TransparentButton>
				</div>
			</SubTitle>

			<NewForm
				submitKey={formKeys.addUserForm}
				initialValues={{
					id: '',
					name: '',
					email: '',
					telephone: '',
					mobile: '',
				}}
				onSubmit={onSubmitUserData}
			>
				<NewInput label={'사용자 ID'} name={'id'} placeholder={'id'} />
				<NewInput
					label={'사용자 이름'}
					name={'name'}
					placeholder={'name'}
				/>
				<NewInput
					label={'이메일 주소'}
					name={'email'}
					placeholder={'email'}
				/>
				<NewInput
					label={'전화 번호'}
					name={'telephone'}
					placeholder={'telephone'}
				/>
				<NewInput
					label={'핸드폰 번호'}
					name={'mobile'}
					placeholder={'mobile'}
				/>
			</NewForm>
		</>
	);
};

AddUser.propTypes = {
	setIsOpened: PropTypes.func,
};

export default AddUser;
