import React, {useEffect} from 'react';

import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RHF_Textbox from '../components/RecycleComponents/ReactHookForm/RHF_Textbox';
import RHF_Combobox from '../components/RecycleComponents/ReactHookForm/RHF_Combobox';
import RHF_Checkbox from '../components/RecycleComponents/ReactHookForm/RHF_Checkbox';
import RHF_Radio from '../components/RecycleComponents/ReactHookForm/RHF_Radio';

/**************************************************
 * seob - 폼 사용방법 예시 (사용법 확인 후 삭제예정입니다.)
 ***************************************************/
const FormExample = () => {
	// https://github.com/jquense/yup/tree/pre-v1

	// 유효성 검사 schema 작성방법
	// memo : 주의사항 => 현재 폼에 없는 name값을 입력하시고 require하시면 submit이 정상 동작하지 않습니다.
	const validationSchema = Yup.object()
		.shape({
			name: Yup.string()
				.min(5, '5자 이상 입력하셔야 합니다.')
				.max(20, '20자 이하로 입력하셔야 합니다.')
				.required('name값은 필수입니다.'),
			color: Yup.string().required('color값은 필수입니다.'),
			number: Yup.string().required('number값은 필수입니다.'),
			checked2: Yup.array()
				.min(1, '1개 이상 체크하셔야 합니다.')
				.max(2, '2개 이하 체크하셔야 합니다.'),
			// radio2: Yup.string().required('체크하셔야합니다.').nullable(true),
		})
		.required();

	const methods = useForm({
		mode: 'onChange', // memo 유효성 검사가 trriger되는 시점 => onChange를 사용하면 바로 검사
		defaultValues: {
			name: '',
			number: '2',
			// memo 초기값 (체크박스의 경우 초기값이 없는경우 [] 빈 배열로 설정하셔야 합니다.
			checked2: [],
			radio2: '1',
		},
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
	});
	const colourOptions = [
		{value: 'ocean', label: 'Ocean'},
		// {value: 'blue', label: 'Blue', isDisabled: true},
		{value: 'purple', label: 'Purple'},
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

	const onSubmit = (data) => console.log(data);

	// memo : form의 input의 렌더링 되고있는 values가 필요한 경우
	const name = methods.watch('name');
	const allValues = methods.watch();
	useEffect(() => {
		console.log(name);
		console.log(allValues);
		// memo : form의 특정 input의 현재 value가 필요한 경우
		console.log(methods.getValues('name'));
	}, [allValues, methods, name]);

	return (
		<div>
			{/*memo : methods의 handleSubmit을 통해 입력한 값들을 submit할 수 있습니다*/}
			<button onClick={methods.handleSubmit(onSubmit)}>
				methods 제출
			</button>
			{/* memo : FormProvider로 감싸야 에러가 발생하지 않습니다 */}
			<FormProvider {...methods}>
				<h3>TextBox</h3>
				{/* memo : 태그의 name 속성을 통해 각 태그를 구분합니다.*/}
				<RHF_Textbox
					name={'name'}
					placeholder={'name'}
					description={'이름을 입력하세요.'}
				/>
				<RHF_Textbox
					name={'description'}
					placeholder={'description'}
					isDisabled
					width={400}
				/>
				<h3>ComboBox</h3>
				<RHF_Combobox
					name={'color'}
					placeholder={'what color?'}
					options={colourOptions}
					width={500}
				/>
				<RHF_Combobox
					name={'number'}
					placeholder={'what number?'}
					options={numberOptions}
					isDisabled
				/>
				<h3>CheckBox</h3>
				<RHF_Checkbox
					name={'checked1'}
					options={checkboxOptions}
					isDisabled
				/>
				<RHF_Checkbox name={'checked2'} options={checkboxOptions} />
				<h3>RadioBox</h3>
				<RHF_Radio
					name={'radio1'}
					options={checkboxOptions}
					isDisabled
				/>
				<RHF_Radio name={'radio2'} options={checkboxOptions} />
			</FormProvider>
		</div>
	);
};

export default FormExample;
