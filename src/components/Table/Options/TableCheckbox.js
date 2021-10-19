import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const dispatch = useDispatch();
	const {lange} = useSelector(CURRENT_TARGET.selector);
	const defaultRef = useRef();
	const [selectedRowIds, setSelectedRowIds] = useState(
		rest.rows.map((v) => v.isSelected),
	);
	const [lastIndex, setLastIndex] = useState(null);
	const resolvedRef = ref || defaultRef;

	const customRest = useMemo(() => {
		const selected = rest.rows.filter((v) => v.isSelected).map((x) => x.id);
		return {
			...rest,
			checked:
				rest.title === 'Toggle All Current Page Rows Selected'
					? rest.checked
					: lange[rest.tablekey]
					? rest.row.index >= lange[rest.tablekey].min &&
					  rest.row.index <= lange[rest.tablekey].max
						? true
						: rest.checked
					: rest.checked,
		};
	}, [lange, rest]);

	const handleClick = useCallback(
		(e) => {
			if (rest.title !== 'Toggle All Current Page Rows Selected') {
				if (e.shiftKey) {
					const currentIndex = rest.rows.findIndex(
						(v) => v.id === rest.row.id,
					);
					if (lastIndex) {
						console.log(currentIndex);
						const max = _.max([lastIndex, currentIndex]);
						const min = _.min([lastIndex, currentIndex]);

						dispatch(
							CURRENT_TARGET.action.setShiftLange({
								tableKey: rest.tablekey,
								lange: {min, max},
							}),
						);
					}
				}
			}
		},
		[dispatch, lastIndex, rest],
	);

	// useEffect(() => {
	// 	if (lange[rest.tablekey] && rest.row) {
	// 		if (
	// 			rest.row.index >= lange[rest.tablekey].min &&
	// 			rest.row.index <= lange[rest.tablekey].max
	// 		) {
	// 			rest.check = true;
	// 		}
	// 	}
	// }, [lange, rest]);

	useEffect(() => {
		const index = selectedRowIds.findIndex(
			(v, i) => rest.rows.map((v) => v.isSelected)[i] !== v,
		);
		if (index !== -1) {
			const isSelected = selectedRowIds.find(
				(v, i) => rest.rows.map((v) => v.isSelected)[i] !== v,
			);
			if (!isSelected) setLastIndex(index);
			setSelectedRowIds(rest.rows.map((v) => v.isSelected));
		}
	}, [lastIndex, rest, selectedRowIds]);

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<input
			type='checkbox'
			onClick={handleClick}
			ref={resolvedRef}
			{...customRest}
		/>
	);
});

TableCheckbox.propTypes = {
	indeterminate: PropTypes.bool,
};

TableCheckbox.displayName = 'TableCheckbox';

export default TableCheckbox;
