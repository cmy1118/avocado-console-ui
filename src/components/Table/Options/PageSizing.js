import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DropDownContext from '../../RecycleComponents/DropDownContext';

const PageSizing = ({pageSize, setPageSize}) => {
	const [isOpened, setIsOpened] = useState(false);
	return (
		<div>
			<div onClick={() => setIsOpened(!isOpened)}>{pageSize}</div>
			<DropDownContext
				isOpened={isOpened}
				setIsOpened={setIsOpened}
				setValue={setPageSize}
				value={pageSize}
				options={[
					{label: '20 행', value: 20},
					{label: '50 행', value: 50},
					{label: '100 행', value: 100},
				]}
			/>
		</div>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
