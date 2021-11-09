import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';

import SearchOptionsContextMenu from '../ContextMenu/SearchOptionsContextMenu';
import {NormalBorderButton} from '../../styles/components/buttons';
import {
	autoRenewIcon,
	cancelIcon,
	filterListIcon,
	ListIcon,
} from '../../icons/icons';
import PageSizing from './Options/PageSizing';
import * as PropTypes from 'prop-types';
import Pagination from './Options/Pagination';
import TableColumnFilterContextMenu from '../ContextMenu/TableColumnFilterContextMenu';
import Search from './Options/Search';
import {ColDiv, PositionRelativeDiv, RowDiv} from '../../styles/components/div';
import {HoverIconButton, IconButton} from '../../styles/components/icons';
import {Label} from '../../styles/components/text';

const _Container = styled(ColDiv)`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const _OptionContainer = styled.div`
	padding: 14px 0px;
	display: flex;
	align-items: center;
	white-space: nowrap;
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
	pageSize,
	setPageSize,
	allColumns,
	getToggleHideAllColumnsProps,
	setHiddenColumns,
	headerGroups,
	isSearchFilterable = false,
}) => {
	const [selectedSearchFilters, setSelectedSearchFilters] = useState([]);

	const searchFilters = useMemo(() => {
		return columns.filter((v) =>
			Object.prototype.hasOwnProperty.call(v, 'filter'),
		);
	}, [columns]);

	const onClickCloseFilter = useCallback(
		(v) => () => {
			setSelectedSearchFilters(
				selectedSearchFilters.filter((val) => val !== v),
			);
			setAllFilters(filters.filter((val) => val.id !== v));
		},
		[selectedSearchFilters, setAllFilters, filters],
	);

	const onClickResetFilters = useCallback(() => {
		setSelectedSearchFilters([]);
		setAllFilters([]);
	}, [setAllFilters]);

	const [
		isSearchFilterContextMenuOpened,
		setIsSearchFilterContextMenuOpened,
	] = useState(false);
	const [
		isColumnFilterContextMenuOpened,
		setIsColumnFilterContextMenuOpened,
	] = useState(false);

	const onClickOpenSearchFilterContextMenu = useCallback(() => {
		setIsSearchFilterContextMenuOpened(true);
	}, [setIsColumnFilterContextMenuOpened]);
	const onClickOpenSelectColumnsContextMenu = useCallback(() => {
		setIsColumnFilterContextMenuOpened(true);
	}, [setIsColumnFilterContextMenuOpened]);

	return (
		<_Container>
			<RowDiv justifyContent={'space-between'}>
				<_OptionContainer>
					<Search tableKey={tableKey} />
					{isSearchFilterable && (
						<div>
							<_FilterButton
								onClick={onClickOpenSearchFilterContextMenu}
							>
								{filterListIcon}
								<_FilterText>필터 추가</_FilterText>
							</_FilterButton>
							<PositionRelativeDiv>
								{isSearchFilterContextMenuOpened && (
									<SearchOptionsContextMenu
										isOpened={
											isSearchFilterContextMenuOpened
										}
										setIsOpened={
											setIsSearchFilterContextMenuOpened
										}
										allOptions={searchFilters}
										selectedOptions={selectedSearchFilters}
										setSelectedOptions={
											setSelectedSearchFilters
										}
										filters={filters}
										setAllFilters={setAllFilters}
									/>
								)}
							</PositionRelativeDiv>
						</div>
					)}
				</_OptionContainer>
				<_OptionContainer>
					<IconButton
						size={'sm'}
						onClick={() => console.log('데이터 새로 불러오기')}
					>
						{autoRenewIcon}
					</IconButton>
					<Pagination
						gotoPage={gotoPage}
						canPreviousPage={canPreviousPage}
						previousPage={previousPage}
						nextPage={nextPage}
						canNextPage={canNextPage}
						pageCount={pageIndex}
						pageOptions={pageOptions}
						pageSize={pageSize}
					/>
					<PageSizing pageSize={pageSize} setPageSize={setPageSize} />
					<div>
						<IconButton
							onClick={onClickOpenSelectColumnsContextMenu}
							size={'sm'}
						>
							{ListIcon}
						</IconButton>
						<PositionRelativeDiv>
							<TableColumnFilterContextMenu
								isOpened={isColumnFilterContextMenuOpened}
								setIsOpened={setIsColumnFilterContextMenuOpened}
								allColumns={allColumns}
								getToggleHideAllColumnsProps={
									getToggleHideAllColumnsProps
								}
								setHiddenColumns={setHiddenColumns}
							/>
						</PositionRelativeDiv>
					</div>
				</_OptionContainer>
			</RowDiv>
			{selectedSearchFilters[0] &&
				headerGroups.map((headerGroup, i) => (
					<FiltersContainer
						justifyContent={'space-between'}
						key={i}
						height={'84px'}
						padding={'11px 0px'}
						{...headerGroup.getHeaderGroupProps()}
					>
						<RowDiv alignItems={'center'}>
							{headerGroup.headers.map(
								(column, i) =>
									column.canFilter &&
									selectedSearchFilters.includes(
										column.id,
									) && (
										<ColDiv key={i}>
											<Label>
												{placeholders[column.id]}
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
						{selectedSearchFilters.length !== 0 && (
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
		</_Container>
	);
};

TableOptionsBar.propTypes = {
	tableKey: PropTypes.string,
	columns: PropTypes.array,
	headerGroups: PropTypes.array,
	isSearchable: PropTypes.bool,
	isSearchFilterable: PropTypes.bool,
	searchFilters: PropTypes.array,
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
	getToggleHideAllColumnsProps: PropTypes.func,
	setHiddenColumns: PropTypes.func,
};

export default TableOptionsBar;
