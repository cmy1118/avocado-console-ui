import React, {useCallback} from 'react';
import {ColDiv, Label, RowDiv} from '../../../../../styles/components/style';
import {HoverIconButton} from '../../../../../styles/components/icons';
import {cancelIcon} from '../../../../../icons/icons';
import {NormalBorderButton} from '../../../../../styles/components/buttons';
import * as PropTypes from 'prop-types';

import styled from 'styled-components';
import {authType, mfa, status} from "../../../../../utils/data";

const FiltersContainer = styled(RowDiv)`
	border-top: 1px solid #e3e5e5;
	box-sizing: border-box;
`;

//placehoders
export const placeholders = {
	status: '계정상태',
	authType: '인증유형',
	MFA: 'MFA',
	passwordExpiryTime: '비밀번호 수명',
	lastConsoleLogin: '마지막 콘솔 로그인',
	createdTime: '생성일',
	roleType: '역할 유형',
};

export const tableSearchSelectOptions = {
	status: [
		{value: status.NORMAL, label: '정상'},
		{value: status.LOCKED, label: '잠김'},
		{value: status.WAITING, label: '대기'},
		{value: status.DELETED, label: '삭제'},
		{value: status.UNAUTHORIZED, label: '미승인'},
	],
	authType: [
		{value: authType.ID, label: 'ID/PWD'},
		{value: authType.GOOGLE, label: '대체인증(Google)'},
		{value: authType.APPLE, label: '대체인증(Apple)'},
		{value: authType.NAVER, label: '대체인증(Naver)'},
		{value: authType.KAKAO, label: '대체인증(Kakao)'},
	],
	MFA: [
		{value: mfa.EMAIL, label: 'Email(OTP)'},
		{value: mfa.SMS, label: 'SMS(OTP)'},
		{value: mfa.MOBILE, label: 'Mobile(OTP)'},
		{value: mfa.FINGER_PRINT, label: 'Finger Print'},
		{value: mfa.FACE_ID, label: 'Face ID'},
	],
	roleType: [
		{value: 'Public', label: 'Public'},
		{value: 'Private', label: 'Private'},
	],
	manageCategory: [
		{value: 'Avocado 관리형', label: 'Avocado 관리형'},
		{value: '고객 관리형', label: '고객 관리형'},
	],
	policyType: [
		{value: 'IAM', label: 'IAM'},
		{value: 'PAM', label: 'PAM'},
	],
};
/****************************************************************************************
 * 선택된 검색 필터 요소 조회 컴포넌트
 *
 * headerGroups : 테이블 컬럼 데이터들
 * selected : 검색 필터 선택 요소들
 * setSelected : 검색 필터 선택 요소 핸들링 함수
 * filters : 적용된 검색필터 요소 배열
 * setAllFilters : 적용된 검색필터 요소 배열 핸들링 함수
 ****************************************************************************************/
const SearchFiltersBox = ({
	headerGroups,
	selected,
	setSelected,
	filters,
							  setAllFilters,
}) => {
	//검색필터 닫기 버튼 핸들러
	const onClickCloseFilter = useCallback(
		(v) => () => {
			setSelected(selected.filter((val) => val !== v));
			setAllFilters(filters.filter((val) => val.id !== v));
		},
		[setSelected, selected, setAllFilters, filters],
	);

	//검색필터 '모두삭제' 버튼 핸들러
	const onClickResetFilters = useCallback(() => {
		setSelected([]);
		setAllFilters([]);
	}, [setAllFilters, setSelected]);

	return (
		<div>
			{headerGroups.map((headerGroup, i) => (
				<FiltersContainer
					justifyContent={'space-between'}
					key={i}
					height={'84px'}
					padding={'11px 0px'}
					// padding={'11px 0px 16px'}
					{...headerGroup.getHeaderGroupProps()}
				>
					<RowDiv alignItems={'center'}>
						{headerGroup.headers.map(
							(column, i) =>
								column.canFilter &&
								selected.includes(column.id) && (
									<ColDiv key={i}>
										<Label>
											{placeholders[column.id]}
											{/*{column.id}*/}
										</Label>
										<RowDiv alignItems={'center'}>
											{column.render('Filter')}
											<HoverIconButton
												size={'sm'}
												onClick={onClickCloseFilter(
													column.id,
												)}
											>
												{cancelIcon}
											</HoverIconButton>
										</RowDiv>
									</ColDiv>
								),
						)}
					</RowDiv>

					{selected.length !== 0 && (
						<RowDiv alignItems={'flex-end'}>
							<NormalBorderButton
								margin={'0px 0px 0px 10px'}
								onClick={onClickResetFilters}
							>
								모두 삭제
							</NormalBorderButton>
						</RowDiv>
					)}
				</FiltersContainer>
			))}
		</div>
	);
};
SearchFiltersBox.propTypes = {
	headerGroups: PropTypes.object.isRequired,
	selected: PropTypes.object.isRequired,
	setSelected: PropTypes.func.isRequired,
	filters: PropTypes.array,
	setAllFilters: PropTypes.func,
};
export default SearchFiltersBox;



