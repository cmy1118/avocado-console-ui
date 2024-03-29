import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import SearchOptionsContextMenu from '../ContextMenu/SearchOptionsContextMenu';
import {NormalBorderButton} from '../../styles/components/buttons';
import {autoRenewIcon, filterListIcon, ListIcon} from '../../icons/icons';
import PageSizing from './Options/paging/PageSizing';
import * as PropTypes from 'prop-types';
import Pagination from './Options/paging/Pagination';
import TableColumnFilterContextMenu from '../ContextMenu/TableColumnFilterContextMenu';
import {ColDiv, RowDiv} from '../../styles/components/style';
import {IconButton} from '../../styles/components/icons';
import useModal from '../../hooks/useModal';
import SearchFiltersBox from './Options/Search/searchFilters/searchFiltersBox';
import StrSearch from './Options/Search/StrSearch';
import {FormProvider, useForm} from 'react-hook-form';

const _Container = styled(ColDiv)`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const _OptionContainer = styled.div`
	// padding: 14px 0px;
	display: flex;
	align-items: center;
	white-space: nowrap;
	margin-bottom: 10px;
`;

const _FilterButton = styled(NormalBorderButton)`
	margin: 0 10px;
	padding: 4.5px 16px 5.5px 12px;
`;

const _FilterText = styled.span`
	padding-left: 8px;
	white-space: nowrap;
`;

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

const TableOptionsBar = ({
	tableKey,
	columns,
	setAllFilters,
	filters,
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageIndex,
	pageOptions,
	setGlobalFilter,
	pageSize,
	setPageSize,
	allColumns,
	getToggleHideAllColumnsProps,
	setHiddenColumns,
	headerGroups,
	isPaginable,
	isStrSearchable,
	isSearchable,
	isSearchFilterable,
	isColumnFilterable,
	setSearch,
}) => {
	//검색필터 선택 요소들
	const [selectedSearchFilters, setSelectedSearchFilters] = useState([]);

	//컬럼필터 선택 요소들
	const [selectedColumnFilters, setSelectedColumnFilters] = useState([]);
	//검색필터 모달 훅스
	const [SearchFilterModal, showSearchFilterModal] = useModal();
	//컬럼필터 모달 훅스
	const [ColumnFilterModal, showColumnFilter] = useModal();

	const methods = useForm({
		defaultValues: {
			searchFilters: [],
			columnFilters: [],
		},
	});

	/****************************************************************************************
	 * 검색 필터 기능 모달 핸들러
	 ****************************************************************************************/
	const onClickSearchFilter = useCallback(() => {
		showSearchFilterModal({
			show: true,
			title: '조회 필터 추가',
			onSubmitCallback: methods.handleSubmit((data) => {
				setSelectedSearchFilters(data.searchFilters);
			}),
			onCloseCallback: methods.setValue(
				'searchFilters',
				selectedSearchFilters,
			),
			element: <SearchOptionsContextMenu allColumns={allColumns} />,
		});
	}, [allColumns, methods, selectedSearchFilters, showSearchFilterModal]);

	/****************************************************************************************
	 * 컬럼 필터 기능 모달 핸들러
	 ****************************************************************************************/
	const onClickColumnFilter = useCallback(() => {
		showColumnFilter({
			show: true,
			title: '표시되는 열',
			onSubmitCallback: methods.handleSubmit((data) => {
				setHiddenColumns(data.columnFilters);
				setSelectedColumnFilters(data.columnFilters);
			}),
			// () => columnFilterForm.current.onClickOkBtn(),

			onCloseCallback: () =>
				methods.setValue('columnFilters', selectedColumnFilters),
			element: <TableColumnFilterContextMenu allColumns={allColumns} />,
		});
	}, [
		allColumns,
		methods,
		selectedColumnFilters,
		setHiddenColumns,
		showColumnFilter,
	]);

	return (
		<FormProvider {...methods}>
			<_Container>
				<RowDiv justifyContent={'space-between'}
				>
					<_OptionContainer>
						{/*검색 기능 사용시*/}
						{isSearchable && (
							<StrSearch
								tableKey={tableKey}
								setGlobalFilter={setGlobalFilter}
							/>
						)}

						{/*검색필터 기능 사용시*/}
						{isSearchFilterable && (
							<div>
								<_FilterButton onClick={onClickSearchFilter}>
									{filterListIcon}
									<_FilterText>필터 추가</_FilterText>
								</_FilterButton>
								{/*검색필터 모달창*/}
								<SearchFilterModal />
							</div>
						)}
					</_OptionContainer>

					<_OptionContainer>
						{isPaginable && (
							<>
								<IconButton
									size={'sm'}
									onClick={() =>
										console.log('데이터 새로 불러오기')
									}
								>
									{autoRenewIcon}
								</IconButton>
								{/*페이지*/}
								<Pagination
									gotoPage={gotoPage}
									canPreviousPage={canPreviousPage}
									previousPage={previousPage}
									nextPage={nextPage}
									canNextPage={canNextPage}
									pageCount={pageIndex}
									pageOptions={pageOptions}
									pageSize={pageSize}
									tableKey={tableKey}
								/>
								{/*페이지 행 사이즈*/}
								<PageSizing
									pageSize={pageSize}
									setPageSize={setPageSize}
								/>

								{/*컬럼필터 기능 사용시*/}
								{isColumnFilterable && (
									<div>
										<IconButton
											onClick={onClickColumnFilter}
											size={'sm'}
										>
											{ListIcon}
										</IconButton>
										{/*컬럼필터 모달창*/}
										<ColumnFilterModal />
									</div>
								)}
							</>
						)}
					</_OptionContainer>
				</RowDiv>

				{/*검색필터 체크박스 선택시 선택요소 조회 컴포넌트*/}
				{selectedSearchFilters[0] && (
					<SearchFiltersBox
						headerGroups={headerGroups}
						selected={selectedSearchFilters}
						setSelected={setSelectedSearchFilters}
						filters={filters}
						setAllFilters={setAllFilters}
					/>
				)}
			</_Container>
		</FormProvider>
	);
};

TableOptionsBar.propTypes = {
	tableKey: PropTypes.string,
	columns: PropTypes.array,
	headerGroups: PropTypes.array,
	selectedSearchFilters: PropTypes.array,
	setSelectedSearchFilters: PropTypes.func,
	isRefreshable: PropTypes.bool,
	isPageable: PropTypes.bool,
	isNumberOfRowsAdjustable: PropTypes.bool,
	isColumnFilterable: PropTypes.bool,
	gotoPage: PropTypes.func,
	canPreviousPage: PropTypes.bool,
	previousPage: PropTypes.func,
	nextPage: PropTypes.func,
	canNextPage: PropTypes.bool,
	pageCount: PropTypes.number,
	pageOptions: PropTypes.array,
	pageIndex: PropTypes.number,
	pageSize: PropTypes.number,
	setPageSize: PropTypes.func,
	allColumns: PropTypes.array,
	filters: PropTypes.array,
	setAllFilters: PropTypes.func,
	setGlobalFilter: PropTypes.func,
	getToggleHideAllColumnsProps: PropTypes.func,
	setHiddenColumns: PropTypes.func,
	tableOptions: PropTypes.object,
	isStrSearchable: PropTypes.bool,
	isSearchable: PropTypes.bool,
	isPaginable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	setSearch: PropTypes.func,
};

export default TableOptionsBar;
