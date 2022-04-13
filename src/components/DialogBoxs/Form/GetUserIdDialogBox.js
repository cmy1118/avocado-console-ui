import React, {forwardRef, useImperativeHandle} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from '../../RecycleComponents/ReactHookForm/RHF_Textbox';

const GetUserIdDialogBox = forwardRef((props, ref) => {
	const methods = useForm();

	const onSubmitUserId = methods.handleSubmit((data) => {
		console.log(data);
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

export default GetUserIdDialogBox;
