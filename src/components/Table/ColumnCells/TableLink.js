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

const TableLink = ({cell}) => {
	const location = useLocation();
	const [value, setValue] = useState(cell.value);
	//****************************************************************//
	// * BasicTable 상세페이지 이동 기능
	//  - param 쿼리 파라미터 고려 추가
	//  - uid , id 값 고려 추가
	//****************************************************************//
	const pathname = qs.parse(location).pathname;
	//dataType : Column 에서 부여한 type 정보
	const dataType = cell.column.type
	const data = cell.row.original;
	const paramId = data.uid ? data.uid : data.id;
	if(dataType){
		return <_Link to={{pathname :`/${dataType}/${paramId}`}}>{value}</_Link>;
	}else{
	return <_Link to={`${pathname}/${paramId}`}>{value}</_Link>;
	}
	// return <_Link to={`${pathname}/${paramId}`}>{value}</_Link>;
};
TableLink.propTypes = {
	cell: PropTypes.object.isRequired,
};

export default TableLink;
