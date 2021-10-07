import React from 'react';
import TagTableContainer from '../../Table/TagTableContainer';

const AddTagToUser = () => {
	return (
		<>
			<div>태그 추가</div>

			<div>
				<button>태그 추가</button>
				<button>태그 삭제</button>
			</div>
			<div>
				<TagTableContainer tableKey='addTagsToUser' />
			</div>
		</>
	);
};
export default AddTagToUser;
