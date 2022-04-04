import React from 'react';
import * as Yup from 'yup';

import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RHF_Textbox from '../components/RecycleComponents/ReactHookForm/RHF_Textbox';
import RHF_Combobox from '../components/RecycleComponents/ReactHookForm/RHF_Combobox';
import RHF_Checkbox from '../components/RecycleComponents/ReactHookForm/RHF_Checkbox';

const FormExample = () => {
	const validationSchema = Yup.object()
		.shape({
			name: Yup.string().required('Required'),
			description: Yup.string(),
			color: Yup.string().required('Required'),
			number: Yup.string().required('Required'),
		})
		.required();

	// memo (참조) : https://react-hook-form.com/kr/v6/api/
	const methods = useForm({
		// mode: 'onSubmit', // 유효성 검사가 trriger되는 시점
		// reValidateMode: 'onChange', // submit후 오류를 재검증 하는 시점
		defaultValues: {
			// 초기값
			// G: 'hello',
			name: 'Session policy',
			number: '2',
		},
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
		// context: undefined,
		criteriaMode: 'all', // 'firstError' || 'all'
		// shouldFocusError: true,
		// shouldUnregister: true,
	});

	const onSubmit = (data) => console.log(data);

	const colourOptions = [
		{value: 'ocean', label: 'Ocean', isFixed: true},
		{value: 'blue', label: 'Blue', isDisabled: true},
		{value: 'purple', label: 'Purple'},
		{value: 'red', label: 'Red', isFixed: true},
		{value: 'orange', label: 'Orange'},
		{value: 'yellow', label: 'Yellow'},
		{value: 'green', label: 'Green'},
		{value: 'forest', label: 'Forest'},
		{value: 'slate', label: 'Slate'},
		{value: 'silver', label: 'Silver'},
	];

	const numberOptions = [
		{value: '1', label: 'one'},
		{value: '2', label: 'two'},
		{value: '3', label: 'three'},
	];

	const checkboxOptions = [
		{value: '1', label: 'one'},
		{value: '2', label: 'two'},
		{value: '3', label: 'three'},
	];

	return (
		<div>
			<button onClick={methods.handleSubmit(onSubmit)}>
				methods 제출
			</button>
			<FormProvider {...methods}>
				<RHF_Textbox name={'name'} placeholder={'name'} />
				<RHF_Textbox
					name={'description'}
					placeholder={'description'}
					isDisabled
				/>
				<RHF_Combobox
					name={'color'}
					placeholder={'what color?'}
					options={colourOptions}
				/>
				<RHF_Combobox
					name={'number'}
					placeholder={'what number?'}
					options={numberOptions}
					isDisabled
				/>

				<RHF_Checkbox
					name={'checked'}
					options={checkboxOptions}
					// isDisabled
				/>
			</FormProvider>

			{/*<FormProvider {...methods2}>*/}
			{/*	<RHF_Textbox name={'D'} />*/}
			{/*	<RHF_Textbox name={'E'} />*/}
			{/*	<RHF_Textbox name={'F'} />*/}
			{/*	<button onClick={methods2.handleSubmit(onSubmit)}>*/}
			{/*		methods2 제출*/}
			{/*	</button>*/}
			{/*</FormProvider>*/}
		</div>
	);
};

export default FormExample;
