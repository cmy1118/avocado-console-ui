import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {IamContainer, PathContainer} from '../../../styles/components/style';
import {useSelector} from 'react-redux';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';

const GroupDescriptionSpace = ({groupId}) => {
	const {users} = useSelector(IAM_USER.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	// const userData = useMemo((v) => v.id);

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
