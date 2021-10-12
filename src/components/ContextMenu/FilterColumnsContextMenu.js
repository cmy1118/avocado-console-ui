import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDropdownMenu, useRootClose} from 'react-overlays';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: 460px;
	background: lightblue;
`;

const FilterColumnsContextMenu = ({isOpened, setIsOpened, allColumns}) => {
	const ref = useRef();

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	return isOpened ? (
		<_Container ref={ref} alignEnd>
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
