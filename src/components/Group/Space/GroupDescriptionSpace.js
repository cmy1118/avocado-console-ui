import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';

const GroupDescriptionSpace = ({groupId}) => {
	return (
		<IamContainer>
			<div>
				<PathContainer>
					<Link to='/'>IAM</Link>
					<div>{' > '}</div>
					<Link to='/groups'>사용자 그룹</Link>
					<div>{' > '}</div>
					<Link to={`/groups/${groupId}`}>{groupId}</Link>
				</PathContainer>
			</div>
			<div>Group Description Space</div>
		</IamContainer>
	);
};

GroupDescriptionSpace.propTypes = {
	groupId: PropTypes.string.isRequired,
};

export default GroupDescriptionSpace;
