import React, {forwardRef, useImperativeHandle,} from 'react';
import {altAuthType, googleAuth, kakaoAuth, naverAuth,} from '../../../utils/auth';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from '../../RecycleComponents/ReactHookForm/RHF_Textbox';
import PropTypes from "prop-types";

const GetUserIdDialogBox = forwardRef(({type}, ref) => {
	const methods = useForm();

	const onSubmitUserId = methods.handleSubmit((data) => {
		console.log(data);
		localStorage.setItem('id', data.id);

		switch (type) {
			//todo
			case altAuthType.google:
				location.href = googleAuth.location;
				break;

			case altAuthType.naver:
				location.href = naverAuth.location;
				break;

			case altAuthType.kakao:
				location.href = kakaoAuth.location;
				break;

			case altAuthType.apple:
				break;

			default:
				break;
		}
	}, []);

	useImperativeHandle(ref, () => ({
		onSubmitUserId,
	}));

	return (
		<FormProvider {...methods}>
			<div>아이디를 입력하시오</div>
			<RHF_Textbox name={'id'} />
		</FormProvider>
	);
});

GetUserIdDialogBox.displayName = 'GetUserIdDialogBox';

GetUserIdDialogBox.propTypes = {
	type: PropTypes.string.isRequired,
};
export default GetUserIdDialogBox;
