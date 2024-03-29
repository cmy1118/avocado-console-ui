import React from 'react';
import PropTypes from 'prop-types';

import GroupSpace from '../components/IAM/Group/Space/GroupSpace';
import CreateGroupSpace from '../components/IAM/Group/Space/CreateGroupSpace';
import GroupDescriptionSpace from '../components/IAM/Group/Space/GroupDescriptionSpace';
import GroupTypeSpace from '../components/IAM/Group/Space/GroupTypeSpace';

const Group = ({match}) => {
	return (
		<>
			{match.path === '/groups/add' ? (
				<CreateGroupSpace />
			) : match.path === '/groups/types' ? (
				<GroupTypeSpace />
			) : match.params?.id ? (
				<GroupDescriptionSpace groupId={match.params.id} />
			) : (
				<GroupSpace />
			)}
		</>
	);
};

Group.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
};

export default Group;
