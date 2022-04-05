import React, {useCallback} from 'react';
import {ColDiv, Label, RowDiv} from '../../../../styles/components/style';
import {HoverIconButton} from '../../../../styles/components/icons';
import {cancelIcon} from '../../../../icons/icons';
import {NormalBorderButton} from '../../../../styles/components/buttons';
import * as PropTypes from 'prop-types';

import styled from 'styled-components';

const FiltersContainer = styled(RowDiv)`
	border-top: 1px solid #e3e5e5;
	box-sizing: border-box;
`;

const placeholders = {
	status: '계정상태',
	authType: '인증유형',
	MFA: 'MFA',
	passwordExpiryTime: '비밀번호 수명',
	lastConsoleLogin: '마지막 콘솔 로그인',
	createdTime: '생성일',
	roleType: '역할 유형',
};
/****************************************************************************************
 * 선택된 검색 필터 요소 조회 컴포넌트
 *
 * headerGroups : tableCol
 ****************************************************************************************/
const SearchFiltersBox = ({
	headerGroups,
	selected,
	setSelected,
	setAllFilters,
	filters,
}) => {
	//검색필터 닫기 버튼 핸들러
	const onClickCloseFilter = useCallback(
		(v) => () => {
			console.log('onClickCloseFilter:', v);
			setSelected(selected.filter((val) => val !== v));
			setAllFilters(filters.filter((val) => val.id !== v));
		},
		[setSelected, selected, setAllFilters, filters],
	);

	//검색필터 '모두삭제' 버튼 핸들러
	const onClickResetFilters = useCallback(() => {
		console.log('onClickResetFilters:');
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
