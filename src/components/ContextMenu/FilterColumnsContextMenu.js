import React, {useCallback} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	top: 30%;
	left: 80%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	width: 460px;
`;

const FilterColumnsContextMenu = ({isOpened, setIsOpened, allColumns}) => {
	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	return isOpened ? (
		<_Container style={{background: 'lightblue'}}>
			<div>
				표시되는 열선택
				<span>
					{' '}
					<button onClick={onClickCloseContextMenu}>{'❎'}</button>
				</span>
				{allColumns.map((column) =>
					column.id !== 'selection' ? (
						<div key={column.id}>
							<label>
								<input
									type='checkbox'
									{...column.getToggleHiddenProps()}
								/>{' '}
								{column.Header}
							</label>
						</div>
					) : (
						''
					),
				)}
				<br />
			</div>
		</_Container>
	) : (
		false
	);
};
FilterColumnsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	allColumns: PropTypes.array.isRequired,
};
export default FilterColumnsContextMenu;
