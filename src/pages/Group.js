import React from 'react';
import PropTypes from 'prop-types';

import GroupSpace from '../components/Group/Space/GroupSpace';
import AddGroupSpace from '../components/Group/Space/AddGroupSpace';
import GroupDescriptionSpace from '../components/Group/Space/GroupDescriptionSpace';

const Group = ({match}) => {
	return (
		<>
			{match.path === '/group/add' ? (
				<AddGroupSpace />
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
