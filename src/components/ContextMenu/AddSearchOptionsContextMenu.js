import React, {useCallback, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useRootClose} from 'react-overlays';

const _Container = styled.div`
	z-index: 99;
	position: absolute;
	width: 460px;
	background: lightblue;
`;

const AddSearchOptionsContextMenu = ({
	isOpened,
	setIsOpened,
	allOptions,
	selectedOptions,
	setSelectedOptions,
}) => {
	const ref = useRef();

	const onClickCloseContextMenu = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onChangeSelectFilterOption = useCallback(
		(v) => () => {
			if (selectedOptions.includes(v))
				setSelectedOptions(selectedOptions.filter((val) => val !== v));
			else setSelectedOptions([...selectedOptions, v]);
		},
		[selectedOptions, setSelectedOptions],
	);

	useRootClose(ref, onClickCloseContextMenu, {
		disabled: !isOpened,
	});

	return isOpened ? (
		<_Container ref={ref} alignEnd>
			<div>
				조회 필터 추가
				<span>
					{' '}
					<button onClick={onClickCloseContextMenu}>{'❎'}</button>
				</span>
				{allOptions.map((column) => (
					<div key={column.accessor}>
						<label>
							<input
								type='checkbox'
								checked={selectedOptions.includes(
									column.accessor,
								)}
								onChange={onChangeSelectFilterOption(
									column.accessor,
								)}
							/>{' '}
							{column.Header}
						</label>
					</div>
				))}
				<br />
			</div>
		</_Container>
	) : (
		false
	);
};
AddSearchOptionsContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	allOptions: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	setSelectedOptions: PropTypes.func.isRequired,
};
export default AddSearchOptionsContextMenu;
