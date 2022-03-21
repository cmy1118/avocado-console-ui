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

const ButtonContainer = styled.div`
	display: flex;
`;

/**************************************************
 * seob - 테이블 데이터를 추가, 삭제하는 컨테이너
 *
 * title : 테이블 컨테이너 제목
 * onAdd : 추가 버튼 이벤트 처리함수
 * onRemove : 삭제 버튼 이벤트 처리함수
 * render : 컨테이너로 감쌀 테이블
 ***************************************************/
const TableContainer = ({title = '', onAdd, onRemove, render}) => {
	// 추가 삭제 컨테이너
	return (
		<Container>
			<Header>
				<div>{title}</div>
				<ButtonContainer>
					<NormalButton onClick={onAdd}>추가</NormalButton>
					<NormalButton onClick={onRemove}>삭제</NormalButton>
				</ButtonContainer>
			</Header>
			<div>{render}</div>
		</Container>
	);
};

TableContainer.propTypes = {
	render: PropTypes.object,
	title: PropTypes.string,
	onAdd: PropTypes.func,
	onRemove: PropTypes.func,
};
export default TableContainer;
