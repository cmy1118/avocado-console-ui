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
 * const [comboValue, ComboBox] = useComboBox({
		header: '사용 여부', // 필수 아님
		options: [ // 필수
			{label: '사용 함', value: 'use'},
			{label: '사용 안함', value: 'unuse'},
		],
	});
 * 
 ***************************************************/
const useComboBox = ({header, options, width = 150, disabled = false}) => {
	const ref = useRef(null);
	const [isOpened, setIsOpened] = useState(false);
	const [value, setValue] = useState(
		// 초기값이 존재하는 경우
		// initialValue
		// 	? // options에서 해당 값으로 setValue
		// 	  options.find((op) => op.value === initialValue)
		// 	: // 초기값이 존재하지 않고, header가 존제하면 선택값을 비워줌
		header
			? null
			: // 초기값도, header도 없는경우 옵션의 첫번째 값을 기본값으로 설정
			  options[0].value,
	);

	/**************************************************
	 * seob - 옵션 선택 함수
	 ***************************************************/
	const handleChange = useCallback((e) => {
		console.log(JSON.parse(e.target.value));
		setValue(JSON.parse(e.target.value));
		setIsOpened(false);
	}, []);

	const handleOpened = useCallback(() => {
		if (disabled) {
			setIsOpened(false);
		} else {
			setIsOpened(!isOpened);
		}
	}, [disabled, isOpened]);

	// react-overlay 라이브러리 닫기 함수
	useRootClose(ref, () => setIsOpened(false), {
		disabled: !isOpened,
	});

	/**************************************************
	 * seob - 콤보박스 UI 컴포넌트
	 ***************************************************/
	const comboBox = () => (
		<_Container width={width}>
			<IconHeader onClick={handleOpened} className={isOpened && 'focus'}>
				{/* header가 존재하면 header, 그렇지 않으면 첫번째 옵션의 label */}
				<HeaderOption value={value}>
					{!value
						? header
						: options.find((op) => op.value === value)?.label}
				</HeaderOption>
				{/* 열림 상태에 따른 아이콘 표시 */}
				{isOpened ? (
					<Icon margin={'0px'}>{arrowUpIcon}</Icon>
				) : (
					<Icon margin={'0px'}>{arrowDownIcon}</Icon>
				)}
			</IconHeader>
			{/* 콤보박스 리스트  */}
			{isOpened && (
				<OptionContainer ref={ref}>
					{options.map((v, i) => {
						return (
							<Option
								onClick={handleChange}
								key={i}
								// 현재값 선택 여부
								isCurrent={
									JSON.stringify(v.value) ===
									JSON.stringify(value)
								}
								value={JSON.stringify(v.value)}
							>
								{v.label}
							</Option>
						);
					})}
				</OptionContainer>
			)}
		</_Container>
	);

	return [value, comboBox, setValue];
};

useComboBox.propTypes = {
	options: PropTypes.array.isRequired,
	header: PropTypes.any,
	width: PropTypes.number,
};
export default useComboBox;
