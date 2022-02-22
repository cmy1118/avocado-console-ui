import React, {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useRootClose} from 'react-overlays';
import {Icon} from '../styles/components/icons';
import {arrowDownIcon, arrowUpIcon} from '../icons/icons';

const _Container = styled.div`
	position: relative;
	background: transparent;
	cursor: pointer;
	width: ${(props) => props?.width}px;
	.focus {
		border-color: #4ca6a8;
	}
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	width: 100%;
	font-size: 14px;
	height: 32px;
	box-sizing: border-box;
`;

const IconHeader = styled(_Header)`
	justify-content: space-between;
	border-radius: 4px;
	border: solid 1px #e3e5e5;
	padding: 6px 10px;
	background: white;
`;

const Option = styled.option`
	height: 32px;
	width: 100%;
	display: flex;
	align-items: center;
	background: ${(props) => props?.isCurrent && 'rgba(228, 243, 244, 0.7)'};
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	cursor: pointer;
	font-size: 14px;
	cursor: pointer;
	padding: 5px 10px;
	box-sizing: border-box;
`;

const HeaderOption = styled(Option)`
	padding-left: 6px;
	&:hover {
		background: transparent;
	}
`;

const OptionContainer = styled.div`
	z-index: 99;
	position: absolute;
	width: 100%;
	border-radius: 4px;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	background-color: #fff;
`;

/**************************************************
 * seob - ComboBox hook
 * 
 * header: 콤보박스를 선택하지 않았을 경우 default label
 * options: 콤보박스의 옵션
 * width: 콤보박스의 길이
 * 
 * 사용예시) - 사용법 공유 이후 삭제하겠습니다.
 *
 *
 * 	// const [value, comboBox] = useComboBox({
	// 	header: '테스트', // 생략가능
	// 	options: [
	// 		{label: '1', value: 1},
	// 		{label: '2', value: 2},
	// 		{label: '3', value: 3},
	// 	],
	//	width: 250, // 생략가능
	// });
 // console.log('value => ', value); // 선택한 콤보박스의 value
 // return <div>{comboBox()}</div>; // 컴포넌트에 그리는 방법
 * 
 ***************************************************/
const useComboBox = ({header, options, width = 150}) => {
	const ref = useRef(null);
	const [isOpened, setIsOpened] = useState(false);
	const [value, setValue] = useState(header ? null : options[0]);

	/**************************************************
	 * seob - 옵션 선택 함수
	 ***************************************************/
	const handleChange = useCallback((e) => {
		setValue(JSON.parse(e.target.value));
		setIsOpened(false);
	}, []);

	// react-overlay 라이브러리 닫기 함수
	useRootClose(ref, () => setIsOpened(false), {
		disabled: !isOpened,
	});

	const comboBox = () => (
		<_Container width={width}>
			<IconHeader
				onClick={() => setIsOpened(!isOpened)}
				className={isOpened && ' focus'}
			>
				{/* header가 존재하면 header, 그렇지 않으면 첫번째 옵션의 label */}
				<HeaderOption value={header ? '' : options[0].label}>
					{!value
						? header
							? header
							: options[0].label
						: value.label}
				</HeaderOption>
				{/* 열림 상태에 따른 아이콘 표시 */}
				{isOpened ? (
					<Icon margin={'0px'}>{arrowUpIcon}</Icon>
				) : (
					<Icon margin={'0px'}>{arrowDownIcon}</Icon>
				)}
			</IconHeader>
			{isOpened && (
				<OptionContainer ref={ref}>
					{options.map((v, i) => {
						return (
							<Option
								onClick={handleChange}
								key={i}
								// 현재값 선택 여부
								isCurrent={
									JSON.stringify(v) === JSON.stringify(value)
								}
								value={JSON.stringify(v)}
							>
								{v.label}
							</Option>
						);
					})}
				</OptionContainer>
			)}
		</_Container>
	);

	return [value === null ? '' : value.value, comboBox];
};

useComboBox.propTypes = {
	options: PropTypes.array.isRequired,
	header: PropTypes.any,
	width: PropTypes.number,
};
export default useComboBox;
