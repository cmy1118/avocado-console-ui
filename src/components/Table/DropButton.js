import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

const DropButton = ({
	select,
	rightDataIds,
	setRightDataIds,
	leftTableKey,
	RightTableKey,
}) => {
	const onClickLeftDropButton = useCallback(() => {
		setRightDataIds &&
			setRightDataIds(
				rightDataIds.concat(Object.keys(select[leftTableKey])),
			);
	}, [leftTableKey, rightDataIds, select, setRightDataIds]);

	const onClickRightDropButton = useCallback(() => {
		setRightDataIds(
			rightDataIds.filter(
				(v) => !Object.keys(select[RightTableKey]).includes(v),
			),
		);
	}, [RightTableKey, rightDataIds, select, setRightDataIds]);

	return (
		<div>
			<button onClick={onClickLeftDropButton}>-&gt;</button>
			<button onClick={onClickRightDropButton}>&lt;-</button>
		</div>
	);
};

DropButton.propTypes = {
	select: PropTypes.array.isRequired,
	rightDataIds: PropTypes.array.isRequired,
	setRightDataIds: PropTypes.func.isRequired,
	leftTableKey: PropTypes.string.isRequired,
	RightTableKey: PropTypes.string.isRequired,
};

export default DropButton;
