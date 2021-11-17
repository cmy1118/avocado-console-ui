import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PAGINATION from '../../../reducers/pagination';
import {useDispatch} from 'react-redux';

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
	// white-space: nowrap;
`;

const Pagination = ({
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageCount,
	pageOptions,
	pageSize,
	tableKey,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			PAGINATION.action.setPage({
				tableKey,
				element: `elements=${pageSize * pageCount + 1}-${
					pageSize * (pageCount + 1)
				}`,
			}),
		);
	}, [dispatch, pageCount, pageSize, tableKey]);

	return (
		<Container className='pagination'>
			<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
				{'<'}
			</Button>
			{pageOptions.map((v) => {
				return (
					<Button
						onClick={() => gotoPage(v)}
						current={v === pageCount}
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
	pageCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	pageOptions: PropTypes.array.isRequired,
	tableKey: PropTypes.string.isRequired,
};

export default Pagination;
