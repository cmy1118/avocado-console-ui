import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';
import {usersAction, usersSelector} from '../../../reducers/users';

import Table from '../../Table/Table';

const UserSpace = () => {
	const {users, usersColumns} = useSelector(usersSelector.all);

	return (
		<_IamContainer>
			<_PathContainer>
				<Link to='/'>IAM</Link>
				<div>{' > '}</div>
				<Link to='/user'>사용자</Link>
			</_PathContainer>
			{/*/*******************************************************/}
			{/*  접근관리 설정에따른  Table 컴포넌트                         */}
			{/*/*******************************************************/}
			<Table columns={usersColumns} data={users} />
			{/*/*******************************************************/}
		</_IamContainer>
	);
};
UserSpace.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
};
export default UserSpace;
