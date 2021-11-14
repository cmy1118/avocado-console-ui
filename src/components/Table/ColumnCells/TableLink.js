import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import PropTypes from 'prop-types';
import qs from 'qs';
import styled from 'styled-components';

const _Link = styled(Link)`
	color: #0a6f71;
	text-decoration: none;
	&:hover {
		color: ${(props) => props?.color || '#389193'};
		text-decoration: underline;
	}
`;

const TableLink = ({cell,text}) => {
	const location = useLocation();
	const [value, setValue] = useState(cell.value);
	//****************************************************************//
	// * BasicTable 상세페이지 이동 기능
	//  - param 쿼리 파라미터 고려 추가
	//  - uid , id 값 고려 추가
	//****************************************************************//
	const pathname = qs.parse(location).pathname;

    //grantUserId : 부여사용자 여부 확인
	const grantUserId = cell.value.uid
	//dataType : Column 에서 부여한 type 정보
	const dataType = cell.column.type
	const data = cell.row.original;
	const paramId = data.uid ? data.uid : data.id;

	return (
	grantUserId?
	<_Link to={{pathname :`/${dataType}/${grantUserId}`}}>{text}</_Link>
	: dataType?
	<_Link to={{pathname :`/${dataType}/${paramId}`}}>{value}</_Link>
	:<_Link to={`${pathname}/${paramId}`}>{value}</_Link>
	);

};
TableLink.propTypes = {
	cell: PropTypes.object.isRequired,
	text: PropTypes.string,
};

export default TableLink;
