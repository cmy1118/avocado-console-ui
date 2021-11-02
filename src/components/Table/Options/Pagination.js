import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
	pageIndex,
}) => {
	return (
		<Container className='pagination'>
			<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
				{'<'}
			</Button>
			{pageOptions.map((v) => {
				return (
					<Button
						onClick={() => gotoPage(v)}
						current={v === pageIndex}
						key={v}
					>
						{v + 1}
					</Button>
				);
			})}
			{/*<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>*/}
			{/*	{'<<'}*/}
			{/*</button>{' '}*/}

			<Button onClick={() => nextPage()} disabled={!canNextPage}>
				{'>'}
			</Button>
			{/*<button*/}
			{/*	onClick={() => gotoPage(pageCount - 1)}*/}
			{/*	disabled={!canNextPage}*/}
			{/*>*/}
			{/*	{'>>'}*/}
			{/*</button>{' '}*/}
			{/*<span>*/}
			{/*	Page{' '}*/}
			{/*	<strong>*/}
			{/*		{pageIndex + 1} of {pageOptions.length}*/}
			{/*	</strong>{' '}*/}
			{/*</span>*/}
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
	pageOptions: PropTypes.array.isRequired,
	pageIndex: PropTypes.number.isRequired,
};

export default Pagination;
