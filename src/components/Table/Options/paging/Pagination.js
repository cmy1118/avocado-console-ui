import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PAGINATION from '../../../../reducers/pagination';
import {useDispatch, useSelector} from 'react-redux';

const Button = styled.button`
	border: none;
	background: transparent;
	height: 24px;
	cursor: pointer;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: center;
	color: ${(props) => (props.current ? '#212121' : '#757575')};
`;

const Container = styled.div`
	padding: 0px 2px;
	border-left: 1px solid #e3e5e5;
	border-right: 1px solid #e3e5e5;
`;

const Pagination = ({
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageSize,
	tableKey,
}) => {
	const dispatch = useDispatch();
	const {total} = useSelector(PAGINATION.selector);
	const [page, setPage] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const onClickGoToPage = useCallback(
		(v) => {
			console.log(v + 1);
			setCurrentPage(v);
			dispatch(
				PAGINATION.action.setPage({
					tableKey,
					element: `elements=${pageSize * v}-${
						pageSize * (v + 1) - 1
					}`,
				}),
			);
		},
		[dispatch, pageSize, tableKey],
	);

	useEffect(() => {
		console.log(Math.ceil(total[tableKey] / pageSize));
		if (Math.ceil(total[tableKey] / pageSize)) {
			setPage(
				[...Array(Math.ceil(total[tableKey] / pageSize))].map(
					(v, i) => i,
				),
			);
		}
	}, [pageSize, tableKey, total]);

	useEffect(() => {
		dispatch(
			PAGINATION.action.setPage({
				tableKey,
				element: `elements=${pageSize * currentPage}-${
					pageSize * (currentPage + 1) - 1
				}`,
			}),
		);
	}, [currentPage, dispatch, pageSize, tableKey]);

	return (
		<Container className='pagination'>
			<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
				{'<'}
			</Button>
			{page.map((v) => {
				return (
					<Button
						onClick={() => onClickGoToPage(v)}
						current={v === currentPage}
						key={v}
					>
						{v + 1}
					</Button>
				);
			})}
			<Button onClick={() => nextPage()} disabled={!canNextPage}>
				{'>'}
			</Button>
		</Container>
	);
};

Pagination.propTypes = {
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.bool.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool.isRequired,
	pageSize: PropTypes.number.isRequired,
	tableKey: PropTypes.string.isRequired,
};

export default Pagination;
