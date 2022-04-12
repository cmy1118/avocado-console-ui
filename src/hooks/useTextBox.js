import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
	.focus {
		border-color: ${(props) => (props.error ? '#d45959' : '#4ca6a8')};
		background-color: #fff;
	}
`;

const Input = styled.input`
	display: flex;
	width: 100%;
	align-items: center;
	font-size: 14px;
	height: 32px;
	border: none;
	background: transparent;
	box-sizing: border-box;
	outline: none;
	&::-webkit-input-placeholder {
		color: ${(props) => (props.placeholder_text_color ? '#D7D7D7' : '')};
	}
`;

const SubContainer = styled.div`
	display: flex;
	align-items: ${(props) =>
		props?.direction === 'col' ? 'initial' : 'center'};
	flex-direction: ${(props) =>
		props?.direction === 'col' ? 'column' : 'row'};
	padding: 6px 10px;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: left;
	font-color: #757575;
	box-sizing: border-box;
	border-radius: 4px;
	border: solid 1px;
	border-color: ${(props) =>
		props.border_color
			? props.border_color
			: props.error
			? '#d45959'
			: '#e3e5e5'};
	height: 34px;
	width: ${(props) => props.width || '394px'};
	background: ${(props) => props.background || '#ffffff'};
`;

/**************************************************
 * seob - TextBox hook
 *
 * name: input의 이름
 * regex: 적용할 정규식
 * placeholder: input의 placeholder
 *
 * 사용예시) - 사용법 공유 이후 삭제하겠습니다.
 *
 *
 let regex = /^[A-Za-z0-9]{6,12}$/; //숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식

 const [value, textBox] = useTextBox({
		name: 'test', // 생략가능
		regex: regex, // 생략가능
		placeholder: 'placeholder!!', // 생략가능
		disabled: true, // 기본값 false 생략가능

	});

 console.log('value => ', value); // input의 value

 return <div>{textBox()}</div>; // 컴포넌트에 그리는 방법
 *
 ***************************************************/
const useTextBox = ({name = '', regex, placeholder = '', disabled = false, checkFunc=false}) => {
	const [value, setValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	// const [lastValidValue, setLastValidValue] = useState('');

	const onFocusContainer = useCallback((e) => {
		e.target.parentElement.classList.add('focus');
	}, []);
	const onBlurContainer = useCallback(
		(e) => {
			e.target.parentElement.classList.remove('focus');
			// if (!isValid) {
			// 	console.log(lastValidValue);
			// 	setValue(lastValidValue);
			// }
		},
		[
			// isValid, lastValidValue
		],
	);

	/**************************************************
	 * seob - input onChange 이벤트 처리함수
	 ***************************************************/
	const handleChange = useCallback(
		(e) => {
			setValue(e.target.value);
			// console.log(isValid);
			// if (regex && !regex.test(e.target.value) && isValid) {
			// 	setLastValidValue(e.target.value);
			// }

			// // 정규식이 있는경우
			// if (regex) {
			// 	// 초기값인 경우 setValue
			// 	if (e.target.value === '') {
			// 		setValue(e.target.value);
			// 	}
			// 	// 입력값이 있는경우 regex 검사를 통과히먄 setValue
			// 	else {
			// 		regex.test(e.target.value) && setValue(e.target.value);
			// 	}
			// } else {
			// 	setValue(e.target.value);
			// }
		},
		[
			// isValid, regex
		],
	);

	useEffect(() => {
		regex && setIsValid(regex.test(value));
		if(checkFunc){
			setIsValid(checkFunc(value))
		}

	}, [checkFunc, regex, value]);

	const textBox = () => (
		<Container error={value !== '' && !isValid}>
			<SubContainer>
				<Input
					type={'text'}
					value={value}
					name={name}
					onChange={handleChange}
					onFocus={onFocusContainer}
					onBlur={onBlurContainer}
					placeholder={placeholder}
					{...(regex && {pattern: regex})}
					disabled={disabled}
				/>
			</SubContainer>
		</Container>
	);
	return [value, textBox, setValue,isValid];
};

useTextBox.propTypes = {
	name: PropTypes.string,
	regex: PropTypes.object,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
};

export default useTextBox;
