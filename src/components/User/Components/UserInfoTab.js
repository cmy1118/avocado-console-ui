import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import {TabContentsTitle} from '../../../styles/components/tab';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {formKeys} from '../../../utils/data';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import Form from '../../RecycleComponents/Form';
import ModalFormContainer from '../../RecycleComponents/ModalFormContainer';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../styles/components/buttons';
import {Label} from '../../../styles/components/text';
import styled from 'styled-components';

const _FormContainer = styled.div`
	display: flex;
`;

const UserInfoTab = ({userId}) => {
	const [isIdentificationOpened, setIsIdentificationOpened] = useState(false);
	const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);
	const [auth, setAuth] = useState(false);
	const {users} = useSelector(IAM_USER.selector);
	const user = useMemo(() => users.find((v) => v.uid === userId), [
		users,
		userId,
	]);

	const onClickSaveChangedInfo = useCallback((data) => {
		console.log('api 처리 : ', data);
		setIsChangePasswordOpened(false);
	}, []);

	const onClickOpenIdentificationDialogBox = useCallback(() => {
		setIsIdentificationOpened(true);
	}, []);

	const SendAuthNumber = useCallback((data) => {
		console.log('e-mail 주소 : ', data);
	}, []);

	const ConfirmAuthNumber = useCallback((data) => {
		console.log('api 인증번호 : ', data);
		setAuth(true); // 인증 통과.
	}, []);

	const onClickOkBtn = useCallback(() => {
		if (auth) {
			setIsIdentificationOpened(false);
			setIsChangePasswordOpened(true);
		} else {
			alert('인증 실패');
		}
	}, [auth]);

	return (
		<div>
			<TabContentsTitle>
				<div>기본정보</div>
				<NormalButton form={formKeys.userInfoForm}>저장</NormalButton>
			</TabContentsTitle>

			<Form id={formKeys.userInfoForm} onSubmit={onClickSaveChangedInfo}>
				<FormTextBox
					name={'id'}
					label={'사용자 ID : '}
					defaultValue={user.id}
					direction={'row'}
					lock
				/>
				<FormTextBox
					name={'name'}
					label={'사용자 이름 : '}
					defaultValue={user.name}
					direction={'row'}
					lock
				/>
				<FormTextBox
					name={'password'}
					label={'사용자 비밀번호 : '}
					defaultValue={'**********'}
					direction={'row'}
					lock
				>
					<NormalBorderButton
						type={'button'}
						onClick={onClickOpenIdentificationDialogBox}
					>
						비밀번호 변경
					</NormalBorderButton>
				</FormTextBox>
				<FormTextBox
					name={'email'}
					label={'이메일 주소 : '}
					defaultValue={user.email}
					direction={'row'}
					lock
				/>
				<FormTextBox
					name={'telephone'}
					label={'전화번호 : '}
					defaultValue={user.telephone}
					direction={'row'}
					lock
				/>
				<FormTextBox
					name={'mobile'}
					label={'모바일 번호 : '}
					defaultValue={user.mobile}
					direction={'row'}
					lock
				/>
			</Form>

			<ModalFormContainer
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
				onClickOkBtn={onClickOkBtn}
				title={'본인 확인'}
			>
				<_FormContainer>
					<Form id={'sendAuthNumber'} onSubmit={SendAuthNumber}>
						<Label>{'본인 확인'}</Label>
						<FormTextBox
							name={'email'}
							placeholder={'E-mail 주소'}
							autoFocus
							direction={'row'}
						>
							<NormalButton form={'sendAuthNumber'}>
								인증번호 전송
							</NormalButton>
						</FormTextBox>
					</Form>
				</_FormContainer>
				<_FormContainer>
					<Form id={'authNumber'} onSubmit={ConfirmAuthNumber}>
						<FormTextBox
							name={'authNumber'}
							placeholder={'인증번호 입력'}
							direction={'row'}
						>
							<NormalButton form={'authNumber'}>
								인증하기
							</NormalButton>
						</FormTextBox>
					</Form>
				</_FormContainer>
			</ModalFormContainer>

			<ModalFormContainer
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
				title={'비밀번호 변경'}
				id={'changePassword'}
			>
				<Form id={'changePassword'} onSubmit={onClickSaveChangedInfo}>
					<FormTextBox
						name={'currentPassword'}
						placeholder={'현재 비밀번호를 입력하십시오.'}
						inputWidth={'372px'}
						label={'현재 비밀번호'}
						autoFocus
					/>
					<FormTextBox
						name={'newPassword'}
						placeholder={'새로운 비밀번호를 입력하십시오'}
						inputWidth={'372px'}
						label={'새로운 비밀번호'}
					/>
					<FormTextBox
						name={'confirmPassword'}
						placeholder={'새로운 비밀번호를 입력하십시오'}
						inputWidth={'372px'}
						label={'비밀번호 확인'}
					/>
				</Form>
			</ModalFormContainer>
		</div>
	);
};

UserInfoTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfoTab;
