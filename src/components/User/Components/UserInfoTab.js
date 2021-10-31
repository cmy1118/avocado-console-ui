import React, {useCallback, useMemo, useRef, useState} from 'react';
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
import NewForm from '../../RecycleComponents/New/NewForm';
import {RowDiv} from '../../../styles/components/div';

const UserInfoTab = ({userId}) => {
	const [values, setValues] = useState({email: '', number: ''});
	const confirmAuthRef = useRef(null);
	const changePasswordRef = useRef(null);

	const [isIdentificationOpened, setIsIdentificationOpened] = useState(false);
	const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);
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

	const onClickOkBtn = useCallback(() => {
		setIsChangePasswordOpened(true);
		setIsIdentificationOpened(false);
	}, []);

	return (
		<div>
			<TabContentsTitle>
				<div>기본정보</div>
				<NormalButton form={formKeys.userInfoForm}>저장</NormalButton>
			</TabContentsTitle>

			<NewForm
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
				<NewInput name={'id'} />
				<NewInput name={'name'} />
				<RowDiv>
					<NewInput name={'password'} />
					<NormalBorderButton
						type={'button'}
						onClick={onClickOpenIdentificationDialogBox}
					>
						비밀번호 변경
					</NormalBorderButton>
				</RowDiv>
				<NewInput name={'email'} />
				<NewInput name={'telephone'} />
				<NewInput name={'mobile'} />
			</NewForm>

			<ModalFormContainer
				isOpened={isIdentificationOpened}
				setIsOpened={setIsIdentificationOpened}
				title={'본인 확인'}
				innerRef={confirmAuthRef}
			>
				<NewForm
					initialValues={values}
					setValues={setValues}
					onSubmit={onClickOkBtn}
					innerRef={confirmAuthRef}
				>
					<RowDiv>
						<NewInput name={'email'} placeholder={'E-mail 주소'} />
						<NormalButton
							type={'button'}
							onClick={() => console.log(values.email)}
						>
							인증번호 전송
						</NormalButton>
					</RowDiv>
					<RowDiv>
						<NewInput
							name={'number'}
							placeholder={'인증번호 입력'}
						/>
						<NormalButton
							type={'button'}
							onClick={() => console.log(values.number)}
						>
							인증하기
						</NormalButton>
					</RowDiv>
				</NewForm>
			</ModalFormContainer>

			<ModalFormContainer
				isOpened={isChangePasswordOpened}
				setIsOpened={setIsChangePasswordOpened}
				title={'비밀번호 변경'}
				innerRef={changePasswordRef}
			>
				<NewForm
					initialValues={{old: '', new: '', confirm: ''}}
					onSubmit={onClickSaveChangedInfo}
					innerRef={changePasswordRef}
				>
					<NewInput
						name={'old'}
						placeholder={'현재 비밀번호를 입력하십시오.'}
					/>
					<NewInput
						name={'new'}
						placeholder={'새로운 비밀번호를 입력하십시오'}
					/>
					<NewInput
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
