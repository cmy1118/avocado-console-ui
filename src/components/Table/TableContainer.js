import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {NormalButton} from '../../styles/components/buttons';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TableContainer = ({render}) => {
	// 추가 삭제 컨테이너
	return (
		<Container>
			<Header>
				<div>제목</div>
				<div>
					<NormalButton>추가</NormalButton>
					<NormalButton>삭제</NormalButton>
				</div>
			</Header>
			<div>{render}</div>
		</Container>
	);
};

TableContainer.propTypes = {
	render: PropTypes.object,
};
export default TableContainer;
