import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';

const TableCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const {currentTarget} = useSelector(CURRENT_TARGET.selector);
	const dispatch = useDispatch();
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	const customRest = useMemo(() => {
		const selected = currentTarget[rest.tablekey] || [];
		return {
			...rest,
			checked:
				rest.title === 'Toggle All Current Page Rows Selected'
					? selected.length === rest.row.length
						? true
						: rest.checked
					: selected.includes(rest.row?.id),
		};
	}, [currentTarget, rest]);

	const handleClick = useCallback(() => {
		const selected = currentTarget[rest.tablekey] || [];

		if (rest.title === 'Toggle All Current Page Rows Selected') {
			if (selected.length === rest.row.length) {
				dispatch(
					CURRENT_TARGET.action.changeSelectedRows({
						tableKey: rest.tablekey,
						selected: [],
					}),
				);
			} else {
				if (!rest.checked) {
					dispatch(
						CURRENT_TARGET.action.changeSelectedRows({
							tableKey: rest.tablekey,
							selected: rest.row,
						}),
					);
				} else {
					dispatch(
						CURRENT_TARGET.action.changeSelectedRows({
							tableKey: rest.tablekey,
							selected: [],
						}),
					);
				}
			}
		}
	}, [currentTarget, dispatch, rest]);

	useEffect(() => {
		if (
			resolvedRef.current.title ===
			'Toggle All Current Page Rows Selected'
		) {
			if (
				currentTarget[rest.tablekey]?.length > 0 &&
				currentTarget[rest.tablekey]?.length < rest.row.length
			) {
				resolvedRef.current.indeterminate = true;
			} else if (
				currentTarget[rest.tablekey]?.length === 0 ||
				currentTarget[rest.tablekey]?.length === rest.row.length
			) {
				resolvedRef.current.indeterminate = false;
			}
		}
	}, [indeterminate, resolvedRef, currentTarget, rest.tablekey, rest]);

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
