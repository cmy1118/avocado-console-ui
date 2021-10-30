import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import {TabContentsTitle} from '../../../styles/components/tab';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import {formKeys} from '../../../utils/data';
import ModalFormContainer from '../../RecycleComponents/ModalFormContainer';
import {
	NormalBorderButton,
	NormalButton,
} from '../../../styles/components/buttons';
import NewInput from '../../RecycleComponents/New/NewInput';
import NewForm from '../../RecycleComponents/New/newForm';
import {RowDiv} from '../../../styles/components/div';

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

			<NewForm
				submitKey={formKeys.userInfoForm}
				initialValues={{
					id: user.id,
					name: user.name,
					password: '*********',
					email: user.email,
					telephone: user.telephone,
					mobile: user.mobile,
				}}
				onSubmit={(data) => console.log(data)}
			>
				<NewInput label={'사용자 ID'} name={'id'} />
				<NewInput label={'사용자 이름'} name={'name'} />
				<RowDiv>
					<NewInput label={'사용자 비밀번호'} name={'password'} />
					<NormalBorderButton
						type={'button'}
						onClick={onClickOpenIdentificationDialogBox}
					>
						비밀번호 변경
					</NormalBorderButton>
				</RowDiv>
				<NewInput label={'이메일 주소'} name={'email'} />
				<NewInput label={'전화번호'} name={'telephone'} />
				<NewInput label={'모바일 번호'} name={'mobile'} />
			</NewForm>

			<ModalFormContainer
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
				submitKey={'sendAuthNumber'}
				title={'본인 확인'}
			>
				<NewForm
					submitKey={'sendAuthNumber'}
					initialValues={{email: ''}}
					onSubmit={SendAuthNumber}
				>
					<RowDiv>
						<NewInput
							label={'본인 확인'}
							name={'email'}
							placeholder={'E-mail 주소'}
						/>
						<NormalButton form={'sendAuthNumber'}>
							인증번호 전송
						</NormalButton>
					</RowDiv>
				</NewForm>

				<NewForm
					submitKey={'authNumber'}
					initialValues={{number: ''}}
					onSubmit={ConfirmAuthNumber}
				>
					<RowDiv>
						<NewInput
							label={'본인 확인'}
							name={'number'}
							placeholder={'인증번호 입력'}
						/>
						<NormalButton form={'authNumber'}>
							인증하기
						</NormalButton>
					</RowDiv>
				</NewForm>
			</ModalFormContainer>

			<ModalFormContainer
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
				title={'비밀번호 변경'}
				submitKey={'changePassword'}
			>
				<NewForm
					submitKey={'changePassword'}
					initialValues={{old: '', new: '', confirm: ''}}
					onSubmit={onClickSaveChangedInfo}
				>
					<NewInput
						label={'현재 비밀번호'}
						name={'old'}
						placeholder={'현재 비밀번호를 입력하십시오.'}
					/>
					<NewInput
						label={'새로운 비밀번호'}
						name={'new'}
						placeholder={'새로운 비밀번호를 입력하십시오'}
					/>
					<NewInput
						label={'비밀번호 확인'}
						name={'confirm'}
						placeholder={'새로운 비밀번호를 입력하십시오'}
					/>
				</NewForm>
			</ModalFormContainer>
		</div>
	);
};

UserInfoTab.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserInfoTab;
