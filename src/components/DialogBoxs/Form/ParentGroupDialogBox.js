import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ul = styled.ul`
	list-style: none;
	margin: 8px;
	padding: 0px;
`;
const Li = styled.li`
	padding: 8px 16px;
	&:hover {
		background: #4ca6a8;
	}
`;

const ParentGroupDialogBox = ({
	groups,
	setValue,
	name,
	showParentGroupModal,
	setParentGroupId,
}) => {
	console.log(groups);

	const handleClick = useCallback(
		(item) => {
			setValue(name, item.name);
			setParentGroupId(item.id);
			showParentGroupModal({
				show: false,
			});
		},
		[name, setParentGroupId, setValue, showParentGroupModal],
	);

	return (
		<div>
			<Ul>
				{groups.map((v) => {
					return (
						<Li key={v.id} onClick={() => handleClick(v)}>
							{v.name}
						</Li>
					);
				})}
			</Ul>
		</div>
	);
};

ParentGroupDialogBox.propTypes = {
	groups: PropTypes.array,
	setValue: PropTypes.func,
	name: PropTypes.string,
	showParentGroupModal: PropTypes.func,
	setParentGroupId: PropTypes.func,
};

export default ParentGroupDialogBox;
