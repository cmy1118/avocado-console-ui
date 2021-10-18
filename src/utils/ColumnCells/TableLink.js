import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import PropTypes from 'prop-types';
import qs from 'qs';

const TableLink = (props) => {
	console.log(props);
	const location = useLocation();
	// const [value, setValue] = useState(props.value);
	//****************************************************************//
	// * BasicTable 상세페이지 이동 기능
	//  - param 쿼리 파라미터 고려 추가
	//  - uid , id 값 고려 추가
	//****************************************************************//
	const pathname = qs.parse(location).pathname;
	// const data = props.row.original;
	// const paramId = data.uid ? data.uid : data.id;

	return <div>world</div>;
	// return <Link to={`${pathname}/${paramId}`}>{value}</Link>;
};
TableLink.propTypes = {
	props: PropTypes.object.isRequired,
};

export default TableLink;
