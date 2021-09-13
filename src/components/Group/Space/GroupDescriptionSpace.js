import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {_IamContainer, _PathContainer} from '../../../styles/components/style';

const GroupDescriptionSpace = ({groupId}) => {
	return (
		<_IamContainer>
			<div>
				<_PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/group'>사용자 그룹</Link>
					<div>{' > '}</div>
					<Link to={`/group/${groupId}`}>{groupId}</Link>
				</_PathContainer>
			</div>
			<div>Group Description Space</div>
		</_IamContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
