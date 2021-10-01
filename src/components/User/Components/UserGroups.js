import React from 'react';
import PropTypes from 'prop-types';
import {TabContentsTitle} from '../../../styles/components/tab';

const UserGroups = ({userId}) => {
	return (
		<>
			<div>
				<TabContentsTitle>이 사용자의 그룹 : </TabContentsTitle>
			</div>
			<div>
				<TabContentsTitle>이 사용자의 다른그룹 : </TabContentsTitle>
			</div>
		</>
	);
};

UserGroups.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default UserGroups;
