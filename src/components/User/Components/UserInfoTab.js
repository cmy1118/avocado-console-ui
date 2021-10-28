import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import {TabContentsTitle} from '../../../styles/components/tab';
import IdentificationDialogBox from '../../DialogBoxs/Form/IdentificationDialogBox';
import ChangePasswordDialogBox from '../../DialogBoxs/Form/ChangePasswordDialogBox';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {formKeys} from '../../../utils/data';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import Form from '../../RecycleComponents/Form';
import ModalFormContainer from '../../RecycleComponents/ModalFormContainer';
import {NormalButton} from '../../../styles/components/buttons';

const UserInfoTab = ({userId}) => {
	const [isIdentificationOpened, setIsIdentificationOpened] = useState(false);
	const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);
	const [email, setEmail] = useState('');
	const [authNumber, setAuthNumber] = useState(null);
	const [count, setCount] = useState(0);
	const [authCheck, setAuthCheck] = useState(false);
	const {users} = useSelector(IAM_USER.selector);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickSaveChangedInfo = useCallback((data) => {
		console.log(data);
	}, []);

	const onClickOpenIdentificationDialogBox = useCallback(() => {
		setIsIdentificationOpened(true);
	}, []);

	const SendAuthNumber = useCallback((data) => {
		console.log('api 인증번호 확인 ::', data);
		console.log('인증완료 처리 후..');
		setIsIdentificationOpened(false);
		setIsChangePasswordOpened(true);
	}, []);

	const ConfirmAuthNumber = useCallback((data) => {
		console.log('api 인증번호 확인 ::', data);
		console.log('인증완료 처리 후..');
		setIsIdentificationOpened(false);
		setIsChangePasswordOpened(true);
	}, []);

	return (
		<div>
			<TabContentsTitle>
				<div>기본정보</div>
				<button form={formKeys.userInfoForm}>저장</button>
			</TabContentsTitle>

			<Form id={formKeys.userInfoForm} onSubmit={onClickSaveChangedInfo}>
				<FormTextBox
					name={'id'}
					label={'사용자 ID : '}
					defaultValue={user.id}
				/>
				<FormTextBox
					name={'name'}
					label={'사용자 이름 : '}
					defaultValue={user.name}
				/>
				<FormTextBox
					name={'password'}
					label={'사용자 비밀번호 : '}
					defaultValue={'**********'}
				>
					<button
						type={'button'}
						onClick={onClickOpenIdentificationDialogBox}
					>
						비밀번호 변경
					</button>
				</FormTextBox>
				<FormTextBox
					name={'email'}
					label={'이메일 주소 : '}
					defaultValue={user.email}
				/>
				<FormTextBox
					name={'telephone'}
					label={'전화번호 : '}
					defaultValue={user.telephone}
				/>
				<FormTextBox
					name={'mobile'}
					label={'모바일 번호 : '}
					defaultValue={user.mobile}
				/>
			</Form>

			<ModalFormContainer
				formKey={'changePassword'}
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
				title={'본인 확인'}
			>
				<Form id={'sendAuthNumber'} onSubmit={SendAuthNumber}>
					<label htmlFor={'name'}>수신 정보</label>
					<FormTextBox
						name={'email'}
						placeholder={'E-mail 주소'}
						setValue={setEmail}
						autoFocus
					/>
					<NormalButton form={'sendAuthNumber'}>
						인증번호 전송
					</NormalButton>
				</Form>
				<Form id={'authNumber'} onSubmit={ConfirmAuthNumber}>
					<FormTextBox
						name={'authNumber'}
						placeholder={'인증번호 입력'}
						setValue={setAuthNumber}
					/>
					<NormalButton form={'authNumber'}>인증하기</NormalButton>
				</Form>
			</ModalFormContainer>

			<IdentificationDialogBox
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
			/>
			<ChangePasswordDialogBox
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
			/>
		</div>
	);
};

UserInfoTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfoTab;
