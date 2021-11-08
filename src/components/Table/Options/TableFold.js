import React, {useCallback} from 'react';
import {TableSpace} from '../../../styles/components/table';
import {IconButton} from '../../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../../icons/icons';
import PropTypes from 'prop-types';

//children = button
const TableFold = ({children, title, space, isFold, setIsFold}) => {
	const onClickFold = useCallback(() => {
		setIsFold({...isFold, [space]: !isFold[space]});
	}, [isFold, setIsFold, space]);
	return (
		<div>
			<TableSpace className={isFold[space] ? 'fold' : 'fold close'}>
				<>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<IconButton
							color={'font'}
							size={'m'}
							margin={'0px'}
							onClick={onClickFold}
						>
							{isFold[space] ? arrowDownIcon : arrowRightIcon}
						</IconButton>
						{title}
					</div>
					{children ? children : ''}
				</>
			</TableSpace>
		</div>
	);
};
TableFold.propTypes = {
	children: PropTypes.object,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
};
export default TableFold;
