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
				options={[20, 50, 100, 200]}
			/>
		</div>
	);
};

PageSizing.propTypes = {
	pageSize: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
};

export default PageSizing;
